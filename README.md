- setup:
    1 :
    sudo chown -R user:user proj/path
    sudo chmod -R 777 proj/path
    2 : su root
    3 : cd projdir
    4 : npm install
    5 : step 1
- serve:
    ng serve --host HOST_IP --port PORT
- build:
    ng build --prod
- serve build:
    http-server [dist/path] -a HOST_IP -p PORT 
    to run forever:
    http-server [dist/path] -a HOST_IP -p PORT &


# Fuse2

Material Design Admin Template with Angular 5+ and Angular Material 2

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.
