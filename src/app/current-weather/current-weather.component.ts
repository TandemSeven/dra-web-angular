import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';

import * as moment from 'moment';

import { Location } from '../services/location.model';
import { LocationService } from '../services/location.service';
import { WeatherService } from '../services/weather.service';
import { UIService } from '../services/ui.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit, OnDestroy, AfterViewInit {
  locationSubscription: Subscription;
  weatherSubscription: Subscription;
  urbanAreaSubscription: Subscription;

  location: Location = {city: '', region: '', lat: 0, lon: 0, timezone: '', zip: ''};
  dayTime: string;
  private days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  iconRegex = /^https:\/\/api.weather.gov\/icons\/land\/(day|night)\/(.*?)(,|\/|\?)/;

  images: {
    web: string;
    mobile: string;
  };
  webImage: string;
  mobileImage: string;

  locWeatherIcon: string;
  locWeatherName: string;
  locWeatherShortForecast: string;
  locWeatherTemp: string;
  locWeatherTempUnit: string;

  constructor(
    private locationService: LocationService,
    private weatherService: WeatherService,
    private uiService: UIService
  ) {}

  ngOnInit() {
    this.locationSubscription = this.locationService.locationChanged.subscribe(
      location => {
        this.location  = location;
        const date = moment();
        this.dayTime = date.format('dddd hh:mm A');
        this.fetchUrbanArea(location.lat, location.lon);
        this.fetchCurrentWeather(location.lat, location.lon);
      }
    );

    this.urbanAreaSubscription = this.locationService.urbanAreaChanged.subscribe(
      data => {
        this.images =
          data._embedded['location:nearest-urban-areas'][0]._embedded[
            'location:nearest-urban-area'
          ]._embedded['ua:images'].photos[0].image;

        this.webImage = this.images.web;
        this.mobileImage = this.images.mobile;
      }
    );

    this.weatherSubscription = this.weatherService.locWeatherChanged.subscribe(
      currWeather => {
        const {
          properties: {
            periods: [period]
          }
        } = currWeather;
        this.locWeatherIcon = this.iconRegex.exec(period.icon)[2];
        this.locWeatherName = period.name;
        this.locWeatherShortForecast = period.shortForecast;
        this.locWeatherTemp = period.temperature;
        this.locWeatherTempUnit = period.temperatureUnit;
        setTimeout(() => {
          this.uiService.clearIsLoading();
        }, 500);
      }
    );

    this.fetchLocation();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.uiService.setIsLoading();
    }, 500);
  }

  ngOnDestroy() {
    this.locationSubscription.unsubscribe();
    this.urbanAreaSubscription.unsubscribe();
    this.weatherSubscription.unsubscribe();
  }

  fetchLocation() {
    this.locationService.fetchCurrentLocation();
  }

  fetchUrbanArea(lat: number, lon: number) {
    this.locationService.fetchNearestUrbanArea(lat, lon);
  }

  fetchCurrentWeather(lat: number, lon: number) {
    this.weatherService.fetchCurrentWeatherForLocation(lat, lon);
  }

    onToggleSidenav() {
      this.uiService.toggleSidenav();
  }
}
