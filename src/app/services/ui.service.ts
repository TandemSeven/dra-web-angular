import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class UIService {
  sidenavToggled = new Subject<void>();
  sidenavClose = new Subject<void>();
  loadingChanged = new Subject<boolean>();

  isLoading = false;

  constructor() {}

  toggleSidenav() {
    this.sidenavToggled.next();
  }

  closeSidenav() {
    this.sidenavClose.next();
  }

  setIsLoading() {
    this.isLoading = true;
    this.loadingChanged.next(this.isLoading);
  }

  clearIsLoading() {
    this.isLoading = false;
    this.loadingChanged.next(this.isLoading);
  }
}
