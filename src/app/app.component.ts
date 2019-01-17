import { Component, OnInit, OnDestroy } from '@angular/core';

import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { UIService } from './services/ui.service';
import { Subscription } from 'rxjs';

import { CreateIconMap } from './iconMap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  sidenavOpen = false;
  sidenavSubscription: Subscription;

  loadingSubscription: Subscription;

  spinnerVisible = false;

  iconMap = CreateIconMap();

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private uiService: UIService
  ) {
    // inject the custom icons into the mat-icon library
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

    this.loadingSubscription = this.uiService.loadingChanged.subscribe(
      isLoading => (this.spinnerVisible = isLoading)
    );
  }

  ngOnDestroy() {
    this.sidenavSubscription.unsubscribe();
    this.loadingSubscription.unsubscribe();
  }
}
