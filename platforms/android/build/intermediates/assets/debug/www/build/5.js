webpackJsonp([5],{

/***/ 305:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DetailsPageModule", function() { return DetailsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__details__ = __webpack_require__(312);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var DetailsPageModule = (function () {
    function DetailsPageModule() {
    }
    DetailsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__details__["a" /* DetailsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__details__["a" /* DetailsPage */]),
            ],
        })
    ], DetailsPageModule);
    return DetailsPageModule;
}());

//# sourceMappingURL=details.module.js.map

/***/ }),

/***/ 312:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_in_app_browser__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_youtube_video_player__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_data_data__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_ads_ads__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_alert_alert__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var DetailsPage = (function () {
    function DetailsPage(navCtrl, navParams, _data, iab, youtube, adsProvider, alertProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this._data = _data;
        this.iab = iab;
        this.youtube = youtube;
        this.adsProvider = adsProvider;
        this.alertProvider = alertProvider;
        this.gameId = this.navParams.get("game");
    }
    DetailsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this._data.getGame(this.gameId)
            .subscribe(function (res) {
            if (res[0].player_perspectives != undefined) {
                _this._data.getPerspective(res[0].player_perspectives[0])
                    .subscribe(function (res) {
                    _this.perspective = res[0];
                }, function (err) {
                    _this.alertProvider.showAlert("No Internet", "Please make sure you are connected to the internet");
                });
            }
            else {
                _this.perspective = undefined;
            }
            _this.game = res[0];
        }, function (err) {
            _this.alertProvider.showAlert("No Internet", "Please make sure you are connected to the internet");
        });
    };
    DetailsPage.prototype.launchSite = function (url) {
        var _this = this;
        if (url) {
            this.adsProvider.presentInterstitialAd().then(function () {
                _this.iab.create(url);
            })
                .catch(function (e) {
                _this.alertProvider.showAlert("Launch Issue", "Error while trying to launching site");
            });
        }
    };
    DetailsPage.prototype.playVideo = function (video) {
        var _this = this;
        this.adsProvider.presentInterstitialAd().then(function () {
            _this.youtube.openVideo(video);
        })
            .catch(function (e) {
            _this.alertProvider.showAlert("Launch Issue", "Error while trying to play video");
        });
    };
    DetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-details',template:/*ion-inline-start:"/home/kerick/Documents/ionic/ultimum-games/src/pages/details/details.html"*/'\n<ion-header color="primary">\n  <ion-navbar>\n    <div *ngIf="game">\n      <ion-title color="primary">{{ game.name }}</ion-title>\n    </div>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n  <div *ngIf="game">\n    <div class="game-image" *ngIf="game.screenshots; else noscreen">\n      <img src="https://images.igdb.com/igdb/image/upload/t_screenshot_med_2x/{{ game.screenshots[0].cloudinary_id }}.jpg" class="tinted" />\n    </div>\n\n    <ng-template #noscreen>\n      <img src="assets/imgs/blank.png" class="tinted" />\n    </ng-template>\n\n    <div id="popover" [@fadeIn]>\n      <ion-grid>\n        <ion-row>\n          <ion-col col-6>\n            <h4>Rating</h4>\n            <p class="larger-res">\n              {{ game.popularity | number: \'1.1-1\' }}\n            </p>\n          </ion-col>\n          <ion-col col-6>\n            <h4>Perspective</h4>\n            <p *ngIf="perspective" >\n              {{ perspective.name }}\n            </p>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col col-6>\n            <h4>Website</h4>\n            <div *ngIf="game.websites; else nowebsite">\n              <button ion-button (click)="launchSite(game.websites[0].url)" small>Visit</button>\n            </div>\n            <ng-template #nowebsite>\n              <p>NONE</p>\n            </ng-template>\n          </ion-col>\n          <ion-col col-6>\n            <h4>Release date</h4>\n            <p>\n              {{ game.first_release_date | date: shortDate }}\n            </p>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </div>\n\n    <ion-card *ngIf="game.summary" padding [@fadeUp]>\n      <h4>Game Summary</h4>\n      <p>{{ game.summary }}</p>\n    </ion-card>\n\n    <div *ngIf="game.screenshots" id="screenslider">\n      <h5>Screenshots</h5>\n      <ion-scroll scrollX="true" class="item">\n        <ion-row [style.width]="game.screenshots.length+\'00%\'" >\n          <ion-col *ngFor="let screenshot of game.screenshots">\n            <img src="https://images.igdb.com/igdb/image/upload/t_screenshot_med_2x/{{ screenshot.cloudinary_id }}.jpg" >\n          </ion-col>\n        </ion-row>\n      </ion-scroll>\n    </div>\n\n    <div *ngIf="game.videos">\n      <h5>Videos &amp; Trailers</h5>\n      <ion-list>\n        <button ion-item *ngFor="let video of game.videos" (click)="playVideo(video.video_id)">\n          <ion-icon name="play" small item-start color="primary" style="margin-right: -5px"></ion-icon> {{ video.name }}\n        </button>\n      </ion-list>\n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/home/kerick/Documents/ionic/ultimum-games/src/pages/details/details.html"*/,
            animations: [
                Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["j" /* trigger */])('fadeIn', [
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* transition */])('void => *', [
                        Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["e" /* animate */])('600ms ease-in', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["f" /* keyframes */])([
                            Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["h" /* style */])({ opacity: 0, transform: 'translateY(-70px)', offset: 0 }),
                            Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["h" /* style */])({ opacity: 1, transform: 'translateY(25px)', offset: .75 }),
                            Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["h" /* style */])({ opacity: 1, transform: 'translateY(0px)', offset: 1 })
                        ]))
                    ])
                ]),
                Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["j" /* trigger */])('fadeUp', [
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* transition */])('void => *', [
                        Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["e" /* animate */])('900ms ease-in', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["f" /* keyframes */])([
                            Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["h" /* style */])({ opacity: 0, transform: 'translateY(70px)', offset: 0 }),
                            Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["h" /* style */])({ opacity: 1, transform: 'translateY(0)', offset: 1 })
                        ]))
                    ])
                ])
            ]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_5__providers_data_data__["a" /* DataProvider */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_in_app_browser__["a" /* InAppBrowser */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_youtube_video_player__["a" /* YoutubeVideoPlayer */],
            __WEBPACK_IMPORTED_MODULE_6__providers_ads_ads__["a" /* AdsProvider */],
            __WEBPACK_IMPORTED_MODULE_7__providers_alert_alert__["a" /* AlertProvider */]])
    ], DetailsPage);
    return DetailsPage;
}());

//# sourceMappingURL=details.js.map

/***/ })

});
//# sourceMappingURL=5.js.map