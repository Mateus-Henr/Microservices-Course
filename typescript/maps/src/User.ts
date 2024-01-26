import {faker} from "@faker-js/faker"; // Type definition files for ts, usually at "@type/{library}".

export class User { // We don't use default statement in ts.
    public name: string;
    public location: {
        lat: number,
        lng: number
    };

    constructor() {
        this.name = faker.name.fullName();
        this.location = {
            lat: parseFloat(faker.address.latitude()),
            lng: parseFloat(faker.address.longitude())
        }
    }
}
