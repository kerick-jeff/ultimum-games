import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-start',
  templateUrl: 'start.html'
})
export class StartPage {
  subtitle: string = "The Ultimate Game Place"

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}
