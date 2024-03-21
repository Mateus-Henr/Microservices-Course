class Vehicle
{

    constructor(public color: string)
    { // Defining a field.
    }


    public drive(): void
    {
        console.log("Driving");
    }

    protected honk(): void
    {
        console.log("Beep");
    }
}

class Car extends Vehicle
{
    constructor(public wheels: number, color: string)
    {
        super(color);
    }

    public drive(): void
    { // Overriding method.
        console.log("Vroom");
        this.internalStuff();
    }

    private internalStuff(): void
    {
        this.honk();
    }
}

// Defining a method as private doesn't mean more security, it just means that other developers cannot use that method.
// Protected means that we can access the method in child classes as well.
const vehicle = new Vehicle("orange");
vehicle.drive();


const car = new Car(4, "orange");
car.drive();

console.log(vehicle.color);
