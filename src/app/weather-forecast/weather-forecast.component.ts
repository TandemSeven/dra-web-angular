import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { Subscription } from 'rxjs';
import { LocationService } from '../services/location.service';

import * as formatDate from 'date-fns/format';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css']
})
export class WeatherForecastComponent implements OnInit {
  forecastSubscription: Subscription;
  locWeatherSubscription: Subscription;
  locationSubscription: Subscription;

  forecasts = [];
  currentTemp = '';
  currentTempUnit = '';

  iconRegex = /^https:\/\/api.weather.gov\/icons\/land\/(day|night)\/(.*?)(,|\/|\?)/;

  constructor(
    private weatherService: WeatherService,
    private locService: LocationService
  ) {}

  ngOnInit() {
    this.locationSubscription = this.locService.locationChanged.subscribe(
      response => {
        this.fetchForecast(response.lat, response.lon);
      }

     );
    this.locWeatherSubscription = this.weatherService.locWeatherChanged.subscribe(
      response => {
        this.currentTemp = response.properties.periods[0].temperature;
        this.currentTempUnit = response.properties.periods[0].temperatureUnit;
      }
    );

    this.forecastSubscription = this.weatherService.locForcastChanged.subscribe(
      response => {
        this.forecasts = [];
        const {
          properties: { periods = [] }
        } = response;

        let temp = {};

        periods.map(period => {
          const { isDaytime } = period;

          if (isDaytime) {
            temp = {
              high: period,
              icon: this.iconRegex.exec(period.icon)[2],
              name: formatDate(period.startTime, 'ddd')
            };
          } else {
            temp = {
              ...temp,
              low: period,
              icon: this.iconRegex.exec(period.icon)[2],
              name: formatDate(period.startTime, 'ddd')
            };

            this.forecasts.push(temp);
          }
        });
      }
    );
  }

  fetchForecast(lat: number, lon: number) {
    this.weatherService.fetchForecastForLocation(lat, lon);
  }
}
