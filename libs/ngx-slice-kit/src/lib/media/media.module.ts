import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AudioPlayerModule } from './audio-player/audio-player.module';
import { FileModule } from './file/file.module';
import { VideoPlayerModule } from './video-player/video-player.module';

const modules = [
    AudioPlayerModule,
    FileModule,
    VideoPlayerModule,
];

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [],
    exports: [
        ...modules,
    ],
    providers: [],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA,
    ]
})
export class MediaModule {
}
