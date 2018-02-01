import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AdsProvider } from '../../providers/ads/ads';

const PLATFORM = "platform";

@IonicPage()
@Component({
  selector: 'page-platform-details',
  templateUrl: 'platform-details.html',
})
export class PlatformDetailsPage {
  platform: any

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public iab: InAppBrowser,
    private adsProvider: AdsProvider
  ) {
    this.platform = navParams.get(PLATFORM)
  }

  launchSite(url) {
    if(url) {
      this.adsProvider.presentInterstitialAd().then(() => {
        this.iab.create(url)
      })
      .catch(e => console.log(e))
    }
  }
}
