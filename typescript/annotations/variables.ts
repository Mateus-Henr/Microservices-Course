let apples: number = 5; // Type annotation (set by the developer)
apples = 10;
let speed = 'fast'; // Type inference
speed = "hey";
let hasName: boolean = true;

let nothingMuch: null = null;
let nothing: undefined = null;


// Built in objects
let now: Date = new Date();


// Array
let colors: string[] = ['red', 'green', 'blue'];
let myNumbers: number[] = [1, 2, 3];
let truths: boolean[] = [true, false, true];


// Classes
class Car {

}

let car: Car = new Car();


// Object literal
let point: { x: number; y: number } = {
    x: 10,
    y: 20
};


// Function
const logNumber: (i: number) => void = (i: number) => {
    console.log(i);
}

