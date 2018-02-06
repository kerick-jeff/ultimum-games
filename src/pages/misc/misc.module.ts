import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { MiscPage } from './misc';

@NgModule({
  declarations: [
    MiscPage,
  ],
  imports: [
    IonicPageModule.forChild(MiscPage),
  ],
  entryComponents: [
    MiscPage
  ]
})
export class MiscPageModule {}
