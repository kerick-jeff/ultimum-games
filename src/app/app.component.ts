import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { PlatformsPage } from '../pages/platforms/platforms';
import { MiscPage } from '../pages/misc/misc';
import { RateProvider } from '../providers/rate/rate';
import { AdsProvider } from '../providers/ads/ads';
import { Network } from '@ionic-native/network';
import { AlertProvider } from '../providers/alert/alert';
import { CacheService } from 'ionic-cache';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage
  platformsPage:any = PlatformsPage
  miscPage: any = MiscPage

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    rateProvider: RateProvider,
    adsProvider: AdsProvider,
    network: Network,
    alertProvider: AlertProvider,
    cache: CacheService
  ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      
      // Set TTL to 30d
      cache.setDefaultTTL(60 * 60 * 24 * 30);
 
      // Keep our cached results when device is offline!
      cache.setOfflineInvalidate(false);

      adsProvider.presentBannerAd().then(() => { })
        .catch(e => console.log(e));
        
      rateProvider.initiate();

      network.onDisconnect().subscribe(() => {
        alertProvider.showAlert("Offline", "Please, try to make sure you are connected to the internet")
      });
    });
  }
}

