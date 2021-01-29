import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DemoAudioPlayerComponent } from './demo-audio-player/demo-audio-player.component';
import { DemoFilesComponent } from './demo-files/demo-files.component';
import { DemoVideoPlayerComponent } from './demo-video-player/demo-video-player.component';

const routes: Routes = [
  {path: 'audio', component: DemoAudioPlayerComponent},
  {path: 'files', component: DemoFilesComponent},
  {path: 'video', component: DemoVideoPlayerComponent},
  {path: '', redirectTo: 'audio', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoMediaRoutingModule {
}
