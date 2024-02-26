import nats, {Message, Stan} from 'node-nats-streaming';
import {randomBytes} from 'node:crypto';
import {TickedCreatedListener} from './events/ticket-created-listener';

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
