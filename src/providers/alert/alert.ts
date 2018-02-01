import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';


@Injectable()
export class AlertProvider {

  constructor(private alertCtrl: AlertController) {
    
  }

  public showAlert(title: string, message: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    
    alert.present();
  }
}
