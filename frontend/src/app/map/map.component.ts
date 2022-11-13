import { AfterViewInit, Component } from "@angular/core";
import * as L from 'leaflet';
import * as geojson from 'geojson';
import { HttpClient } from '@angular/common/http';
import { OSMPlace } from "../interfaces";
import * as debounce from "debounce";
import { generateRandomColor } from '../utils';
import 'leaflet.markercluster';
import { Control } from "leaflet";

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
        "density": coordinates?.length,
      },
      "geometry": {
        "type": "MultiPoint",
        "coordinates": coordinates
      }
    }
  }
  featureCollections: geojson.FeatureCollection = { "type": "FeatureCollection", "features": [] }
  constructor(public http: HttpClient) {
    // this.getCluster()

  }
  async searchOSMApi() {
    this.selectedAddress = undefined;
    this.osmResults = await this.http.get<OSMPlace[]>("https://nominatim.openstreetmap.org/search?format=json&q=" + this.searchBoxAddress).toPromise();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [37.788848, -122.425186],
      zoom: 12
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      // attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
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
    this.map.setView([res.lat, res.lon], 12)
    new L.Circle([res.lat, res.lon], { color: 'red', radius: 500 }).addTo(this.map);
    L.marker([res.lat, res.lon]).addTo(this.map);
    this.http.get(`http://localhost:3000/getTripsByDate?point=${res.lat}%7C${res.lon}&radius=500ft`).toPromise().then((data: [[any]]) => {
      let points = []
      console.log(data)
      for (let i = 0; i < data?.length; i++) {
        for (let j = 0; j < data[i]?.length; j++) {
          points.push(this.getgeojsonFeature([data[i][j][0], data[i][j][1]]))
        }
      }
      const marker = L.markerClusterGroup()
      console.log(points)
      this.featureCollections.features = points;
      L.geoJSON(this.featureCollections, {
        onEachFeature: function (feature, layer) {

          const popupContent =
            '<h4 class = "text-primary">Cluster</h4>' +
            '<div class="container"><table class="table table-striped">' +
            "<thead><tr><th>Properties</th><th>Value</th></tr></thead>" +
            "<tbody><tr><td> Density </td><td>" +
            feature.properties.density +
            "</td></tr>";
          // "<tr><td>Elevation </td><td>" +
          // feature.properties.ele +
          // "</td></tr>" +
          // "<tr><td> Power (watt) </td><td>" +
          // feature.properties.Power_Watt +
          // "</td></tr>" +
          // "<tr><td> Pole Height </td><td>" +
          // feature.properties.pole_hgt +
          // "</td></tr>" +
          // "<tr><td> Time </td><td>" +
          // feature.properties.time +
          // "</td></tr>";

          layer.bindPopup(popupContent);

        },
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
      // var info = new L.Control();

      // info.onAdd = function (map) {
      //   this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
      //   // this.update();
      //   return this._div;
      // };

      // method that we will use to update the control based on feature properties passed
      // info. = function (props) {
      //   this._div.innerHTML = '<h4>US Population Density</h4>' + (props ?
      //     '<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>'
      //     : 'Hover over a state');
      // };

      // info.addTo(this.map);
      this.map.addLayer(marker)
      console.log(data);
    })
    // this.getDateData((res?.lat ?? 0).toString(),(res?.lon ?? 0).toString());
  }

}