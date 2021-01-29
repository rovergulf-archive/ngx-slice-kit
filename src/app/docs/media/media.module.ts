import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SliceKitModule } from 'ngx-slice-kit';

import { DemoMediaRoutingModule } from './media-routing.module';

import { DemoAudioPlayerComponent } from './demo-audio-player/demo-audio-player.component';
import { DemoFilesComponent } from './demo-files/demo-files.component';
import { DemoVideoPlayerComponent } from './demo-video-player/demo-video-player.component';

const entryComponents = [];

const moduleDeclarations = [
  ...entryComponents,
  DemoAudioPlayerComponent,
  DemoFilesComponent,
  DemoVideoPlayerComponent,
];

@NgModule({
  imports: [
    CommonModule,
    DemoMediaRoutingModule,
    SliceKitModule
  ],
  declarations: moduleDeclarations,
  exports: moduleDeclarations,
  entryComponents,
  providers: [],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA,
  ]
})
export class DemoMediaModule {
}
