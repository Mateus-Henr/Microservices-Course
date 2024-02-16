import nats from 'node-nats-streaming';

console.clear();

const stan = nats.connect('ticketing', 'abc', {
    url: 'http://localhost:4222'
});

// Executes when the client successfully connects to the event bus.
stan.on('connect', () => {
    console.log('Publisher connected to NATS');

    // NATS only accepts JSONs
    const data = JSON.stringify({
        id: '12',
        title: 'concert',
        price: 20
    });

    stan.publish('ticket:created', data, () => {
        console.log('Event published');
    });
});
