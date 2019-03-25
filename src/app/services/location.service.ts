import { Injectable } from '@angular/core';
import { Subject, zip } from 'rxjs';

import { Location } from './location.model';
import { NearestUrban } from './nearest-urban.model';

import { UIService } from '../services/ui.service';

import { Env } from '../env.enum';

@Injectable()
export class LocationService {
  locationChanged = new Subject<Location>();
  urbanAreaChanged = new Subject<NearestUrban>();
  private location: Location;
  currentZip = '';

  constructor(private uiService: UIService) {
    console.log(Env.VUE_APP_IP_API_HOST);
  }

  async fetchCurrentLocation() {
    const response = await fetch(Env.VUE_APP_IP_API_HOST);
    const data = await response.json();
    if (data.zip === this.currentZip) {
      this.uiService.clearIsLoading();
      return;
    }
    this.currentZip = data.postal;

    this.location = {
      city: data.city,
      lat: data.latitude,
      lon: data.longitude,
      region: data.region,
      timezone: data.timezone,
      zip: data.postal
    };
    // this.currentZip = data.zip;

    // this.location = {
    //   city: data.city,
    //   lat: data.lat,
    //   lon: data.lon,
    //   region: data.region,
    //   timezone: data.timezone,
    //   zip: data.zip
    // };
    this.locationChanged.next({ ...this.location });
  }

  async fetchNearestUrbanArea(lat: number, lon: number) {
    const response = await fetch(
      Env.VUE_APP_IMAGE_API_HOST + `/locations/${lat},${lon}/?embed=location:nearest-urban-areas/location:nearest-urban-area/ua:images`
    );
    const data = await response.json();
    this.urbanAreaChanged.next({ ...data });
  }

  async getLocationByZipCode (zipCode) {
    if (zipCode === this.currentZip) {
      this.uiService.clearIsLoading();
      return;
    }
    const response = await fetch(
      Env.VUE_APP_ZIP_CODE_HOST + zipCode
    );
    const json = await response.json();
    if (response.status + '' !== '200') {
      this.uiService.clearIsLoading();
      return false;
    }
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
