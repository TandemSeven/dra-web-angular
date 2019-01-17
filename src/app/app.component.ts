import { Component, OnInit, OnDestroy } from '@angular/core';

import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { UIService } from './services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  Cloudy = '../assets/svg/weather/021-cloudy-1.svg';
  CloudyWindy = '../assets/svg/weather/021-cloud.svg';
  PartlyCloudyWindy = '../assets/svg/weather/021-cloudy.svg';
  Clear = '../assets/svg/weather/021-sun.svg';
  Rain = '../assets/svg/weather/021-rain.svg';
  RainHighClouds = '../assets/svg/weather/021-rain-2.svg';
  RainLowClouds = '../assets/svg/weather/021-rain-1.svg';
  Sleet = '../assets/svg/weather/021-snowing-1.svg';
  Snowflake = '../assets/svg/weather/021-snowflake.svg';
  Snowing = '../assets/svg/weather/021-snowing-3.svg';
  Storm = '../assets/svg/weather/021-storm.svg';
  Sun = '../assets/svg/weather/021-sun.svg';
  Sunset = '../assets/svg/weather/021-sunset.svg';
  Tornado = '../assets/svg/weather/021-tornado.svg';

  iconMap = {
    bkn: this.Cloudy,
    blizzard: this.Snowflake,
    cold: this.Snowflake,
    dust: this.Tornado,
    few: this.Cloudy,
    fog: this.Sunset,
    fzra: this.Sleet,
    haze: this.Sunset,
    hot: this.Sun,
    hurricane: this.Tornado,
    ovc: this.Cloudy,
    rain: this.Rain,
    rain_fzra: this.Snowflake,
    rain_showers: this.RainHighClouds,
    rain_showers_hi: this.RainLowClouds,
    rain_snow: this.Sleet,
    rain_sleet: this.Sleet,
    sct: this.Cloudy,
    skc: this.Clear,
    sleet: this.Sleet,
    smoke: this.Tornado,
    snow: this.Snowing,
    snow_fzra: this.Sleet,
    snow_sleet: this.Sleet,
    tornado: this.Tornado,
    tropical_storm: this.Storm,
    tsra: this.Storm,
    tsra_sct: this.Storm,
    tsra_hi: this.Storm,
    wind_bkn: this.CloudyWindy,
    wind_ovc: this.CloudyWindy,
    wind_sct: this.PartlyCloudyWindy,
    wind_skc: this.Clear,
    wind_few: this.PartlyCloudyWindy
  };

  sidenavOpen = false;
  sidenavSubscription: Subscription;

  loadingSubscription: Subscription;

  spinnerVisible = false;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private uiService: UIService
  ) {
    Object.keys(this.iconMap).forEach(icon => {
      this.matIconRegistry.addSvgIcon(
        icon,
        this.domSanitizer.bypassSecurityTrustResourceUrl(this.iconMap[icon])
      );
    });
  }

  ngOnInit() {
    this.sidenavSubscription = this.uiService.sidenavToggled.subscribe(() => {
      this.sidenavOpen = !this.sidenavOpen;
    });

    this.loadingSubscription = this.uiService.loadingChanged.subscribe(isLoading => this.spinnerVisible = isLoading);
  }

  ngOnDestroy() {
    this.sidenavSubscription.unsubscribe();
    this.loadingSubscription.unsubscribe();
  }
}
