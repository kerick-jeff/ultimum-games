import { Component, ViewChild } from '@angular/core';
import { trigger, style, transition, animate, keyframes } from '@angular/animations';
import { IonicPage, NavController, NavParams, LoadingController, ModalController, Content } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Keyboard } from '@ionic-native/keyboard';

import { DataProvider } from '../../providers/data/data';
import { AdsProvider } from '../../providers/ads/ads';
import { AlertProvider } from '../../providers/alert/alert';

const FAVORITES = 'favorites';
const GENRE = 'genre';
const FILTER = 'filter';
const TITLE = 'title';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  animations: [
    trigger('fadeOut', [
      transition(':leave', [
        animate('600ms ease-in', keyframes([
          style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
          style({ opacity: 0, transform: 'translateX(-50px)', offset: 1 })
        ]))
      ]),
      transition(':enter', [
        animate('600ms ease-in', keyframes([
          style({ opacity: 0, transform: 'translateX(-50px)', offset: 0 }),
          style({ opacity: 1, transform: 'translateX(0)', offset: 1 })
        ]))
      ])
    ])
  ]
})
export class HomePage {
  @ViewChild(Content) content: Content
  title: string = "Ultimum"
  offset: number = 1
  games = []
  favorites = []
  filter: string
  showSearch: boolean = false
  showLoadMore: boolean = false
  refresh: boolean = true

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,
    private _data: DataProvider,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public keyboard: Keyboard,
    private adsProvider: AdsProvider,
    private alertProvider: AlertProvider
  ) {
    
  }

  ionViewWillUnload() {
    this.adsProvider.presentInterstitialAd()
  }

  ionViewWillEnter() {
    if(this.refresh) {
      this.offset = 0
      
      this.storage.get(TITLE).then((val) => {
        if(val) {
          this.title = val
        } else {
          this.title = "Ultimum"
          this.storage.set(TITLE, this.title)
        }
      })

      let loader = this.loadingCtrl.create({
        content: 'Getting Games...'
      })

      loader.present().then(() => {
        // This will determine the title on the homepage load
        this.storage.get(FILTER).then((val) => {
          if(val) {
            switch(val) {
              case 'Genre':
                this.getGamesForGenre()
                break;
              case 'Coming Soon':
                this.getComingSoonGames()
                break;
              default:
                this.getGames()
                break;
            }
          } else {
            this.storage.set(FILTER, 'None').then(() => {
              this.getGames()
            })
          }
        })

        this.storage.get(FAVORITES).then((val) => {
          if(!val) {
            this.storage.set(FAVORITES, this.favorites)
          } else {
            this.favorites = val
          }
        })

        setTimeout(() => {
          loader.dismiss()
        }, 5000)
      })

      this.refresh = false
    }
  }

  private getGames() {
    this._data.getGames(this.offset)
      .subscribe(res => this.games = res)
  }

  private getComingSoonGames() {
    this._data.getComingSoonGames(this.offset)
      .subscribe(res => this.games = res)
  }

  private getGamesForGenre() {
    this.storage.get(GENRE).then((val) => {
      if(val) {
        let genre = val

        this._data.getGamesForGenre(genre, this.offset)
          .subscribe(res => this.games = res)
      }
    })
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');

      this.offset += 1
      
      switch (this.title) {
        case "Ultimum":
          this.getGames()
          break;

        case "Coming Soon":
          this.getComingSoonGames()
          break;

        case "Favorites": // Do nothing because all favorites in favorites array will be displayed at same time
          break;
          
        default:
          this.storage.get(GENRE).then((val) => {
            if(val) {
              this._data.getGenre(val)
                .subscribe(res => {
                  let _genre = res
                  console.log(_genre)
                  if(_genre[0].name == this.title) {
                    console.log("genre: " + _genre)
                    this.getGamesForGenre()
                  } else { // Query search results rather
                    console.log("search: " + this.title)
                    this.search(this.title, this.offset)
                  }
                })
            } else { // Query search results rather
              console.log("search: " + this.title)
              this.search(this.title, this.offset)
            }
          })

          break;
      }      

      // this.getGamesForGenre(this.offset)
      refresher.complete();
    }, 2000);
  }

  openFavorites() {
    this.storage.get(FAVORITES).then((val) => {
      this.title = 'Favorites'

      if(val.length != 0) {
        this._data.getFavorites(val)
          .subscribe(res => this.games = res)
      } else {
        this.games.length = 0
        this.alertProvider.showAlert("No Favorites", "You haven't selected any games as your favorite yet!")
      }
    })
  }

  showSearchBox() {
    this.showSearch = !this.showSearch
    this.content.scrollToTop()
  }

  favorite(game) {
    this.favorites.push(game)

    // Remove duplicate game Ids in the favorites array
    this.favorites = this.favorites.filter((item, i, ar) => {
      return ar.indexOf(item) === i
    })

    this.storage.set(FAVORITES, this.favorites)
  }

  removeFavorite(game) {
    this.favorites = this.favorites.filter((item) => {
      return item !== game
    })

    this.storage.set(FAVORITES, this.favorites)
  }

  searchGames(e) {
    let term = e.target.value
    if(term != '') {
      this.keyboard.close()
      this.title = term

      this.showSearch = false

      this.offset = 0
      this.search(term, this.offset)
    } else {
      this.showSearch = false
    }
  }

  private search(term, offset) {
    this._data.searchGames(this.title, this.offset)
      .subscribe(res => this.games = res)
  }

  filterPage() {
    this.storage.get(FILTER).then((val) => {
      if(!val) {
        this.storage.set(FILTER, 'None')
        this.filter = 'None'
      } else {
        this.filter = val
      }

      let navCallback = (_params) => {
        return new Promise((resolve, reject) => {
          this.refresh = _params
          resolve();
        });
      }

      this.navCtrl.push('FilterPage', {
        filter: this.filter,
        callback: navCallback
      })
    })
  }

  detailsPage(game) {
    let loader = this.loadingCtrl.create({
      content: 'Getting Details...'
    })

    loader.present().then(() => {
      this.navCtrl.push('DetailsPage', {
        game: game
      })

      setTimeout(() => {
        loader.dismiss()
      }, 2000)
    })
  }
}
