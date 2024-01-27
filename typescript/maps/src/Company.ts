import {faker} from "@faker-js/faker";
import {Mappable} from "./CustomMap";

export class Company implements Mappable {
    public name: string;
    public catchPhrase: string;
    public location: {
        lat: number,
        lng: number
    };
    color = "red";

    constructor() {
        this.name = faker.company.name();
        this.catchPhrase = faker.company.catchPhrase();
        this.location = {
            lat: parseFloat(faker.address.latitude()),
            lng: parseFloat(faker.address.longitude())
        }
    }

    public markerContent(): string {
        return `
        <div>
            <h1>Company Name: ${this.name}</h1>
            <h3>Catch Phrase? ${this.catchPhrase}</h3>
        </div>
        `;
    }
}
