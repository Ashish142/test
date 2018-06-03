import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class RestService {
  configUrl = 'https://api.github.com/';
  constructor(private http: HttpClient) { }

  searchUsers(searchKeyWord) {
    return this.http.get(this.configUrl + 'search/users?q=' + searchKeyWord);
  }

  userDetails(user){
    return this.http.get(this.configUrl + 'users/' + user + '/repos');
  }
}
