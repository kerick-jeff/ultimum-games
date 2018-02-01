import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { Keyboard } from '@ionic-native/keyboard';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRate } from '@ionic-native/app-rate';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AppVersion } from '@ionic-native/app-version';
import { AdMobFree } from '@ionic-native/admob-free';
import { Network } from '@ionic-native/network';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PlatformsPage } from '../pages/platforms/platforms';
import { MiscPage } from '../pages/misc/misc';
import { AlertProvider } from '../providers/alert/alert';
import { RateProvider } from '../providers/rate/rate';
import { DataProvider } from '../providers/data/data';
import { AdsProvider } from '../providers/ads/ads';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PlatformsPage,
    MiscPage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PlatformsPage,
    MiscPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider,
    Keyboard,
    InAppBrowser,
    YoutubeVideoPlayer,
    AppRate,
    SocialSharing,
    AppVersion,
    AdMobFree,
    AdsProvider,
    RateProvider,
    AlertProvider,
    Network
  ]
})
export class AppModule {}
