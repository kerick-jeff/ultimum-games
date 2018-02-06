import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { PlatformDetailsPageModule } from '../platform-details/platform-details.module';
import { PlatformsPage } from './platforms';

@NgModule({
  declarations: [
    PlatformsPage,
  ],
  imports: [
    IonicPageModule.forChild(PlatformsPage),
    PlatformDetailsPageModule
  ],
  entryComponents: [
    PlatformsPage
  ]
})
export class PlatformsPageModule {}
