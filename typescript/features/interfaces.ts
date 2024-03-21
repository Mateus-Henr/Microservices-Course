const oldCivic = {
    name: "civic",
    year: 2000,
    broken: true,

    summary(): string
    {
        return `Name: ${this.name}`;
    }
};

const printVehicle = (vehicle: { name: string; year: number; broken: boolean }): void =>
{
    console.log(`Name: ${vehicle.name}`);
    console.log(`Year: ${vehicle.year}`);
    console.log(`Broken: ${vehicle.broken}`);
};

printVehicle(oldCivic);


// Using the interface (Starts with a capital letter)
interface Reportable
{
    // name: string;
    // year: number;
    // broken: boolean;

    summary(): string;
}

const printSummary = (item: Reportable): void =>
{
    console.log(item.summary());
};

printSummary(oldCivic);


const drink = {
    color: "brown",
    carbonated: true,
    sugar: 40,

    summary(): string
    {
        return `drink has ${this.sugar} grams of sugar`;
    }
};

// Satisfies the Reportable interface as well.
printSummary(drink);


