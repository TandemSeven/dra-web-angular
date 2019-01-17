# dra-web-angular

This dra demonstrates the Angular Javascript Framework.  It makes extensive use of RxJs as supplied with Angular as well as Angular Material. While there is only a single page for this dra, sample routing has been implemented to ensure that all requests are routed to the default "base" route.

The app displays current and forecasted weather for your current location and also allows searching weather for another location by zip code.

Data is powered by a few free/open APIs (IP API to convert IP to Lat/Long Coordinates, Zippopotamus to convert Coordinates to Zip Code, and Weather.gov for all weather-related dat
While there is only a single "route" a simple routing implementation is used to ensure that only the valid "base" route is accessed. 

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.4.

# Usage/CLI commands
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
