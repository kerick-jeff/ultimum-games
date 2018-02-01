import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlatformDetailsPage } from './platform-details';

@NgModule({
  declarations: [
    PlatformDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(PlatformDetailsPage),
  ],
})
export class PlatformDetailsPageModule {}
