import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { RouterModule, Routes } from '@angular/router';

import { CookieBackendModule } from 'ngx-cookie-backend';


import { AppModule } from './app.module';
import { AppComponent } from './app.component';

const routes: Routes = [];

@NgModule({
    imports: [
        AppModule,
        ServerModule,
        RouterModule.forRoot(routes),
        CookieBackendModule.forRoot(),
    ],
    bootstrap: [AppComponent],
    declarations: [],
})
export class AppServerModule {
}
