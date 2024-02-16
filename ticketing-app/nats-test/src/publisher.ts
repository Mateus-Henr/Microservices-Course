import nats from 'node-nats-streaming';

const stan = nats.connect('ticketing', 'abc', {
    url: 'http://localhost:4222'
});

// Executes when the client successfully connects to the event bus.
stan.on('connect', () => {
    console.log('Publisher connected to NATS');
});
