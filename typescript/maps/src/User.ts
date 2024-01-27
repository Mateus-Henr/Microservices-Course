import {faker} from "@faker-js/faker";
import {Mappable} from "./CustomMap"; // Type definition files for ts, usually at "@type/{library}".

export class User implements Mappable { // We don't use default statement in ts.
    public name: string;
    public location: {
        lat: number,
        lng: number
    };
    color = "blue";

    constructor() {
        this.name = faker.name.fullName();
        this.location = {
            lat: parseFloat(faker.address.latitude()),
            lng: parseFloat(faker.address.longitude())
        }
    }

    public markerContent(): string {
        return `<h1>User Name: ${this.name}</h1>`;
    }
}
