// When it comes for type inference around functions, typescript only tries to figure out what type the return value is,
// but we shouldn't use it.
// That's why is mandatory to add type to the arguments of the function.
const add = (a: number, b: number): number =>
{
    return a + b;
};

// Wrong usage.
const subtract = (a: number, b: number) =>
{
    a - b;
};


// Anonymous function example
const multiply = function divide(a: number, b: number): number
{
    return a * b;
};


// No return value.
const logger = (message: string): void =>
{
    console.log(message);
};

// The function is never going to reach its end.
const throwError = (message: string): never =>
{
    throw new Error(message);
};

// This example we still expect it to get the end.
const throwError2 = (message: string): void =>
{
    if (!message)
    {
        throw new Error(message);
    }
};


// Destructuring with annotations
const forecast = {
    date: new Date(),
    weather: "sunny"
}

// Destructuring and annotations are apart.
const logWeather = ({date, weather}: { date: Date, weather: string }) =>
{
    console.log(date);
    console.log(weather);
};
