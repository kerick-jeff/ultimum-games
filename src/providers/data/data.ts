import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { CacheService } from 'ionic-cache';

const API = "https://api-2445582011268.apicast.io";
//const API = "/api";

@Injectable()
export class DataProvider {
  headers: Headers
  options: RequestOptions
  limit: number = 25
  offset: number

  constructor(public http: Http, private cache: CacheService) {
    this.headers = new Headers()
    this.headers.append("user-key", "7147c3ffabe96df119a5b6d57087720f")
    this.headers.append("Accept", "application/json")
    this.options = new RequestOptions({ headers: this.headers })
  }

  public getGames(offset) {
    this.offset = (offset * this.limit)
    
    let url = API + '/games/?fields=name,genres,release_dates,first_release_date,screenshots&limit=' + this.limit + '&offset=' + this.offset + '&order=release_dates.date:desc&filter[screenshots][exists]&filter[first_release_date][lte]=' + Date.now()
    
    let request = this.http.get(url, this.options)

    if(offset == 0) {
      let cacheKey = url.slice(0, url.indexOf("[first_release_date][lte]=")) + "[first_release_date][lte]="

      return this.cache.loadFromObservable(cacheKey, request, "games")
        .map(response => response.json())
    } else {
      return request.map(response => response.json())
    }
  
  }

  public getComingSoonGames(offset) {
    this.offset = (offset * this.limit)

    let url = API + '/games/?fields=name,genres,release_dates,first_release_date,screenshots&limit=' + this.limit + '&offset=' + this.offset + '&order=release_dates.date:desc&filter[screenshots][exists]&filter[first_release_date][gte]=' + Date.now()

    let request = this.http.get(url, this.options)

    if(offset == 0) {
      let cacheKey = url.slice(0, url.indexOf("[first_release_date][gte]=")) + "[first_release_date][gte]="
      
      return this.cache.loadFromObservable(cacheKey, request, "coming_soon_games")
        .map(response => response.json())
    } else {
      return request.map(response => response.json())
    }
  }

  public getGamesForGenre(genre, offset) {
    this.offset = (offset * this.limit)
    let url = API + '/games/?fields=name,genres,release_dates,first_release_date,screenshots&limit=' + this.limit + '&offset=' + this.offset + '&order=release_dates.date:desc&filter[screenshots][exists]&filter[genres][eq]=' + genre + '&filter[first_release_date][lte]=' + Date.now()

    let request = this.http.get(url, this.options)

    if(offset == 0) {
      let cacheKey = url.slice(0, url.indexOf("[first_release_date][lte]=")) + "[first_release_date][lte]="
      
      return this.cache.loadFromObservable(cacheKey, request, 'genre_games')
        .map(response => response.json())
    } else {
      return request.map(response => response.json())
    }
  }

  public getFavorites(favs) {
    let favorites = favs.join()
    let url = API + '/games/' + favorites + '?fields=name,genres,release_dates,first_release_date,screenshots&order=release_dates.date:desc&filter[screenshots][exists]'
    let cacheKey = url
    let ttl = 60 * 60 * 24 * 365 // 365d
    
    let request = this.http.get(url, this.options)
    return this.cache.loadFromObservable(cacheKey, request, "favorites", ttl)
      .map(res => res.json())
  }

  public getPlatforms(offset) {
    this.offset = (offset * 50)
    let url = API + '/platforms/?fields=name,logo,summary,website,generation,games&limit=50&offset=' + this.offset
    
    let request = this.http.get(url, this.options)

    if(offset == 0) {
      let cacheKey = url
      return this.cache.loadFromObservable(cacheKey, request)
        .map(response => response.json())
    } else {
      return request.map(response => response.json())
    }
  }

  public getPlatformsCount() {
    let url = API + "/platforms/count"
    let cacheKey = url
    
    let request = this.http.get(url, this.options)

    return this.cache.loadFromObservable(cacheKey, request)
      .map(response => response.json())
  }

  public getGenres(offset) {
    this.offset = (offset * 50)
    let url = API + '/genres/?fields=name&limit=50&offset=' + this.offset

    let request = this.http.get(url, this.options)

    if(offset == 0) {
      let cacheKey = url

      return this.cache.loadFromObservable(cacheKey, request)
        .map(response => response.json())
    } else {
      return request.map(response => response.json())
    }
  }

  public getGenresCount() {
    let url = API + "/genres/count"
    let cacheKey = url
    
    let request = this.http.get(url, this.options)

    return this.cache.loadFromObservable(cacheKey, request)
      .map(response => response.json())
  }

  public searchGames(keyword, offset) {
    this.offset = (offset * this.limit)
    let url =  API + '/games/?fields=name,genres,release_dates,first_release_date,screenshots&limit=' + this.limit + '&offset=' + this.offset + '&order=release_dates.date:desc&search=' + keyword

    return this.http.get(url, this.options)
      .map(response => response.json())
  }

  public getGame(game) {
    let url = API + '/games/' + game + '?fields=*'
    let cacheKey = url

    let request = this.http.get(url, this.options)
    return this.cache.loadFromObservable(cacheKey, request)
      .map(response => response.json())
  }

  public getGenre(genre) {
    let url = API + '/genres/' + genre + '?fields=name'
    let cacheKey = url
    let request = this.http.get(url, this.options)
    return this.cache.loadFromObservable(cacheKey, request)
      .map(response => response.json())
  }

  public getPerspective(perspective) {
    let url = API + '/player_perspectives/' + perspective + '?fields=name'
    let cacheKey = url
    let request = this.http.get(url, this.options)
    return this.cache.loadFromObservable(cacheKey, request)
      .map(response => response.json())
  }
}
