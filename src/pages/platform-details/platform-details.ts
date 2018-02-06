import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AdsProvider } from '../../providers/ads/ads';
import { AlertProvider } from '../../providers/alert/alert';

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
    private adsProvider: AdsProvider,
    private alertProvider: AlertProvider
  ) {
    this.platform = navParams.get(PLATFORM)
  }

  launchSite(url) {
    if(url) {
      this.adsProvider.presentInterstitialAd().then(() => {
        this.iab.create(url)
      })
      .catch(e => {
        this.alertProvider.showAlert("Launch issue", "Error while launching site")
      })
    }
  }
}
