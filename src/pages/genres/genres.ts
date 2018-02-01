import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { DataProvider } from '../../providers/data/data';

const GENRE = 'genre';
const TITLE = 'title';

@IonicPage()
@Component({
  selector: 'page-genres',
  templateUrl: 'genres.html',
})
export class GenresPage {
  genres: Array<any>
  currentGenre: number

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,
    public viewCtrl: ViewController,
    private _data: DataProvider
  ) {
    this._data.getGenres()
      .subscribe(res => this.genres = res)
  }

  ionViewDidEnter() {
    this.storage.get(GENRE).then((val) => {
      if(val) {
        this.currentGenre = val
      }
    })
  }

  genreSelected(genre) {
    this.storage.set(GENRE, genre.id)
    this.storage.set(TITLE, genre.name) // Store homepage title
    this.viewCtrl.dismiss(genre)
  }
}
