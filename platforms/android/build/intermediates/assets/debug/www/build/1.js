webpackJsonp([1,4],{

/***/ 304:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GenresPageModule", function() { return GenresPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__genres__ = __webpack_require__(311);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var GenresPageModule = (function () {
    function GenresPageModule() {
    }
    GenresPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__genres__["a" /* GenresPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__genres__["a" /* GenresPage */]),
            ],
        })
    ], GenresPageModule);
    return GenresPageModule;
}());

//# sourceMappingURL=genres.module.js.map

/***/ }),

/***/ 306:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilterPageModule", function() { return FilterPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__filter__ = __webpack_require__(313);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__genres_genres_module__ = __webpack_require__(304);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var FilterPageModule = (function () {
    function FilterPageModule() {
    }
    FilterPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__filter__["a" /* FilterPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__filter__["a" /* FilterPage */]),
                __WEBPACK_IMPORTED_MODULE_3__genres_genres_module__["GenresPageModule"]
            ],
        })
    ], FilterPageModule);
    return FilterPageModule;
}());

//# sourceMappingURL=filter.module.js.map

/***/ }),

/***/ 311:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GenresPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_data_data__ = __webpack_require__(56);
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





var GENRE = 'genre';
var TITLE = 'title';
var GenresPage = (function () {
    function GenresPage(navCtrl, navParams, storage, viewCtrl, _data, alertProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.viewCtrl = viewCtrl;
        this._data = _data;
        this.alertProvider = alertProvider;
        this.offset = 0;
        this.currentPage = 1;
        this.more = true;
        this._data.getGenresCount().subscribe(function (res) {
            _this.total = res.count;
            _this.numPages = Math.ceil(_this.total / 50); // 50 is the limit used in this._data.getPlatform()
            if (_this.currentPage >= _this.numPages) {
                _this.more = false;
            }
        }, function (err) {
            _this.alertProvider.showAlert("No Internet", "Please make sure you are connected to the internet");
        });
    }
    GenresPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.storage.get(GENRE).then(function (val) {
            if (val) {
                _this.currentGenre = val;
            }
        });
        this._data.getGenres(this.offset)
            .subscribe(function (res) {
            _this.genres = res;
        }, function (err) {
            _this.alertProvider.showAlert("No Internet", "Please make sure you are connected to the internet");
        });
    };
    GenresPage.prototype.genreSelected = function (genre) {
        this.storage.set(GENRE, genre.id);
        this.storage.set(TITLE, genre.name); // Store homepage title
        this.viewCtrl.dismiss(genre);
    };
    GenresPage.prototype.loadMore = function () {
        var _this = this;
        this.currentPage += 1;
        this.offset = this.currentPage - 1;
        this._data.getGenres(this.offset)
            .subscribe(function (res) {
            _this.genres = res;
            if (_this.currentPage >= _this.numPages) {
                _this.more = false;
            }
        }, function (err) {
            _this.alertProvider.showAlert("No Internet", "Please make sure you are connected to the internet");
        });
    };
    GenresPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-genres',template:/*ion-inline-start:"/home/kerick/Documents/ionic/ultimum-games/src/pages/genres/genres.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>Game Genres</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <button ion-item *ngFor="let genre of genres" (click)="genreSelected(genre)">\n      {{ genre.name }}\n      <ion-icon name="checkmark-circle" color="primary" item-end *ngIf="genre.id == currentGenre"></ion-icon>\n    </button>\n\n    <ion-item *ngIf="more">\n      <button (click)="loadMore()" ion-button id="#load">Next</button>\n    </ion-item>\n  </ion-list>\n</ion-content>\n '/*ion-inline-end:"/home/kerick/Documents/ionic/ultimum-games/src/pages/genres/genres.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_data_data__["a" /* DataProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_alert_alert__["a" /* AlertProvider */]])
    ], GenresPage);
    return GenresPage;
}());

//# sourceMappingURL=genres.js.map

/***/ }),

/***/ 313:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var FILTEROPTIONS = [
    'None',
    'Genre',
    'Coming Soon'
];
var TITLE = "title";
var FILTER = 'filter';
var GENRE = "genre";
var FilterPage = (function () {
    function FilterPage(navCtrl, navParams, storage, modalCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.modalCtrl = modalCtrl;
        this.loadingCtrl = loadingCtrl;
        this.options = FILTEROPTIONS;
        this.currentFilter = navParams.get(FILTER);
        this.callback = navParams.get("callback");
    }
    FilterPage.prototype.optionSelected = function (option) {
        var _this = this;
        this.currentFilter = option;
        switch (this.currentFilter) {
            case FILTEROPTIONS[1]:// Genres
                var loader_1 = this.loadingCtrl.create({
                    content: 'Getting Genres...'
                });
                loader_1.present().then(function () {
                    _this.openGenres();
                    setTimeout(function () {
                        loader_1.dismiss();
                    }, 3500);
                });
                break;
            case FILTEROPTIONS[2]:// Coming Soon
                this.storage.set(FILTER, this.currentFilter).then(function () {
                    _this.storage.set(TITLE, _this.currentFilter).then(function () {
                        _this.callback(true).then(function () {
                            _this.storage.get(GENRE).then(function (val) {
                                if (val) {
                                    _this.storage.remove(GENRE);
                                }
                            });
                            _this.navCtrl.pop();
                        });
                    });
                });
                break;
            default:// None
                this.storage.set(FILTER, this.currentFilter).then(function () {
                    _this.storage.set(TITLE, 'Ultimum').then(function () {
                        _this.callback(true).then(function () {
                            _this.storage.get(GENRE).then(function (val) {
                                if (val) {
                                    _this.storage.remove(GENRE);
                                }
                            });
                            _this.navCtrl.pop();
                        });
                    });
                });
                break;
        }
    };
    FilterPage.prototype.openGenres = function () {
        var _this = this;
        var genresModal = this.modalCtrl.create('GenresPage');
        genresModal.onDidDismiss(function (genre) {
            if (genre) {
                _this.storage.set(FILTER, _this.currentFilter).then(function () {
                    _this.callback(true).then(function () {
                        _this.navCtrl.pop();
                    });
                });
            }
        });
        genresModal.present();
    };
    FilterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-filter',template:/*ion-inline-start:"/home/kerick/Documents/ionic/ultimum-games/src/pages/filter/filter.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Filter Options</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <h5>Filter By:</h5>\n  <ion-list>\n    <button ion-item *ngFor="let option of options" (click)="optionSelected(option)">\n      {{ option }}\n      <ion-icon name="checkmark-circle" color="primary" item-end *ngIf="option === currentFilter"></ion-icon>\n    </button>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/home/kerick/Documents/ionic/ultimum-games/src/pages/filter/filter.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]])
    ], FilterPage);
    return FilterPage;
}());

//# sourceMappingURL=filter.js.map

/***/ })

});
//# sourceMappingURL=1.js.map