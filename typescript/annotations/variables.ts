let apples: number = 5; // Type annotation (set by the developer)
apples = 10;
let speed = "fast"; // Type inference
speed = "hey";
let hasName: boolean = true;

let nothingMuch: null = null;
let nothing: undefined = undefined;


// Built in objects
let now: Date = new Date();


// Array
let colors: string[] = ["red", "green", "blue"];
let myNumbers: number[] = [1, 2, 3];
let truths: boolean[] = [true, false, true];


// Classes
class Car
{

}

let car: Car = new Car();


// Object literal
let point: { x: number; y: number } = {
    x: 10,
    y: 20
};


// Function
const logNumber: (i: number) => void = (i: number) =>
{
    console.log(i);
}

// When to use annotations
// 1) Function that returns the 'any' type (We should try to always avoid the 'any' type).
const json = "{\"x\": 10, \"y\": 20}";
// const coordinates = JSON.parse(json); // With any type
const coordinates: { x: number; y: number } = JSON.parse(json); // Setting a type
console.log(coordinates);

// 2) When we declare a variable on one line and initialize it later.
let words = ["red", "green", "blue"];
let foundWord: boolean;

for (let i = 0; i < words.length; i++)
{
    if (words[i] === "green")
    {
        foundWord = true;
    }
}

// 3) Variable whose type cannot be inferred correctly.
let numbers = [-10, -1, 12];
let numberAboveZero: boolean | number = false; // Can be a number or a boolean.

for (let i = 0; i < numbers.length; i++)
{
    if (numbers[i] > 0)
    {
        numberAboveZero = numbers[i];
    }
}
