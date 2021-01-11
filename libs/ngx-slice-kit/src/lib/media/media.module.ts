import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

// import {AudioPlayerComponent} from './audio-player/audio-player.component';
// import {VideoPlayerComponent} from './video-player/video-player.component';
// import {FileComponent} from './file/file.component';

const moduleDirectives = [];

const moduleDeclarations = [
    ...moduleDirectives,
    // AudioPlayerComponent,
    // FileComponent,
    // VideoPlayerComponent,
];

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: moduleDeclarations,
    exports: moduleDeclarations,
    providers: [],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA,
    ]
})
export class MediaModule {
}
