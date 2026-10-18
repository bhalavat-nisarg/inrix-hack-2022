import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { MapComponent } from './map.component';
import { OSMPlace } from '../interfaces';

declare const L: typeof import('leaflet');

describe('MapComponent', () => {
  let http: jasmine.SpyObj<HttpClient>;
  let component: MapComponent;

  beforeEach(() => {
    http = jasmine.createSpyObj<HttpClient>('HttpClient', ['get']);
    component = new MapComponent(http);
  });

  afterEach(() => component.searchAddress.clear());

  it('registers clustering on the configured Leaflet instance', () => {
    expect(L.markerClusterGroup() instanceof L.FeatureGroup).toBeTrue();
  });

  it('preserves the GeoJSON cluster shape', () => {
    expect(component.getgeojsonFeature([[1, 2], [3, 4]])).toEqual({
      type: 'Feature',
      properties: { density: 2, source: [1, 2], destination: [3, 4] },
      geometry: { type: 'MultiPoint', coordinates: [[1, 2], [3, 4]] },
    });
  });

  it('loads address suggestions without a live network request', async () => {
    const results: OSMPlace[] = [];
    http.get.and.returnValue(of(results));
    component.searchBoxAddress = 'San Francisco';
    await component.searchOSMApi();
    expect(component.osmResults).toEqual(results);
    expect(http.get).toHaveBeenCalledWith(
      'https://nominatim.openstreetmap.org/search?format=json&q=San Francisco'
    );
  });
});
