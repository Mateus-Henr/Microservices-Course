// Empty arrays must have a type annotation.
const carMarkers = ['ford', 'toyota', 'chevy'];
const dates = [new Date(), new Date()];

const carsByMe = [
    ['f150'],
    ['corolla'],
    ['fiat']
];

const cars: string[][] = [];


// Help with inference when extracting values
const car = carMarkers[0];
const myCar = carMarkers.pop();

// Prevent incompatible values
// carMarkers.push(100);

// Help with 'map'
carMarkers.map((car: string) => {
    return car; // We can use string methods here.
});


// Multiple typees in arrays
// Flexible types
// const importantDates = [new Date(), '2034-02-03']; // Goal
const importantDates: (Date | string)[] = [];
importantDates.push('2034-02-03');
importantDates.push(new Date());


// Tuples
// They are used to represent an object that contains initialized values.
const drink = {
    color: 'brown',
    carbonated: true,
    sugar: 40
};

// Type alias
type Drink = [string, boolean, number];

// Making an array into a tuple. Not used very often.
const pepsi: Drink = ['brown', true, 60];
const sprite: Drink = ['clear', true, 40];
const tea: Drink = ['brown', false, 0];

const carSpecs: [number, number] = [400, 3000];
const carStats = { // Better
    horsePower: 400,
    weight: 3354
};
