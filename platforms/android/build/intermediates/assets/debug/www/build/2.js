webpackJsonp([2,3],{

/***/ 307:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlatformDetailsPageModule", function() { return PlatformDetailsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__platform_details__ = __webpack_require__(314);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PlatformDetailsPageModule = (function () {
    function PlatformDetailsPageModule() {
    }
    PlatformDetailsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__platform_details__["a" /* PlatformDetailsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__platform_details__["a" /* PlatformDetailsPage */]),
            ],
        })
    ], PlatformDetailsPageModule);
    return PlatformDetailsPageModule;
}());

//# sourceMappingURL=platform-details.module.js.map

/***/ }),

/***/ 310:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlatformsPageModule", function() { return PlatformsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__platform_details_platform_details_module__ = __webpack_require__(307);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__platforms__ = __webpack_require__(113);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var PlatformsPageModule = (function () {
    function PlatformsPageModule() {
    }
    PlatformsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__platforms__["a" /* PlatformsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__platforms__["a" /* PlatformsPage */]),
                __WEBPACK_IMPORTED_MODULE_2__platform_details_platform_details_module__["PlatformDetailsPageModule"]
            ],
        })
    ], PlatformsPageModule);
    return PlatformsPageModule;
}());

//# sourceMappingURL=platforms.module.js.map

/***/ }),

/***/ 314:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlatformDetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_in_app_browser__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_ads_ads__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_alert_alert__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PLATFORM = "platform";
var PlatformDetailsPage = (function () {
    function PlatformDetailsPage(navCtrl, navParams, iab, adsProvider, alertProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.iab = iab;
        this.adsProvider = adsProvider;
        this.alertProvider = alertProvider;
        this.platform = navParams.get(PLATFORM);
    }
    PlatformDetailsPage.prototype.launchSite = function (url) {
        var _this = this;
        if (url) {
            this.adsProvider.presentInterstitialAd().then(function () {
                _this.iab.create(url);
            })
                .catch(function (e) {
                _this.alertProvider.showAlert("Launch issue", "Error while launching site");
            });
        }
    };
    PlatformDetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-platform-details',template:/*ion-inline-start:"/home/kerick/Documents/ionic/ultimum-games/src/pages/platform-details/platform-details.html"*/'<ion-header color="primary">\n  <ion-navbar>\n    <div *ngIf="platform">\n      <ion-title color="primary">{{ platform.name }}</ion-title>\n    </div>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content>\n  <div *ngIf="platform">\n    <ion-card padding >\n      <h4>Platform Summary</h4>\n      <div *ngIf="platform.summary; else nosummary">\n        <p>{{ platform.summary }}</p>\n      </div>\n      <ng-template #nosummary>\n        <p>NULL</p>\n      </ng-template>\n    </ion-card>\n\n    <div class="info">\n      <ion-grid padding>\n        <ion-row>\n          <ion-col col-6>\n            <h4>Website</h4>\n            <div *ngIf="platform.website; else nowebsite">\n              <button ion-button (click)="launchSite(platform.website)" small>Visit</button>\n            </div>\n            <ng-template #nowebsite>\n              <p>NONE</p>\n            </ng-template>\n          </ion-col>\n          <ion-col col-6>\n            <h4>Generation</h4>\n            <div *ngIf="platform.generation; else nogeneration">\n              <p>{{ platform.generation }}</p>\n            </div>\n            <ng-template #nogeneration>\n              <p>N/A</p>\n            </ng-template>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </div>\n  </div>\n</ion-content>'/*ion-inline-end:"/home/kerick/Documents/ionic/ultimum-games/src/pages/platform-details/platform-details.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_in_app_browser__["a" /* InAppBrowser */],
            __WEBPACK_IMPORTED_MODULE_3__providers_ads_ads__["a" /* AdsProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_alert_alert__["a" /* AlertProvider */]])
    ], PlatformDetailsPage);
    return PlatformDetailsPage;
}());

//# sourceMappingURL=platform-details.js.map

/***/ })

});
//# sourceMappingURL=2.js.map