import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MaterialModule } from './material.module';

import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { WeatherForecastComponent } from './weather-forecast/weather-forecast.component';
import { WaveComponent } from './wave/wave.component';


@NgModule({
  declarations: [
    AppComponent,
    CurrentWeatherComponent,
    WeatherForecastComponent,
    WaveComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
