import { FuseofflineComponent } from './main/content/offline/offline.component';
import { FusehomeComponent } from './main/content/home/home.component';
import { PagesModule } from './main/content/pages/pages.module';
import { ColorPickerModule } from 'ngx-color-picker';
import { AuthGuardService } from './core/services/auth-guard-service.service';
import { GlobalService } from './core/services/global.service';
import { LoginService } from './core/services/login.service';
import { CallApiService } from './core/services/call-api.service';
import { MainService } from './core/services/main.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import 'hammerjs';
import { SharedModule } from './core/modules/shared.module';
import { AppComponent } from './app.component';
import { FuseMainModule } from './main/main.module';
import { FuseSplashScreenService } from './core/services/splash-screen.service';
import { FuseConfigService } from './core/services/config.service';
import { FuseNavigationService } from './core/components/navigation/navigation.service';
import { FuseSampleModule } from './main/content/sample/sample.module';
import { TranslateModule } from '@ngx-translate/core';
import { AppDirectionService } from './app-direction.service';
import { MatDialogModule } from '@angular/material/dialog';
// import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { Angular5TimePickerModule } from 'angular5-time-picker';
import { MomentTimezoneModule } from 'angular-moment-timezone';

import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';

const config: SocketIoConfig = { url: 'localhost:3000', options: {} };



const appRoutes: Routes = [


    {
        path: 'home',
        component: FusehomeComponent,
        canActivate: [AuthGuardService],
    },
    {
        path: 'offline',
        component: FuseofflineComponent,
        canActivate: [AuthGuardService],
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];

@NgModule({
    declarations: [
        AppComponent,FuseofflineComponent,FusehomeComponent
    ],
    imports: [
        Angular5TimePickerModule,
        BrowserModule,
        HttpModule,
        HttpClientModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes),
        SharedModule,
        TranslateModule.forRoot(),
        FuseMainModule,

        PagesModule,
        MatDialogModule,
        ColorPickerModule,
        MomentTimezoneModule,
        SocketIoModule.forRoot(config),

    ],
    entryComponents: [],

    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        FuseSplashScreenService,
        FuseConfigService,
        FuseNavigationService,
        AppDirectionService,
        MainService,
        CallApiService,
        LoginService,
        GlobalService,
        AuthGuardService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
