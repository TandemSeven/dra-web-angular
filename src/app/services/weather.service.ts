import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class WeatherService {
  locWeatherChanged = new Subject<any>();
  locForcastChanged = new Subject<any>();

  async fetchCurrentWeatherForLocation(lat: number, lon: number) {
    const response = await fetch(
      `https://api.weather.gov/points/${lat},${lon}/forecast/hourly`
    );

    const json = await response.json();
    this.locWeatherChanged.next(json);
  }

  async fetchForecastForLocation(lat: number, lon: number) {
    const response = await fetch(
      `https://api.weather.gov/points/${lat},${lon}/forecast`
    );
    const data = await response.json();
    this.locForcastChanged.next(data);
  }
}
