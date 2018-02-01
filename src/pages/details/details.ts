import { Component } from '@angular/core';
import { trigger, style, transition, animate, keyframes } from '@angular/animations';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser'
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';

import { DataProvider } from '../../providers/data/data';
import { AdsProvider } from '../../providers/ads/ads';

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
  animations: [
    trigger('fadeIn', [
      transition('void => *', [
        animate('600ms ease-in', keyframes([
          style({ opacity: 0, transform: 'translateY(-70px)', offset: 0 }),
          style({ opacity: 1, transform: 'translateY(25px)', offset: .75 }),
          style({ opacity: 1, transform: 'translateY(0px)', offset: 1 })
        ]))
      ])
    ]),
    trigger('fadeUp', [
      transition('void => *', [
        animate('900ms ease-in', keyframes([
          style({ opacity: 0, transform: 'translateY(70px)', offset: 0 }),
          style({ opacity: 1, transform: 'translateY(0)', offset: 1 })
        ]))
      ])
    ])
  ]
})
export class DetailsPage {
  gameId: number
  game: object
  perspective: object

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _data: DataProvider,
    private iab: InAppBrowser,
    private youtube: YoutubeVideoPlayer,
    private adsProvider: AdsProvider
  ) {
    this.gameId = this.navParams.get("game")
  }

  ionViewDidLoad() {
    this._data.getGame(this.gameId)
      .subscribe(res => {
        if(res[0].player_perspectives != undefined) { 
          this._data.getPerspective(res[0].player_perspectives[0])
            .subscribe(res => this.perspective = res[0])
        } else { 
          this.perspective = undefined
        }

        this.game = res[0]
      })
  }

  launchSite(url) {
    if(url) {
      this.adsProvider.presentInterstitialAd().then(() => {
        this.iab.create(url)
      })
      .catch(e => console.log(e))
    }
  }

  playVideo(video) {
    this.adsProvider.presentInterstitialAd().then(() => {
      this.youtube.openVideo(video)
    })
    .catch(e => console.log(e)) 
  }
}
