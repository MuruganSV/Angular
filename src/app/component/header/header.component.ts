import { Component, OnInit, DoCheck, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import {DataService } from '../../services/data.service';
import {ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userDetails: any = {};
  
  constructor(
    private dataService: DataService,
    private route: Router,
  ) { 

  }

  ngOnInit() {

    // call getProfileDetails method to get user details

  this.getProfileDetails();

  }

  getProfileDetails() {

  // call getUserDetails method of dataService and assign response to userDetails property
  this.dataService.getUserDetails().subscribe(res=>{
    if(res){
      this.userDetails = res;
    }
  });

  }

  logout() {

    // call doLogOut method
    this.dataService.doLogOut();
    this.route.navigateByUrl('/login');
  }
  
}
