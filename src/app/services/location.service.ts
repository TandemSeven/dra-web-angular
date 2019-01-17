import { Injectable } from '@angular/core';
import { Subject, zip } from 'rxjs';

import { Location } from './location.model';
import { NearestUrban } from './nearest-urban.model';

import { UIService } from '../services/ui.service';

@Injectable()
export class LocationService {
  locationChanged = new Subject<Location>();
  urbanAreaChanged = new Subject<NearestUrban>();
  private location: Location;
  currentZip = '';

  constructor(private uiService: UIService) {}

  async fetchCurrentLocation() {
    const response = await fetch('http://ip-api.com/json');
    const data = await response.json();
    if (data.zip === this.currentZip) {
      this.uiService.clearIsLoading();
      return;
    }
    this.currentZip = data.zip;

    this.location = {
      city: data.city,
      lat: data.lat,
      lon: data.lon,
      region: data.region,
      timezone: data.timezone,
      zip: data.zip
    };
    this.locationChanged.next({ ...this.location });
  }

  async fetchNearestUrbanArea(lat: number, lon: number) {
    const response = await fetch(
      `https://api.teleport.org/api/locations/${lat},${lon}/?embed=location:nearest-urban-areas/location:nearest-urban-area/ua:images`
    );
    const data = await response.json();
    this.urbanAreaChanged.next({ ...data });
  }

  fetchRequestedLocation(zip: String) {
    this.location = {
      city: 'Washington',
      lat: 34.2321,
      lon: -84.158,
      region: 'DC',
      timezone: 'America/New_York',
      zip: '20001'
    };
    this.locationChanged.next({ ...this.location });
  }

  async getLocationByZipCode (zipCode) {
    if (zipCode === this.currentZip) {
      this.uiService.clearIsLoading();
      return;
    }
    const response = await fetch(
      `http://api.zippopotam.us/us/${zipCode}`
    );
    const json = await response.json();
    const {
      places: [place]
    } = json;
    this.currentZip = zipCode;

    this.location = {
      city: place['place name'],
      region: place['state abbreviation'],
      lat: place['latitude'],
      lon: place['longitude'],
      zip: zipCode,
      timezone: ''
    };

    this.locationChanged.next({ ...this.location });
  }
}
