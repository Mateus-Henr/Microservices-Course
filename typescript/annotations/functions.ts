// When it comes for type inference around functions, typescript only tries to figure out what type the return value is,
// but we shouldn't use it.
// That's why is mandatory to add type to the arguments of the function.
const add = (a: number, b: number): number => {
    return a + b;
};

// Wrong usage.
const subtract = (a: number, b: number) => {
    a - b;
};
