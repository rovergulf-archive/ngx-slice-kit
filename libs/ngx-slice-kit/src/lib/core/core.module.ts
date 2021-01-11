import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthGuard } from "./guards/auth.guard";
import { AdminGuard } from "./guards/admin.guard";
import { ExternalAuthGuard } from "./guards/external-auth.guard";

import { ImagePathPipe } from './pipes/image-path.pipe';
import { MediaPathPipe } from './pipes/media-path.pipe';

import { ApiService } from "./services/api.service";
import { AuthService } from "./services/auth.service";
import { ErrorService } from "./services/error.service";
import { SocketService } from "./services/socket.service";
import { HttpClientModule } from "@angular/common/http";

const moduleDeclarations = [
    // pipes
    ImagePathPipe,
    MediaPathPipe,
]

const moduleProvides = [
    // guards
    AdminGuard,
    AuthGuard,
    ExternalAuthGuard,
    // services
    ApiService,
    AuthService,
    ErrorService,
    SocketService
]

@NgModule({
    declarations: moduleDeclarations,
    providers: moduleProvides,
    imports: [
        CommonModule,
        HttpClientModule,
    ],
    schemas: [
        NO_ERRORS_SCHEMA,
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class CoreModule {
}
