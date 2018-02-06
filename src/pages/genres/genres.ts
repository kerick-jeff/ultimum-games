import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { DataProvider } from '../../providers/data/data';
import { AlertProvider } from '../../providers/alert/alert';

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
  offset: number = 0
  total: number
  numPages: number
  currentPage: number = 1
  more: boolean = true

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,
    public viewCtrl: ViewController,
    private _data: DataProvider,
    private alertProvider: AlertProvider
  ) {
    this._data.getGenresCount().subscribe(res => {
      this.total = res.count
      this.numPages = Math.ceil(this.total / 50) // 50 is the limit used in this._data.getPlatform()
      if(this.currentPage >= this.numPages) {
        this.more = false
      }
    }, err => {
      this.alertProvider.showAlert("No Internet", "Please make sure you are connected to the internet")
    })
  }

  ionViewDidLoad() {
    this.storage.get(GENRE).then((val) => {
      if(val) {
        this.currentGenre = val
      }
    })

    this._data.getGenres(this.offset)
      .subscribe(res => {
        this.genres = res
      }, err => {
        this.alertProvider.showAlert("No Internet", "Please make sure you are connected to the internet")
      })
  }

  genreSelected(genre) {
    this.storage.set(GENRE, genre.id)
    this.storage.set(TITLE, genre.name) // Store homepage title
    this.viewCtrl.dismiss(genre)
  }

  loadMore() {
    this.currentPage += 1
    this.offset = this.currentPage - 1
    this._data.getGenres(this.offset)
      .subscribe(res => {
        this.genres = res

        if(this.currentPage >= this.numPages) {
          this.more = false
        }
      }, err => {
        this.alertProvider.showAlert("No Internet", "Please make sure you are connected to the internet")
      })
  }
}
