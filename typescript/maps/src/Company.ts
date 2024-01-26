import {faker} from "@faker-js/faker";

export class Company {
    public name: string;
    public catchPhrase: string;
    public location: {
        lat: number,
        lng: number
    };

    constructor() {
        this.name = faker.company.name();
        this.catchPhrase = faker.company.catchPhrase();
        this.location = {
            lat: parseFloat(faker.address.latitude()),
            lng: parseFloat(faker.address.longitude())
        }
    }
}
