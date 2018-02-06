webpackJsonp([7],{

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_keyboard__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_data_data__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_ads_ads__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_alert_alert__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ionic_cache__ = __webpack_require__(51);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var FAVORITES = 'favorites';
var GENRE = 'genre';
var FILTER = 'filter';
var TITLE = 'title';
var HomePage = (function () {
    function HomePage(navCtrl, navParams, storage, _data, loadingCtrl, modalCtrl, keyboard, adsProvider, alertProvider, cache) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this._data = _data;
        this.loadingCtrl = loadingCtrl;
        this.modalCtrl = modalCtrl;
        this.keyboard = keyboard;
        this.adsProvider = adsProvider;
        this.alertProvider = alertProvider;
        this.cache = cache;
        this.title = "Ultimum";
        this.offset = 1;
        this.games = [];
        this.favorites = [];
        this.showSearch = false;
        this.showLoadMore = false;
        this.refresh = true;
    }
    HomePage.prototype.ionViewWillUnload = function () {
        this.adsProvider.presentInterstitialAd();
    };
    HomePage.prototype.ionViewWillEnter = function () {
        var _this = this;
        if (this.refresh) {
            this.offset = 0;
            this.storage.get(TITLE).then(function (val) {
                if (val) {
                    _this.title = val;
                }
                else {
                    _this.title = "Ultimum";
                    _this.storage.set(TITLE, _this.title);
                }
            });
            var loader_1 = this.loadingCtrl.create({
                content: 'Getting Games...'
            });
            loader_1.present().then(function () {
                // This will determine the title on the homepage load
                _this.storage.get(FILTER).then(function (val) {
                    if (val) {
                        switch (val) {
                            case 'Genre':
                                _this.getGamesForGenre();
                                break;
                            case 'Coming Soon':
                                _this.getComingSoonGames();
                                break;
                            default:
                                _this.getGames();
                                break;
                        }
                    }
                    else {
                        _this.storage.set(FILTER, 'None').then(function () {
                            _this.getGames();
                        });
                    }
                });
                _this.storage.get(FAVORITES).then(function (val) {
                    if (!val) {
                        _this.storage.set(FAVORITES, _this.favorites);
                    }
                    else {
                        _this.favorites = val;
                    }
                });
                setTimeout(function () {
                    loader_1.dismiss();
                }, 5000);
            });
            this.refresh = false;
        }
    };
    HomePage.prototype.getGames = function () {
        var _this = this;
        this._data.getGames(this.offset)
            .subscribe(function (res) {
            _this.games = res;
        }, function (err) {
            _this.alertProvider.showAlert("No Internet", "Please make sure you are connected to the internet");
        });
    };
    HomePage.prototype.getComingSoonGames = function () {
        var _this = this;
        this._data.getComingSoonGames(this.offset)
            .subscribe(function (res) {
            _this.games = res;
        }, function (err) {
            _this.alertProvider.showAlert("No Internet", "Please make sure you are connected to the internet");
        });
    };
    HomePage.prototype.getGamesForGenre = function () {
        var _this = this;
        this.storage.get(GENRE).then(function (val) {
            if (val) {
                var genre = val;
                _this._data.getGamesForGenre(genre, _this.offset)
                    .subscribe(function (res) {
                    _this.games = res;
                }, function (err) {
                    _this.alertProvider.showAlert("No Internet", "Please make sure you are connected to the internet");
                });
            }
        });
    };
    HomePage.prototype.doRefresh = function (refresher) {
        var _this = this;
        setTimeout(function () {
            _this.offset += 1;
            switch (_this.title) {
                case "Ultimum":
                    _this.getGames();
                    break;
                case "Coming Soon":
                    _this.getComingSoonGames();
                    break;
                case "Favorites":
                    // Do nothing because all favorites in favorites array will be displayed at same time
                    break;
                default:
                    _this.storage.get(GENRE).then(function (val) {
                        if (val) {
                            _this._data.getGenre(val)
                                .subscribe(function (res) {
                                var _genre = res;
                                if (_genre[0].name == _this.title) {
                                    _this.getGamesForGenre();
                                }
                                else {
                                    _this.search(_this.title, _this.offset);
                                }
                            }, function (err) {
                                _this.alertProvider.showAlert("No Internet", "Please make sure you are connected to the internet");
                            });
                        }
                        else {
                            _this.search(_this.title, _this.offset);
                        }
                    });
                    break;
            }
            refresher.complete();
        }, 2000);
    };
    HomePage.prototype.openFavorites = function () {
        var _this = this;
        this.storage.get(FAVORITES).then(function (val) {
            _this.title = 'Favorites';
            if (val.length != 0) {
                var loader_2 = _this.loadingCtrl.create({
                    content: 'Getting Favorites...'
                });
                loader_2.present().then(function () {
                    _this._data.getFavorites(val)
                        .subscribe(function (res) {
                        _this.games = res;
                    }, function (err) {
                        _this.alertProvider.showAlert("No Internet", "Please make sure you are connected to the internet");
                    });
                    setTimeout(function () {
                        loader_2.dismiss();
                    }, 3000);
                });
            }
            else {
                _this.games.length = 0;
                _this.alertProvider.showAlert("No Favorites", "You haven't selected any games as your favorite yet!");
            }
        });
    };
    HomePage.prototype.showSearchBox = function () {
        this.showSearch = !this.showSearch;
        this.content.scrollToTop();
    };
    HomePage.prototype.favorite = function (game) {
        var _this = this;
        this.favorites.push(game);
        // Remove duplicate game Ids in the favorites array
        this.favorites = this.favorites.filter(function (item, i, ar) {
            return ar.indexOf(item) === i;
        });
        this.storage.set(FAVORITES, this.favorites).then(function () {
            // Invalidate favorites group cached data so that api can request new data
            _this.cache.clearGroup("favorites");
        });
    };
    HomePage.prototype.removeFavorite = function (game) {
        var _this = this;
        this.favorites = this.favorites.filter(function (item) {
            return item !== game;
        });
        this.storage.set(FAVORITES, this.favorites).then(function () {
            // Invalidate favorites group cached data so that api can request new data
            _this.cache.clearGroup("favorites");
        });
    };
    HomePage.prototype.searchGames = function (e) {
        var term = e.target.value;
        if (term != '') {
            this.keyboard.close();
            this.title = term;
            this.showSearch = false;
            this.offset = 0;
            this.search(term, this.offset);
        }
        else {
            this.showSearch = false;
        }
    };
    HomePage.prototype.search = function (term, offset) {
        var _this = this;
        this._data.searchGames(this.title, offset)
            .subscribe(function (res) {
            _this.games = res;
        }, function (err) {
            _this.alertProvider.showAlert("No Internet", "Please make sure you are connected to the internet");
        });
    };
    HomePage.prototype.filterPage = function () {
        var _this = this;
        this.storage.get(FILTER).then(function (val) {
            if (!val) {
                _this.storage.set(FILTER, 'None');
                _this.filter = 'None';
            }
            else {
                _this.filter = val;
            }
            var navCallback = function (_params) {
                return new Promise(function (resolve, reject) {
                    _this.refresh = _params;
                    resolve();
                });
            };
            _this.navCtrl.push('FilterPage', {
                filter: _this.filter,
                callback: navCallback
            });
        });
    };
    HomePage.prototype.detailsPage = function (game) {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: 'Getting Details...'
        });
        loader.present().then(function () {
            _this.navCtrl.push('DetailsPage', {
                game: game
            });
            setTimeout(function () {
                loader.dismiss();
            }, 3000);
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* Content */])
    ], HomePage.prototype, "content", void 0);
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/home/kerick/Documents/ionic/ultimum-games/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>\n      <img src="assets/imgs/icon.png" id="logo"> <span id="title">{{ title }}</span>\n    </ion-title>\n    <ion-buttons end>\n      <button ion-button icon-start (click)="openFavorites()" class="btn-txt">\n        <ion-icon name=\'star\'></ion-icon>\n        Favs\n      </button>\n      <button ion-button icon-start (click)="filterPage()" class="btn-txt">\n        <ion-icon name=\'funnel\'></ion-icon>\n        Filter\n      </button>\n      <button ion-button icon-only (click)="showSearchBox()">\n        <ion-icon name=\'search\'></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n\n  <ion-searchbar *ngIf="showSearch" (keyup.enter)="searchGames($event)" placeholder="Search for games..."></ion-searchbar>\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content\n      pullingIcon="arrow-dropdown"\n      pullingText="Pull to refresh"\n      refreshingSpinner="circles"\n      refreshingText="Loading Games...">\n    </ion-refresher-content>\n  </ion-refresher>\n\n  <div *ngIf="games" class="card-background-page">\n    <ion-card *ngFor="let game of games" [@fadeOut]>\n      <div *ngIf="game.screenshots; then gamescreen else noscreen"></div>\n      \n      <ng-template #gamescreen>\n        <div class="game-image">\n          <img src="https://images.igdb.com/igdb/image/upload/t_screenshot_med_2x/{{ game.screenshots[0].cloudinary_id }}.jpg" class="tinted" />\n        </div>\n      </ng-template>\n\n      <ng-template #noscreen>\n        <div class="game-image">\n          <img src="assets/imgs/blank.png" class="tinted" />\n        </div>\n      </ng-template>\n\n      <div *ngIf="favorites.indexOf(game.id) == -1; then fav else remove"></div>\n\n      <ng-template #fav>\n        <button ion-button outline medium color="primary" icon-only (click)="favorite(game.id)">\n          <ion-icon name="star"></ion-icon>\n        </button>\n      </ng-template>\n\n      <ng-template #remove>\n        <button ion-button medium color="primary" icon-only (click)="removeFavorite(game.id)">\n          <ion-icon name="close"></ion-icon>\n        </button>\n      </ng-template>\n\n      <div class="card-title" (click)="detailsPage(game.id)"><strong style="cursor: pointer">{{ game.name }}</strong></div>\n      <div class="card-subtitle" *ngIf="game.first_release_date">{{ game.first_release_date | date: shortDate }}</div>\n\n    </ion-card>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/home/kerick/Documents/ionic/ultimum-games/src/pages/home/home.html"*/,
            animations: [
                Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["j" /* trigger */])('fadeOut', [
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* transition */])(':leave', [
                        Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["e" /* animate */])('600ms ease-in', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["f" /* keyframes */])([
                            Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["h" /* style */])({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
                            Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["h" /* style */])({ opacity: 0, transform: 'translateX(-50px)', offset: 1 })
                        ]))
                    ]),
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* transition */])(':enter', [
                        Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["e" /* animate */])('600ms ease-in', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["f" /* keyframes */])([
                            Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["h" /* style */])({ opacity: 0, transform: 'translateX(-50px)', offset: 0 }),
                            Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["h" /* style */])({ opacity: 1, transform: 'translateX(0)', offset: 1 })
                        ]))
                    ])
                ])
            ]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_5__providers_data_data__["a" /* DataProvider */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_keyboard__["a" /* Keyboard */],
            __WEBPACK_IMPORTED_MODULE_6__providers_ads_ads__["a" /* AdsProvider */],
            __WEBPACK_IMPORTED_MODULE_7__providers_alert_alert__["a" /* AlertProvider */],
            __WEBPACK_IMPORTED_MODULE_8_ionic_cache__["b" /* CacheService */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MiscPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_social_sharing__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_app_version__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_rate_rate__ = __webpack_require__(89);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MiscPage = (function () {
    function MiscPage(navCtrl, navParams, platform, socialSharing, appVersion, rateProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.socialSharing = socialSharing;
        this.appVersion = appVersion;
        this.rateProvider = rateProvider;
        this.platform.ready().then(function () {
            _this.setAppDetails();
        });
    }
    MiscPage.prototype.share = function () {
        this.socialSharing.shareWithOptions({
            message: "Hello Pal! This is the fun, 'The Ultimate Game Place'. Download this app from Google Playstore and catch the feel like others...",
            subject: 'Ultimum Games',
            url: "market://details?id=com.ultimum.games",
            chooserTitle: "Share With Friends"
        });
    };
    MiscPage.prototype.rate = function () {
        this.rateProvider.rate();
    };
    MiscPage.prototype.setAppDetails = function () {
        var _this = this;
        this.appVersion.getAppName().then(function (val) {
            if (val) {
                _this.name = val;
            }
        });
        this.appVersion.getVersionNumber().then(function (val) {
            if (val) {
                _this.version = val;
            }
        });
    };
    MiscPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-misc',template:/*ion-inline-start:"/home/kerick/Documents/ionic/ultimum-games/src/pages/misc/misc.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Ultimum Games</ion-title>\n  </ion-navbar>\n</ion-header>\n \n<ion-content padding>\n  <div id="about">\n    <h4>{{ name }}</h4>\n    <p>The Ultimate Game place</p>\n    <small>Version {{ version }}</small>\n  </div>\n\n  <ion-fab right bottom>\n    <button ion-fab color="secondary"><ion-icon name="arrow-dropleft-circle"></ion-icon></button>\n    <ion-fab-list side="left">\n      <button (click)="share()" ion-fab color="info" title="Share With Friends"><ion-icon name="share"></ion-icon></button>\n      <button (click)="rate()" ion-fab title="Rate Us"><ion-icon name="star"color="warning" ></ion-icon></button>\n    </ion-fab-list>\n  </ion-fab>  \n</ion-content>\n'/*ion-inline-end:"/home/kerick/Documents/ionic/ultimum-games/src/pages/misc/misc.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_social_sharing__["a" /* SocialSharing */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_app_version__["a" /* AppVersion */],
            __WEBPACK_IMPORTED_MODULE_4__providers_rate_rate__["a" /* RateProvider */]])
    ], MiscPage);
    return MiscPage;
}());

