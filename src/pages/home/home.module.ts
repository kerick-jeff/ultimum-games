import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';

import { FilterPageModule } from '../filter/filter.module';
import { DetailsPageModule } from '../details/details.module';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    FilterPageModule,
    DetailsPageModule
  ],
})
export class HomePageModule {}
