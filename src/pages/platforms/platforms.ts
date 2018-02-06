import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';

import { DataProvider } from '../../providers/data/data';
import { AlertProvider } from '../../providers/alert/alert';

@IonicPage() 
@Component({
  selector: 'page-platforms',
  templateUrl: 'platforms.html',
})
export class PlatformsPage {
  platforms: Array<any>
  currentPlatform: number
  offset: number = 0
  total: number
  numPages: number
  currentPage: number = 1
  more: boolean = true

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    private _data: DataProvider,
    private alertProvider: AlertProvider
  ) {
    this._data.getPlatformsCount().subscribe(res => {
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
    let loader = this.loadingCtrl.create({
      content: 'Getting Platforms...'
    })

    loader.present().then(() => {
      this._data.getPlatforms(this.offset)
      .subscribe(res => {
        this.platforms = res
      }, err => {
        this.alertProvider.showAlert("No Internet", "Please make sure you are connected to the internet")
      })

      setTimeout(() => {
        loader.dismiss()
      }, 3000)
    })
  }

  platformSelected(platform) {
    this.navCtrl.push('PlatformDetailsPage', {
      platform: platform
    })
  }

  loadMore() {
    let loader = this.loadingCtrl.create({
      content: 'Getting Platforms...'
    })

    loader.present().then(() => {
      this.currentPage += 1
      this.offset = this.currentPage - 1
      this._data.getPlatforms(this.offset)
        .subscribe(res => {
          this.platforms = res

          if(this.currentPage >= this.numPages) {
            this.more = false
          }
        }, err => {
          this.alertProvider.showAlert("No Internet", "Please make sure you are connected to the internet")
        })

      setTimeout(() => {
        loader.dismiss()
      }, 3000)
    })
  }
}
