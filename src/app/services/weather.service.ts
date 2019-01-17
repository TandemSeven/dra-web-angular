import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Env } from '../env.enum';

@Injectable()
export class WeatherService {
  locWeatherChanged = new Subject<any>();
  locForcastChanged = new Subject<any>();

  async fetchCurrentWeatherForLocation(lat: number, lon: number) {
    const response = await fetch(
      Env.VUE_APP_WEATHER_API_HOST + `/points/${lat},${lon}/forecast/hourly`
    );

    const json = await response.json();
    this.locWeatherChanged.next(json);
  }

  async fetchForecastForLocation(lat: number, lon: number) {
    const response = await fetch(
      Env.VUE_APP_WEATHER_API_HOST + `/points/${lat},${lon}/forecast`
    );
    const data = await response.json();
    this.locForcastChanged.next(data);
  }
}
