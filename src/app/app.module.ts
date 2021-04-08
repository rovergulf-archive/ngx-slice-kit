import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { RouterModule } from '@angular/router';

import { CookieModule } from 'ngx-cookie';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';
import { environment } from '../environments/environment';
import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';


@NgModule({
    imports: [
        BrowserModule.withServerTransition({appId: 'ngx-slice-kit'}),
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
        BrowserAnimationsModule,
        AppRoutingModule,
        // external
        CookieModule.forRoot(),
        // slice kit
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
    providers: [
        {
            provide: HIGHLIGHT_OPTIONS,
            useValue: {
                coreLibraryLoader: () => import('highlight.js/lib/core'),
                languages: {
                    typescript: () => import('highlight.js/lib/languages/typescript'),
                    scss: () => import('highlight.js/lib/languages/scss'),
                    css: () => import('highlight.js/lib/languages/css'),
                }
            }
        }
    ],
    bootstrap: [AppComponent],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA,
    ]
})
export class AppModule {
}
