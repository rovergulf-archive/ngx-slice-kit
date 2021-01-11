import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { RouterModule, Routes } from '@angular/router';

import { ServerCookiesModule } from "ngx-cookie-universal";

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

const routes: Routes = [];

@NgModule({
    imports: [
        AppModule,
        ServerModule,
        RouterModule.forRoot(routes),
        ServerCookiesModule.forRoot(),
    ],
    bootstrap: [AppComponent],
    declarations: [],
})
export class AppServerModule {
}
