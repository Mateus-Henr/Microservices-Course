import nats from 'node-nats-streaming';
import {TicketCreatedPublisher} from './events/ticket-created-publisher';

console.clear();

const stan = nats.connect('ticketing', 'abc', {
    url: 'http://localhost:4222'
});

// Executes when the client successfully connects to the event bus.
stan.on('connect', async () => {
    console.log('Publisher connected to NATS');

    // NATS only accepts JSONs
    const data = {
        id: '12',
        title: 'concert',
        price: 20
    };

    const publisher = new TicketCreatedPublisher(stan);

    try {
        await publisher.publish(data);
    } catch (err) {
        console.log(err);
    }
});
