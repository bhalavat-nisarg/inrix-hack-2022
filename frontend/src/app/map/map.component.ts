import { AfterViewInit, Component } from "@angular/core";
import * as L from 'leaflet';
import * as geojson from 'geojson';
import { HttpClient } from '@angular/common/http';

// import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
// const provider = new OpenStreetMapProvider();


@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map;
  selectedAddress;
  geojsonFeature: geojson.Feature = {
    "type": "Feature",
    "properties": {
      "name": "Coors Field",
      "amenity": "Baseball Stadium",
      "popupContent": "This is where the Rockies play!"

    },
    "geometry": {
      "type": "MultiPoint",
      "coordinates": []
    }
  };
  constructor(public http: HttpClient) {
    this.getCluster()

  }
  // async searchOSMApi() {
  //   this.selectedAddress = undefined;
  //   this.osmResults = await this.http.get<OSMPlace[]>("https://nominatim.openstreetmap.org/search?format=json&q=" + this.searchBoxAddress).toPromise();
  // }

  private initMap(): void {
    this.map = L.map('map', {
      center: [37.3706687, -122.002572],
      zoom: 5
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      // attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }
  getCluster() {
    this.http.get("http://localhost:3000/getCluster").toPromise().then((data: []) => {
      console.log(data)
      let points = []
      for (let i = 0; i < data?.length; i++) {
        points = [...points, ...data[i]["elements"]]
      }
      this.geojsonFeature.geometry["coordinates"] = points;
      console.log(this.geojsonFeature);
      L.geoJSON(this.geojsonFeature).addTo(this.map);
    })

  }

  ngAfterViewInit(): void {
    this.initMap();
  }

}