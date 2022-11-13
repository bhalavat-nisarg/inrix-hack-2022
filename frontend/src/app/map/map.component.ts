import { AfterViewInit, Component } from "@angular/core";
import * as L from 'leaflet';
import * as geojson from 'geojson';
import { HttpClient } from '@angular/common/http';
import { OSMPlace } from "../interfaces";
import * as debounce from "debounce";
import { generateRandomColor } from '../utils';
import 'leaflet.markercluster';

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
  points: any[] = [];
  searchBoxAddress = "";
  osmResults: OSMPlace[] | undefined = [];

  searchAddress = debounce(this.searchOSMApi, 500);
  getgeojsonFeature(coordinates: Array<any>): geojson.Feature {
    return {
      "type": "Feature",
      "properties": {
        "density": coordinates.length
      },
      "geometry": {
        "type": "MultiPoint",
        "coordinates": coordinates
      }
    }
  }
  featureCollections: geojson.FeatureCollection = { "type": "FeatureCollection", "features": [] }
  constructor(public http: HttpClient) {
    this.getCluster()

  }
  async searchOSMApi() {
    this.selectedAddress = undefined;
    this.osmResults = await this.http.get<OSMPlace[]>("https://nominatim.openstreetmap.org/search?format=json&q=" + this.searchBoxAddress).toPromise();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [37.3706687, -122.002572],
      zoom: 12
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
      let points = []
      for (let i = 0; i < data?.length; i++) {
        points.push(this.getgeojsonFeature([data[i][0], data[i][1]]))
      }
      const marker = L.markerClusterGroup()
      console.log(points)
      this.featureCollections.features = points
      console.log(this.featureCollections)
      L.geoJSON(this.featureCollections, {
        pointToLayer: function (feature, latlang) {
          return marker.addLayer(L.circleMarker(latlang, {
            radius: 8,
            fillColor: generateRandomColor(),
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
          }))
        }
      }).addTo(this.map);
      this.map.addLayer(marker)
    })

  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  selectAddress(res: OSMPlace | undefined) {
    if (res == null || res == undefined) {
      return;
    }
    for (let p of this.points) {
      this.map.removeLayer(p);
    }
    this.points = [];
    this.selectedAddress = res;
    this.searchBoxAddress = res?.display_name ?? "";
    this.searchAddress.clear();
    console.log(res);
    // this.getDateData((res?.lat ?? 0).toString(),(res?.lon ?? 0).toString());
  }

}