//# sourceMappingURL=misc.js.map

/***/ }),

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlatformsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_data_data__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_alert_alert__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PlatformsPage = (function () {
    function PlatformsPage(navCtrl, navParams, viewCtrl, loadingCtrl, _data, alertProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.loadingCtrl = loadingCtrl;
        this._data = _data;
        this.alertProvider = alertProvider;
        this.offset = 0;
        this.currentPage = 1;
        this.more = true;
        this._data.getPlatformsCount().subscribe(function (res) {
            _this.total = res.count;
            _this.numPages = Math.ceil(_this.total / 50); // 50 is the limit used in this._data.getPlatform()
            if (_this.currentPage >= _this.numPages) {
                _this.more = false;
            }
        }, function (err) {
            _this.alertProvider.showAlert("No Internet", "Please make sure you are connected to the internet");
        });
    }
    PlatformsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: 'Getting Platforms...'
        });
        loader.present().then(function () {
            _this._data.getPlatforms(_this.offset)
                .subscribe(function (res) {
                _this.platforms = res;
            }, function (err) {
                _this.alertProvider.showAlert("No Internet", "Please make sure you are connected to the internet");
            });
            setTimeout(function () {
                loader.dismiss();
            }, 3000);
        });
    };
    PlatformsPage.prototype.platformSelected = function (platform) {
        this.navCtrl.push('PlatformDetailsPage', {
            platform: platform
        });
    };
    PlatformsPage.prototype.loadMore = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: 'Getting Platforms...'
        });
        loader.present().then(function () {
            _this.currentPage += 1;
            _this.offset = _this.currentPage - 1;
            _this._data.getPlatforms(_this.offset)
                .subscribe(function (res) {
                _this.platforms = res;
                if (_this.currentPage >= _this.numPages) {
                    _this.more = false;
                }
            }, function (err) {
                _this.alertProvider.showAlert("No Internet", "Please make sure you are connected to the internet");
            });
            setTimeout(function () {
                loader.dismiss();
            }, 3000);
        });
    };
    PlatformsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-platforms',template:/*ion-inline-start:"/home/kerick/Documents/ionic/ultimum-games/src/pages/platforms/platforms.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Game Platforms</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <ion-item *ngFor="let platform of platforms">\n      <h2>{{ platform.name }}</h2>\n      <p>{{ platform.summary }}</p>\n      <p>\n        <button ion-button outline item-end (click)="platformSelected(platform)">View</button>\n      </p>\n    </ion-item>\n    <ion-item *ngIf="more">\n      <button (click)="loadMore()" ion-button id="load-more">Next</button>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/home/kerick/Documents/ionic/ultimum-games/src/pages/platforms/platforms.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_data_data__["a" /* DataProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_alert_alert__["a" /* AlertProvider */]])
    ], PlatformsPage);
    return PlatformsPage;
}());

