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
import { CacheModule } from 'ionic-cache';

import { MyApp } from './app.component';
import { AlertProvider } from '../providers/alert/alert';
import { RateProvider } from '../providers/rate/rate';
import { DataProvider } from '../providers/data/data';
import { AdsProvider } from '../providers/ads/ads';
import { HomePageModule } from '../pages/home/home.module';
import { PlatformsPageModule } from '../pages/platforms/platforms.module';
import { MiscPageModule } from '../pages/misc/misc.module';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    CacheModule.forRoot(),
    HomePageModule,
    PlatformsPageModule,
    MiscPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
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
    Network,
  ]
})
export class AppModule {}
