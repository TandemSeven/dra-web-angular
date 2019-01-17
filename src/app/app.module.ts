import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './material.module';

import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { LocationService } from './services/location.service';
import { WeatherService } from './services/weather.service';
import { UIService } from './services/ui.service';
import { HistoryService } from './services/history.service';
import { WeatherForecastComponent } from './weather-forecast/weather-forecast.component';
import { WaveComponent } from './wave/wave.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { RefreshComponent } from './refresh/refresh.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrentWeatherComponent,
    WeatherForecastComponent,
    WaveComponent,
    SideNavComponent,
    RefreshComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [HistoryService, LocationService, UIService, WeatherService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
