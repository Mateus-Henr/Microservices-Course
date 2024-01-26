interface Mappable {
    location: {
        lat: number,
        lng: number
    }
}

export class CustomMap {
    private googleMap: google.maps.Map;

    constructor(divId: string, lat: number, lng: number) {
        this.googleMap = new google.maps.Map(document.getElementById(divId), {
            zoom: 1,
            center: {
                lat: lat,
                lng: lng
            }
        });
    }
    // By using th e "|" we make an object that only has the properties that are common in both classes. BAD APPROACH.
    // public addMarker2(mappable: User | Company): void {
    //     new google.maps.Marker({
    //         map: this.googleMap,
    //         position: {
    //             lat: mappable.location.lat,
    //             lng: mappable.location.lng
    //         }
    //     });
    // }

    public addMarker(mappable: Mappable): void {
        new google.maps.Marker({
            map: this.googleMap,
            position: {
                lat: mappable.location.lat,
                lng: mappable.location.lng
            }
        });
    }
}
