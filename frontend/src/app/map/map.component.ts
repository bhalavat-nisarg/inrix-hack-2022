import { AfterViewInit, Component } from "@angular/core";
import * as L from 'leaflet';
import * as geojson from 'geojson';

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map;
  geojsonFeature: geojson.Feature = {
    "type": "Feature",
    "properties": {
      "name": "Coors Field",
      "amenity": "Baseball Stadium",
      "popupContent": "This is where the Rockies play!",
      "radius": 443.0003055263856,

    },
    "geometry": {
      "type": "MultiPoint",
      "coordinates": [[-100, 40], [-101, 41], [-101, 40]]
    }
  };

  private initMap(): void {
    this.map = L.map('map', {
      center: [39.8282, -98.5795],
      zoom: 3
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);


    L.geoJSON(this.geojsonFeature).addTo(this.map);
  }

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
  }

}