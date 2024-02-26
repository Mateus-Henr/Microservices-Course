import nats, {Message, Stan} from 'node-nats-streaming';
import {randomBytes} from 'node:crypto';

console.clear();

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
    url: 'http://localhost:4222'
});

stan.on('connect', () => {
    console.log('Listener connected to NATS');

    // Used to tell immediately NATS that the client is down.
    stan.on('close', () => {
        console.log('NATS connection closed!');
        process.exit();
    });

    new TickedCreatedListener(stan).listen();
});

// Closing the connection whenever interruption signals are signed.
process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());

abstract class Listener {
    abstract subject: string;
    abstract queueGroupName: string;

    protected abstract onMessage(data: any, msg: Message): void;

    private client: Stan;
    protected ackWait = 5 * 1000; // 5s

    constructor(client: Stan) {
        this.client = client;
    }

    private subscriptionOptions() {
        return this.client
            .subscriptionOptions()
            .setDeliverAllAvailable()
            .setManualAckMode(true)
            .setAckWait(this.ackWait)
            .setDurableName(this.queueGroupName);
    }

    listen() {
        const subscription = this.client.subscribe(
            this.subject,
            this.queueGroupName,
            this.subscriptionOptions()
        );

        subscription.on('message', (msg: Message) => {
            console.log(
                `Message received: ${this.subject} / ${this.queueGroupName}`
            );

            const parsedData = this.parseMessage(msg);
            this.onMessage(parsedData, msg);
        });
    }

    private parseMessage(msg: Message) {
        const data = msg.getData();

        return typeof data === 'string'
            ? JSON.parse(data)
            : JSON.parse(data.toString('utf8'));
    }
}

class TickedCreatedListener extends Listener {
    subject = 'ticked:created';
    queueGroupName = 'payments-service';

    onMessage(data: any, msg: Message): void {
        console.log('Event data!', data);

        msg.ack();
    }

}
