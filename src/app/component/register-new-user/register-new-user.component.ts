import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
// import * as alertify from 'alertify.js';
import { Users } from '../../models/users';

@Component({
  selector: 'app-register-new-user',
  templateUrl: './register-new-user.component.html',
  styleUrls: ['./register-new-user.component.css']
})

export class RegisterNewUserComponent implements OnInit {

	regNewUser = new Users;
  signupForm: FormGroup;
  signUpFailed = false;

  emptyUserName = 'You must enter a username';
  minlengthUserName = 'User name must be at least 3 characters long';
  maxlengthUserName = 'Username cannot exceed 20 characters';
  userNamePattern = 'Username should be in alphanumeric only';

  emptyPassword = 'You must enter a password';
  minlengthPassword = 'Password must be at least 8 characters long';
  maxlengthPassword = 'Password cannot exceed 20 characters';
  passwordPattern = 'Pattern does not match';

  mobileErrMsg = 'You must enter a valid mobile number';
  emailErrMsg = 'You must enter a valid Email ID';
  locationErrMsg = 'You must enter the location';

  errorOccured = 'Error Occured Please try again later';

  constructor(
    private route: Router, 
    private dataService: DataService,
    private _formBuilder: FormBuilder,
  ) {
   }

  ngOnInit() {
    // add necessary validators

    this.signupForm = this._formBuilder.group({
      userName: new FormControl('',[
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern('[a-zA-Z0-9]+$'),
      ]),
      password: new FormControl('',[
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$'),
      ]),
      mobile: new FormControl('',[
        Validators.required,
        Validators.pattern('[0-9 ]{10}'),
      ]),
      email: new FormControl('',[
            Validators.required,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      location: new FormControl('',[ Validators.required ]),
    },
  );
  }


  get userName() {
    return this.signupForm.get('userName');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get mobile() {
    return this.signupForm.get('mobile');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get location() {
    return this.signupForm.get('location');
  }

  signUp() {
    this.signUpFailed = false;
    // call regNewUser method to perform signup operation
    // if success, redirect to login page
    // else display appropriate error message
       // reset the form
    this.regNewUser.user_name = this.signupForm.get('userName').value;
    this.regNewUser.password = this.signupForm.get('password').value;
    this.regNewUser.user_mobile = this.signupForm.get('mobile').value;
    this.regNewUser.user_email = this.signupForm.get('email').value;
    this.regNewUser.location = this.signupForm.get('location').value;
    this.dataService.regNewUser(this.regNewUser).subscribe(res=>{
      if (res) {
        this.route.navigateByUrl('/login');
      } else {
        this.signUpFailed = true;
        this.signupForm.reset();
      }
    });
    
  }

  goBack() {
    this.signUpFailed = false;
    // should navigate to login page
    this.route.navigateByUrl('/login');

  }

}
