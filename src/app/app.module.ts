import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { RouterModule } from '@angular/router';
// libraries
import { SliceKitModule } from 'ngx-slice-kit';
import { BrowserCookiesModule } from 'ngx-cookie-universal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';
import { CoreModule, ToolsModule } from '@rovergulf/ngx-engine-kit';
import { environment } from '../environments/environment';


@NgModule({
    imports: [
        BrowserModule.withServerTransition({appId: 'ngx-slice-kit'}),
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
        BrowserAnimationsModule,
        AppRoutingModule,
        // external
        BrowserCookiesModule.forRoot(),
        // slice kit
        SliceKitModule,
        CoreModule,
        ToolsModule,
        // internal packages
        SharedModule,
        RouterModule,
        // feature modules
        // DocsModule,
        // GuidesModule,
        // ResourcesModule
    ],
    declarations: [
        AppComponent,
    ],
    providers: [],
    bootstrap: [AppComponent],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA,
    ]
})
export class AppModule {
}
