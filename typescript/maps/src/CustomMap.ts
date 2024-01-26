interface Position {
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

    public addMarker(position: Position): void {
        new google.maps.Marker({
            map: this.googleMap,
            position: {
                lat: position.location.lat,
                lng: position.location.lng
            }
        });
    }
}