//# sourceMappingURL=platforms.js.map

/***/ }),

/***/ 125:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 125;

/***/ }),

/***/ 167:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/details/details.module": [
		305,
		5
	],
	"../pages/filter/filter.module": [
		306,
		1
	],
	"../pages/genres/genres.module": [
		304,
		4
	],
	"../pages/home/home.module": [
		308,
		0
	],
	"../pages/misc/misc.module": [
		309,
		6
	],
	"../pages/platform-details/platform-details.module": [
		307,
		3
	],
	"../pages/platforms/platforms.module": [
		310,
		2
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 167;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 222:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(244);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 244:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_keyboard__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_in_app_browser__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_youtube_video_player__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_platform_browser_animations__ = __webpack_require__(301);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_app_rate__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_social_sharing__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_app_version__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_admob_free__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_network__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_ionic_cache__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__app_component__ = __webpack_require__(303);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_home_home__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_platforms_platforms__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_misc_misc__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__providers_alert_alert__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__providers_rate_rate__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__providers_data_data__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__providers_ads_ads__ = __webpack_require__(57);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

























var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_17__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_18__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_platforms_platforms__["a" /* PlatformsPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_misc_misc__["a" /* MiscPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_17__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/details/details.module#DetailsPageModule', name: 'DetailsPage', segment: 'details', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/filter/filter.module#FilterPageModule', name: 'FilterPage', segment: 'filter', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/genres/genres.module#GenresPageModule', name: 'GenresPage', segment: 'genres', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/home/home.module#HomePageModule', name: 'HomePage', segment: 'home', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/misc/misc.module#MiscPageModule', name: 'MiscPage', segment: 'misc', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/platform-details/platform-details.module#PlatformDetailsPageModule', name: 'PlatformDetailsPage', segment: 'platform-details', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/platforms/platforms.module#PlatformsPageModule', name: 'PlatformsPage', segment: 'platforms', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_16_ionic_cache__["a" /* CacheModule */].forRoot()
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_17__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_18__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_platforms_platforms__["a" /* PlatformsPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_misc_misc__["a" /* MiscPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_2__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_23__providers_data_data__["a" /* DataProvider */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_keyboard__["a" /* Keyboard */],
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_in_app_browser__["a" /* InAppBrowser */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_youtube_video_player__["a" /* YoutubeVideoPlayer */],
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_app_rate__["a" /* AppRate */],
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_social_sharing__["a" /* SocialSharing */],
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_app_version__["a" /* AppVersion */],
                __WEBPACK_IMPORTED_MODULE_14__ionic_native_admob_free__["a" /* AdMobFree */],
                __WEBPACK_IMPORTED_MODULE_24__providers_ads_ads__["a" /* AdsProvider */],
                __WEBPACK_IMPORTED_MODULE_22__providers_rate_rate__["a" /* RateProvider */],
                __WEBPACK_IMPORTED_MODULE_21__providers_alert_alert__["a" /* AlertProvider */],
                __WEBPACK_IMPORTED_MODULE_15__ionic_native_network__["a" /* Network */],
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 303:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_platforms_platforms__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_misc_misc__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_rate_rate__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_ads_ads__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_network__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_alert_alert__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ionic_cache__ = __webpack_require__(51);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, rateProvider, adsProvider, network, alertProvider, cache) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        this.platformsPage = __WEBPACK_IMPORTED_MODULE_5__pages_platforms_platforms__["a" /* PlatformsPage */];
        this.miscPage = __WEBPACK_IMPORTED_MODULE_6__pages_misc_misc__["a" /* MiscPage */];
        platform.ready().then(function () {
            statusBar.styleDefault();
            splashScreen.hide();
            // Set TTL to 30d
            cache.setDefaultTTL(60 * 60 * 24 * 30);
            // Keep our cached results when device is offline!
            cache.setOfflineInvalidate(false);
            adsProvider.presentBannerAd().then(function () { })
                .catch(function (e) { return console.log(e); });
            rateProvider.initiate();
            network.onDisconnect().subscribe(function () {
                alertProvider.showAlert("Offline", "Please, try to make sure you are connected to the internet");
            });
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/kerick/Documents/ionic/ultimum-games/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n\n<ion-tabs>\n    <ion-tab tabIcon="game-controller-b" [root]="rootPage"></ion-tab>\n    <ion-tab tabIcon="cube" [root]="platformsPage"></ion-tab>\n    <ion-tab tabIcon="bulb" [root]="miscPage"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"/home/kerick/Documents/ionic/ultimum-games/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_7__providers_rate_rate__["a" /* RateProvider */],
            __WEBPACK_IMPORTED_MODULE_8__providers_ads_ads__["a" /* AdsProvider */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_network__["a" /* Network */],
            __WEBPACK_IMPORTED_MODULE_10__providers_alert_alert__["a" /* AlertProvider */],
            __WEBPACK_IMPORTED_MODULE_11_ionic_cache__["b" /* CacheService */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 41:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlertProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular_components_alert_alert_controller__ = __webpack_require__(70);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AlertProvider = (function () {
    function AlertProvider(alertCtrl) {
        this.alertCtrl = alertCtrl;
    }
    AlertProvider.prototype.showAlert = function (title, message) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    };
    AlertProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular_components_alert_alert_controller__["a" /* AlertController */]])
    ], AlertProvider);
    return AlertProvider;
}());

//# sourceMappingURL=alert.js.map

/***/ }),

