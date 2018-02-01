import { Injectable } from '@angular/core';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';

const BANNER_AD = "ca-app-pub-3940256099942544/6300978111";
const INTERSTITIAL_AD = "ca-app-pub-3940256099942544/1033173712";

@Injectable()
export class AdsProvider {

  constructor(
    private admobFree: AdMobFree
  ) { }

  public presentBannerAd() {
    const bannerConfig: AdMobFreeBannerConfig = {
      id: BANNER_AD,
      isTesting: true,
      autoShow: true
    };

    this.admobFree.banner.config(bannerConfig);
    
    return this.admobFree.banner.prepare()
  }

  public presentInterstitialAd() {
    const interstitialConfig: AdMobFreeInterstitialConfig = {
      id: INTERSTITIAL_AD,
      isTesting: true,
      autoShow: true
    }

    this.admobFree.interstitial.config(interstitialConfig)

    return this.admobFree.interstitial.prepare()
  }
}
