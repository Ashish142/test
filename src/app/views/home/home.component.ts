import { Component, OnInit } from '@angular/core';
 import { RestService } from '../../service/rest.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchText: string;
  constructor( private service: RestService) { }

  ngOnInit() {
 //  this.searchUsers();
  }

  searchUsers(text) {
    this.service.searchUsers(text)
    .subscribe( resp => {
      console.log('success response', resp);
    }, error => {
      console.log('error response', error);
    });
  }
  onKey(event) {
    console.log(event, '  ', this.searchText);
    this.searchUsers(this.searchText)
  }

}
