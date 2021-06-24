import { Component, OnInit, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { Users } from '../../models/users';
import { DataService } from '../../services/data.service';
// import * as alertify from 'alertify.js';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  // used as a flag to display or hide form
  editProfile = false;
  userDetails;
  updateMyDetails : any = {};
  editProfileForm: FormGroup;
  userImg = './../../assets/user.jpg';
  mobileErrMsg = 'You must enter a valid mobile number';
  emailErrMsg = 'You must enter a valid Email ID';
  locationErrMsg = 'You must enter the location';
  constructor(
    private dataService: DataService,
    private _formBuilder: FormBuilder,
  ) { 

  }

  ngOnInit() {

    // add necessary validators
    // username should be disabled. it should not be edited
    this.editProfileForm = this._formBuilder.group({
      userName: new FormControl( { value:'', disabled: true }),
      mobile: new FormControl('',[
        Validators.required,
        Validators.pattern('[0-9 ]{10}'),
      ]),
      email: new FormControl('',[
            Validators.required,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      location: new FormControl('',[ Validators.required]),
    },
  );
    this.getProfileDetails();
    // get profile details and display it
    
  }

  getProfileDetails() {

    // retrieve user details from service using userId
    this.dataService.getUserDetails().subscribe(res=>{
      if(res) {
        this.userDetails = res;
        this.editProfileForm.get('userName').setValue(this.userDetails.user_name);
      }
    }); 
  }

  changeMyProfile() {

    // if successfully changed the profile it should display new details hiding the form
    this.updateMyDetails.user_mobile = this.editProfileForm.get('mobile').value;
    this.updateMyDetails.user_email = this.editProfileForm.get('email').value;
    this.updateMyDetails.location = this.editProfileForm.get('location').value;
    const userId = localStorage.getItem('id');
    this.dataService.updateProfile(userId, this.updateMyDetails).subscibe(res=>{
      if (res) {
        this.getProfileDetails();
        this.editProfile = false;
      }
    });
  }

  get userName() {
    return this.editProfileForm.get('userName');
  }

  get mobile() {
    return this.editProfileForm.get('mobile');
  }

  get email() {
    return this.editProfileForm.get('email');
  }

  get location() {
    return this.editProfileForm.get('location');
  }

  editMyProfile() {

    // change editProfile property value appropriately
    this.editProfile = true;

  }

  discardEdit() {

    // change editProfile property value appropriately
    this.editProfile = false;

  }

}
