import { Injectable } from '@angular/core';
import { AppRate } from '@ionic-native/app-rate';


@Injectable()
export class RateProvider {

  constructor(
    private appRate: AppRate
  ) {
    this.appRate.preferences = {
      displayAppName: "Ultimum Games",
      usesUntilPrompt: 3,
      storeAppURL: {
        android: 'market://details?id=com.ultimum.games'
      },
      customLocale: {
        title: 'Rate %@',
        message: 'Do you mind rating %@?',
        cancelButtonLabel: 'No',
        laterButtonLabel: 'Later',
        rateButtonLabel: 'Ok'
      },
      callbacks: {
        onButtonClicked: (index) => {
          switch (index) {
            case 0: // No
              break;
            case 1: // Ok
              this.appRate.navigateToAppStore()
              break;
            default: // Later

              break;
          }
        }
      }
    }
  }

  public initiate() {
    this.appRate.promptForRating(false)
  }

  public rate() {
    this.appRate.promptForRating(true)
  }
}
