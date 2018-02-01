import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

const FILTEROPTIONS: string[] = [
  'None',
  'Genre',
  'Coming Soon'
];

const TITLE = "title";
const FILTER = 'filter';

@IonicPage()
@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html',
})
export class FilterPage {
  options: string[]
  currentFilter: string
  callback: any

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController
  ) {
    this.options = FILTEROPTIONS
    this.currentFilter = navParams.get(FILTER)
    this.callback = navParams.get("callback")
  }

  optionSelected(option: string) {
    this.currentFilter = option

    switch(this.currentFilter) {
      case FILTEROPTIONS[1]: // Genres
        let loader = this.loadingCtrl.create({
          content: 'Getting Genres...'
        })

        loader.present().then(() => {
          this.openGenres()

          setTimeout(() => {
            loader.dismiss()
          }, 3500)
        })
        
        break;
      case FILTEROPTIONS[2]: // Coming Soon
        this.storage.set(FILTER, this.currentFilter).then(() => {
          this.storage.set(TITLE, this.currentFilter).then(() => {
            this.callback(true).then(() => {
              this.navCtrl.pop()
            })
          })
        })
        break;
      default: // None
        this.storage.set(FILTER, this.currentFilter).then(() => {
          this.storage.set(TITLE, 'Ultimum').then(() => {
            this.callback(true).then(() => {
              this.navCtrl.pop()
            })
          })
        })
        break;
    }
  }

  private openGenres() {
    let genresModal = this.modalCtrl.create('GenresPage');

    genresModal.onDidDismiss(genre => {
      if(genre) {
        this.storage.set(FILTER, this.currentFilter).then(() => {
          this.callback(true).then(() => {
            this.navCtrl.pop()
          })
        })
      }
    })

    genresModal.present()
  }
}
