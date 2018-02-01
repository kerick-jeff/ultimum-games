import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FilterPage } from './filter';

import { GenresPageModule } from '../genres/genres.module';

@NgModule({
  declarations: [
    FilterPage,
  ],
  imports: [
    IonicPageModule.forChild(FilterPage),
    GenresPageModule
  ],
})
export class FilterPageModule {}
