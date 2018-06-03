import { Component, OnInit } from '@angular/core';
import { RestService } from '../../service/rest.service';
import { AppService } from '../../service/app.service'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchText: string;
  searchResult: any = [];
 
  selectedUser: string;
  userDetails: any = [];

  sortType: any = [
    {id:'1', title:'Name (A-Z)'},
    {id:'2', title:'Name (Z-A)'},
    {id:'3', title:'Rank from top'},
    {id:'4', title:'Rank from bottom'}
   ];
   selected: any;
  constructor( private service: RestService, private appService: AppService) { 
   this.selected = 1;
  }

  // array of all items to be paged
  private allItems: any[];

  // pager object
  pager: any = {};
 
  // paged items
  pagedItems: any[];

  ngOnInit() {
 //  this.searchUsers();
  }
  getSortType() {
    console.log('sort type ', this.selected);
    if (this.selected === '2' || this.selected === '1') {
      if (this.selected === '1') {
        this.searchResult.items.sort(this.appService.sortResult('login', 'asc'));
      } else {
        this.searchResult.items.sort(this.appService.sortResult('login', 'desc'));
      }
      this.setPage(1);
    }
    if (this.selected === '3' || this.selected === '4') {
      if (this.selected === '3') {
        console.log('asc score')
        this.searchResult.items.sort(this.appService.sortResult('score', 'asc'));
      } else {
        this.searchResult.items.sort(this.appService.sortResult('score', 'desc'));
      }
      this.setPage(1);
    }
  }

  setPage(page: number) {
    console.log('page ', page)
    // get pager object from service
    this.pager = this.appService.getPager(this.searchResult.items.length, page);

    // get current page of items
    this.pagedItems = this.searchResult.items.slice(this.pager.startIndex, this.pager.endIndex + 1);
}

  searchUsers(text) {
    this.service.searchUsers(text)
    .subscribe( resp => {
      console.log('success response', resp);
      this.searchResult = resp;
      console.log('success response', this.searchResult.items);
      // initialize to page 1
      this.setPage(1);
    }, error => {
      console.log('error response', error);
    });
  }
  onKey(event) {
    console.log(event, '  ', this.searchText);
    this.searchUsers(this.searchText);
  }

  getUserDetails(userName) {
    console.log(userName);
    this.selectedUser = userName;
    this.service.userDetails(userName)
    .subscribe( resp => {
      console.log('user detaisl ', resp);
      this.userDetails = resp;
    }, error => {
      console.log('error getting user details ', error);
    });
  }

  hideUserDetails(){
    this.selectedUser = '';
  }

}
