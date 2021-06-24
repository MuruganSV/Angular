import { Component, OnInit,  Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

import { DataService } from '../../services/data.service';
// import * as alertify from 'alertify.js';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	
	isLoggedIn: boolean = false;
	loginForm: FormGroup;
	isLoginFailed: boolean = false;

    emptyUserName = 'You must enter a username';
    minlengthUserName = 'User name must be at least 3 characters long';
    maxlengthUserName = 'Username cannot exceed 20 characters';
    userNamePattern = 'Username should be in alphanumeric only';

    emptyPassword = 'You must enter a password';
    minlengthPassword = 'Password must be at least 8 characters long';
    maxlengthPassword = 'Password cannot exceed 20 characters';
    passwordPattern = 'Pattern does not match';

    wrongUsernameOrPassword = 'Username or Passwrod is wrong!';

	constructor(
        private route: Router,
        private dataService: DataService,
        private _formBuilder: FormBuilder,
    ) {
        
    }

	ngOnInit() {
        // add necessary validators
		this.loginForm = this._formBuilder.group({
            userName: new FormControl('',[
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(20),
                Validators.pattern('[a-zA-Z0-9]+$'),
            // Validators.compose([
            //     Validators.required,
            //     this.customValidator.userNameMinlength(),
            //     this.customValidator.notEmptyUsernameandPassword(),
            //     this.customValidator.userNamePasswordMaxlength(),
            //     this.customValidator.userNamePattern(),
            // ]),
        ]),
            password: new FormControl('',[
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(20),
                Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$'),
                // Validators.compose([
                //     Validators.required,
                //     this.customValidator.passwordMinlength(),
                //     this.customValidator.notEmptyUsernameandPassword(),
                //     this.customValidator.passwordpatternValidator(),
                //     this.customValidator.userNamePasswordMaxlength(),
                // ]),
            ]),
        },
        // {
        //     validator: this.customValidator.ValidateAll('userName', 'password', 'loginButton'),
        // }
    );
    }

    get userName() {
        return this.loginForm.get('userName');
    }

    get password() {
        return this.loginForm.get('password');
    }
    
    
	doLogin() {
		// call authenticateUser method to perform login operation
		// if success, redirect to profile page
		// else display appropriate error message
           // reset the form
        this.isLoginFailed = false;
        var userName = this.loginForm.get('userName').value;
        var password = this.loginForm.get('password').value;
        this.dataService.authenticateUser(userName, password).subscribe(res=>{
            if(res){
                this.isLoginFailed = false;
                this.isLoggedIn = true;
                this.route.navigateByUrl('/profile');
            } else {
                this.loginForm.reset();
                this.isLoginFailed = true;
                this.isLoggedIn = false;
            }
        });   
	}

	signUp() {
        // should navigate to register new user page
        this.route.navigateByUrl('/register_user');   
	}

}



