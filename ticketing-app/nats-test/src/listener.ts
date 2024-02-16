import nats, {Message} from 'node-nats-streaming';
import {randomBytes} from 'node:crypto';

console.clear();

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
    url: 'http://localhost:4222'
});

stan.on('connect', () => {
    console.log('Listener connected to NATS');

    // Used to tell immediately NATS that the client is down.
    stan.on('close', ()=> {
        console.log('NATS connection closed!');
        process.exit();
    });

    // We have to confirm that everything goes right, so the event doesn't get lost if an error occurs.
    // It also resends the event to the service.
    const options = stan.subscriptionOptions()
        .setManualAckMode(true);

    // Creating subscription and joining it to a group
    const subscription = stan.subscribe('ticket:created',
        'orders-service-queue-group',

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
