import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { UIService } from '../services/ui.service';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { HistoryService } from '../services/history.service';
import { Subscription } from 'rxjs';
import { LocationService } from '../services/location.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit, OnDestroy {
  locationForm: FormGroup;
  historySubscription: Subscription;
  @ViewChild('form') formValues;

  zipHistory: string[] = [];

  constructor(
    private historyService: HistoryService,
    private locationService: LocationService,
    private uiService: UIService
  ) {}

  ngOnInit() {
    this.historySubscription = this.historyService.historyChanged.subscribe(
      history => {
        this.zipHistory = history;
      }
    );
    this.zipHistory = this.historyService.get();
  }

  ngOnDestroy() {
    this.historySubscription.unsubscribe();
  }

  onClose() {
    this.uiService.toggleSidenav();
  }

  onSubmit(form: NgForm) {
    this.getWeatherByZip(form.value.zipcode);
  }

  currentLocation(e: any) {
    e.preventDefault();
    this.uiService.setIsLoading();
    this.uiService.toggleSidenav();
    this.locationService.fetchCurrentLocation();
  }

  clearHistory() {
    this.historyService.clear();
  }

  getWeatherByZip(zipcode: string) {
    this.uiService.toggleSidenav();
    this.uiService.setIsLoading();
    this.locationService.getLocationByZipCode(zipcode);
    // give some time for the sidenav to close
    setTimeout(() => {
      this.historyService.set(zipcode);
      this.formValues.resetForm();
    }, 500);
  }
}