/***/ 56:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_cache__ = __webpack_require__(51);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var API = "https://api-2445582011268.apicast.io";
//const API = "/api";
var DataProvider = (function () {
    function DataProvider(http, cache) {
        this.http = http;
        this.cache = cache;
        this.limit = 25;
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        this.headers.append("user-key", "7147c3ffabe96df119a5b6d57087720f");
        this.headers.append("Accept", "application/json");
        this.options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({ headers: this.headers });
    }
    DataProvider.prototype.getGames = function (offset) {
        this.offset = (offset * this.limit);
        var url = API + '/games/?fields=name,genres,release_dates,first_release_date,screenshots&limit=' + this.limit + '&offset=' + this.offset + '&order=release_dates.date:desc&filter[screenshots][exists]&filter[first_release_date][lte]=' + Date.now();
        var request = this.http.get(url, this.options);
        if (offset == 0) {
            var cacheKey = url.slice(0, url.indexOf("[first_release_date][lte]=")) + "[first_release_date][lte]=";
            return this.cache.loadFromObservable(cacheKey, request, "games")
                .map(function (response) { return response.json(); });
        }
        else {
            return request.map(function (response) { return response.json(); });
        }
    };
    DataProvider.prototype.getComingSoonGames = function (offset) {
        this.offset = (offset * this.limit);
        var url = API + '/games/?fields=name,genres,release_dates,first_release_date,screenshots&limit=' + this.limit + '&offset=' + this.offset + '&order=release_dates.date:desc&filter[screenshots][exists]&filter[first_release_date][gte]=' + Date.now();
        var request = this.http.get(url, this.options);
        if (offset == 0) {
            var cacheKey = url.slice(0, url.indexOf("[first_release_date][gte]=")) + "[first_release_date][gte]=";
            return this.cache.loadFromObservable(cacheKey, request, "coming_soon_games")
                .map(function (response) { return response.json(); });
        }
        else {
            return request.map(function (response) { return response.json(); });
        }
    };
    DataProvider.prototype.getGamesForGenre = function (genre, offset) {
        this.offset = (offset * this.limit);
        var url = API + '/games/?fields=name,genres,release_dates,first_release_date,screenshots&limit=' + this.limit + '&offset=' + this.offset + '&order=release_dates.date:desc&filter[screenshots][exists]&filter[genres][eq]=' + genre + '&filter[first_release_date][lte]=' + Date.now();
        var request = this.http.get(url, this.options);
        if (offset == 0) {
            var cacheKey = url.slice(0, url.indexOf("[first_release_date][lte]=")) + "[first_release_date][lte]=";
            return this.cache.loadFromObservable(cacheKey, request, 'genre_games')
                .map(function (response) { return response.json(); });
        }
        else {
            return request.map(function (response) { return response.json(); });
        }
    };
    DataProvider.prototype.getFavorites = function (favs) {
        var favorites = favs.join();
        var url = API + '/games/' + favorites + '?fields=name,genres,release_dates,first_release_date,screenshots&order=release_dates.date:desc&filter[screenshots][exists]';
        var cacheKey = url;
        var ttl = 60 * 60 * 24 * 365; // 365d
        var request = this.http.get(url, this.options);
        return this.cache.loadFromObservable(cacheKey, request, "favorites", ttl)
            .map(function (res) { return res.json(); });
    };
    DataProvider.prototype.getPlatforms = function (offset) {
        this.offset = (offset * 50);
        var url = API + '/platforms/?fields=name,logo,summary,website,generation,games&limit=50&offset=' + this.offset;
        var request = this.http.get(url, this.options);
        if (offset == 0) {
            var cacheKey = url;
            return this.cache.loadFromObservable(cacheKey, request)
                .map(function (response) { return response.json(); });
        }
        else {
            return request.map(function (response) { return response.json(); });
        }
    };
    DataProvider.prototype.getPlatformsCount = function () {
        var url = API + "/platforms/count";
        var cacheKey = url;
        var request = this.http.get(url, this.options);
        return this.cache.loadFromObservable(cacheKey, request)
            .map(function (response) { return response.json(); });
    };
    DataProvider.prototype.getGenres = function (offset) {
        this.offset = (offset * 50);
        var url = API + '/genres/?fields=name&limit=50&offset=' + this.offset;
        var request = this.http.get(url, this.options);
        if (offset == 0) {
            var cacheKey = url;
            return this.cache.loadFromObservable(cacheKey, request)
                .map(function (response) { return response.json(); });
        }
        else {
            return request.map(function (response) { return response.json(); });
        }
    };
    DataProvider.prototype.getGenresCount = function () {
        var url = API + "/genres/count";
        var cacheKey = url;
        var request = this.http.get(url, this.options);
        return this.cache.loadFromObservable(cacheKey, request)
            .map(function (response) { return response.json(); });
    };
    DataProvider.prototype.searchGames = function (keyword, offset) {
        this.offset = (offset * this.limit);
        var url = API + '/games/?fields=name,genres,release_dates,first_release_date,screenshots&limit=' + this.limit + '&offset=' + this.offset + '&order=release_dates.date:desc&search=' + keyword;
        return this.http.get(url, this.options)
            .map(function (response) { return response.json(); });
    };
    DataProvider.prototype.getGame = function (game) {
        var url = API + '/games/' + game + '?fields=*';
        var cacheKey = url;
        var request = this.http.get(url, this.options);
        return this.cache.loadFromObservable(cacheKey, request)
            .map(function (response) { return response.json(); });
    };
    DataProvider.prototype.getGenre = function (genre) {
        var url = API + '/genres/' + genre + '?fields=name';
        var cacheKey = url;
        var request = this.http.get(url, this.options);
        return this.cache.loadFromObservable(cacheKey, request)
            .map(function (response) { return response.json(); });
    };
    DataProvider.prototype.getPerspective = function (perspective) {
        var url = API + '/player_perspectives/' + perspective + '?fields=name';
        var cacheKey = url;
        var request = this.http.get(url, this.options);
        return this.cache.loadFromObservable(cacheKey, request)
            .map(function (response) { return response.json(); });
    };
    DataProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_3_ionic_cache__["b" /* CacheService */]])
    ], DataProvider);
    return DataProvider;
}());

