import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

const API = "https://api-2445582011268.apicast.io";
//const API = "/api";

@Injectable()
export class DataProvider {
  headers: Headers
  options: RequestOptions
  limit: number = 10
  offset: number

  constructor(public http: Http) {
    this.headers = new Headers()
    this.headers.append("user-key", "7147c3ffabe96df119a5b6d57087720f")
    this.headers.append("Accept", "application/json")
    this.options = new RequestOptions({ headers: this.headers })
  }

  public getGames(offset) {
    this.offset = (offset * this.limit)
    return this.http.get(API + '/games/?fields=name,genres,release_dates,screenshots&limit=' + this.limit + '&offset=' + this.offset + '&order=release_dates.date:desc&filter[screenshots][exists]&filter[first_release_date][lte]=' + Date.now(), this.options)
      .map(response => response.json())
  }

  public getComingSoonGames(offset) {
    this.offset = (offset * this.limit)
    return this.http.get(API + '/games/?fields=name,genres,release_dates,screenshots&limit=' + this.limit + '&offset=' + this.offset + '&order=release_dates.date:desc&filter[screenshots][exists]&filter[first_release_date][gte]=' + Date.now(), this.options)
      .map(response => response.json())
  }

  public getGamesForPlatform(platform, offset) {
    this.offset = (offset * this.limit)

    return this.http.get(API + '/platforms/' + platform + '?fields=games', this.options)
      .map(response => response.json())
  }

  public getGamesForGenre(genre, offset) {
    this.offset = (offset * this.limit)

    return this.http.get(API + '/games/?fields=name,genres,release_dates,screenshots&limit=' + this.limit + '&offset=' + this.offset + '&order=release_dates.date:desc&filter[screenshots][exists]&filter[genres][eq]=' + genre + '&filter[first_release_date][lte]=' + Date.now(), this.options)
      .map(response => response.json())
    //return this.http.get(API + '/games/scroll/DXF1ZXJ5QW5kRmV0Y2gBAAAAAAAu2EoWOFpFSXMyOEVSZWlibUllMXp6czdGZw==/?fields=name,genres,release_dates,screenshots', this.options)
      //.map(response => response)
  }

  public getFavorites(favs) {
    let favorites = favs.join()

    return this.http.get(API + '/games/' + favorites + '?fields=name,genres,release_dates,screenshots&order=release_dates.date:desc&filter[screenshots][exists]', this.options)
      .map(res => res.json())
  }

  public getPlatforms() {
    return this.http.get(API + '/platforms/?fields=name,logo,summary,website,generation,games', this.options)
      .map(response => response.json())
  }

  public getGenres() {
    return this.http.get(API + '/genres/?fields=name&limit=50', this.options)
      .map(response => response.json())
  }

  public searchGames(keyword, offset) {
    this.offset = (offset * this.limit)
    return this.http.get(API + '/games/?fields=name,genres,release_dates,screenshots&limit=' + this.limit + '&offset=' + this.offset + '&order=release_dates.date:desc&search=' + keyword, this.options)
      .map(response => response.json())
  }

  public getGame(game) {
    return this.http.get(API + '/games/' + game + '?fields=*', this.options)
      .map(response => response.json())
  }

  public getGenre(genre) {
    return this.http.get(API + '/genres/' + genre + '?fields=name', this.options)
      .map(response => response.json())
  }

  public getPerspective(perspective) {
    return this.http.get(API + '/player_perspectives/' + perspective + '?fields=name', this.options)
      .map(response => response.json())
  }
}
