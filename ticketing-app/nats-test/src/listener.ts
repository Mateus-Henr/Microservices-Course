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

    // We have to confirm that everything goes right, so the event doesn't get lost if an error occurs.
    // It also resends the event to the service.
    const options = stan
        .subscriptionOptions()
        .setManualAckMode(true)
        .setDeliverAllAvailable() // Used to get a list of all events emitted from NATS.
        .setDurableName('accounting-service'); // Used to store the events and their status, so events that have already
    // been processed won't appear again.

    // Creating subscription and joining it to a group
    const subscription = stan.subscribe('ticket:created',
        'queue-group-name', // Also helps not to dump the durable names.
        options);

    subscription.on('message', (msg: Message) => {
        const data = msg.getData();

        console.log(`Received event #${msg.getSequence()}, with data: ${data}`);

        msg.ack();
    });
});

// Closing the connection whenever interruption signals are signed.
process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());

abstract class Listener {
    abstract subject: string;
    abstract queueGroupName: string;

    abstract onMessage(data: any, msg: Message): void;

    private client: Stan;
    protected ackWait = 5 * 1000; // 5s

    constructor(client: Stan) {
        this.client = client;
    }

    subscriptionOptions() {
        return this.client
            .subscriptionOptions()
            .setDeliverAllAvailable()
            .setManualAckMode(true)
            .setAckWait(this.ackWait)
            .setDurableName(this.queueGroupName)
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

    parseMessage(msg: Message) {
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
