import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AppVersion } from '@ionic-native/app-version';
import { RateProvider } from '../../providers/rate/rate';

@IonicPage()
@Component({
  selector: 'page-misc',
  templateUrl: 'misc.html',
})
export class MiscPage {
  name: string
  description: string
  version: number

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public platform: Platform,
    private socialSharing: SocialSharing,
    private appVersion: AppVersion,
    private rateProvider: RateProvider
  ) {
    this.platform.ready().then(() => {
      this.setAppDetails()
    })
  }

  public share() {
    this.socialSharing.shareWithOptions({
      message: "Hello Pal! This is the fun, 'The Ultimate Game Place'. Download the app from Google Playstore and catch the feel like others...",
      subject: 'Ultimum Games',
      url: "https://play.google.com/store/apps/details?id=com.ultimum.games",
      chooserTitle: "Share With Friends"
    })
  }

  public rate() {
    this.rateProvider.rate()
  }

  private setAppDetails() {
    this.appVersion.getAppName().then((val) => {
      if(val) {
        this.name = val
      }
    })

    this.appVersion.getVersionNumber().then((val) => {
      if(val) {
        this.version = val
      }
    })
  }
  
}
