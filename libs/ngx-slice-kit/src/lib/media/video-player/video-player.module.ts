import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '../../buttons/icon/icon.module';
import { VideoPlayerComponent } from './video-player.component';


@NgModule({
    declarations: [
        VideoPlayerComponent,
    ],
    exports: [
        VideoPlayerComponent,
    ],
    imports: [
        CommonModule,
        IconModule,
    ],
    providers: [],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA,
    ],
})
export class VideoPlayerModule {
}