//# sourceMappingURL=data.js.map

/***/ }),

/***/ 57:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_admob_free__ = __webpack_require__(173);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var BANNER_AD = "ca-app-pub-4777737717356698/5103286517";
var INTERSTITIAL_AD = "ca-app-pub-4777737717356698/9273970977";
var AdsProvider = (function () {
    function AdsProvider(admobFree) {
        this.admobFree = admobFree;
    }
    AdsProvider.prototype.presentBannerAd = function () {
        var bannerConfig = {
            id: BANNER_AD,
            isTesting: true,
            autoShow: true
        };
        this.admobFree.banner.config(bannerConfig);
        return this.admobFree.banner.prepare();
    };
    AdsProvider.prototype.presentInterstitialAd = function () {
        var interstitialConfig = {
            id: INTERSTITIAL_AD,
            isTesting: true,
            autoShow: true
        };
        this.admobFree.interstitial.config(interstitialConfig);
        return this.admobFree.interstitial.prepare();
    };
    AdsProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_admob_free__["a" /* AdMobFree */]])
    ], AdsProvider);
    return AdsProvider;
}());

//# sourceMappingURL=ads.js.map

/***/ }),

/***/ 89:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RateProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_app_rate__ = __webpack_require__(177);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var RateProvider = (function () {
    function RateProvider(appRate) {
        var _this = this;
        this.appRate = appRate;
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
                onButtonClicked: function (index) {
                    switch (index) {
                        case 0:// No
                            break;
                        case 1:// Ok
                            _this.appRate.navigateToAppStore();
                            break;
                        default:// Later
                            break;
                    }
                }
            }
        };
    }
    RateProvider.prototype.initiate = function () {
        this.appRate.promptForRating(false);
    };
    RateProvider.prototype.rate = function () {
        this.appRate.promptForRating(true);
    };
    RateProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_app_rate__["a" /* AppRate */]])
    ], RateProvider);
    return RateProvider;
}());

//# sourceMappingURL=rate.js.map

/***/ })

},[222]);
//# sourceMappingURL=main.js.map