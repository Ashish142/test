import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RestService {
  configUrl = 'https://api.github.com/search/users?q=';
  constructor(private http: HttpClient) { }

  searchUsers(searchKeyWord) {
    return this.http.get(this.configUrl + searchKeyWord);
  }
}
