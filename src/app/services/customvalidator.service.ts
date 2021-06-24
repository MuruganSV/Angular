import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Injectable()
export class CustomValidatorService {

  passwordpatternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
      const valid = regex.test(control.value);
      return valid ? null : { invalidPattern: true };
    };
  }

  
  notEmptyUsernameandPassword(): ValidatorFn {
    return (control: AbstractControl) : { [key: string]: any} => {
      const valid = control.value.trim() !== '';
      return valid ? null : { emptyUsernamePassword: true };
    }
  }

  userNamePattern(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any} => {
      if(!control.value) {
        return null;
      }
      const regex = new RegExp('[a-zA-Z0-9_]');
      const valid = regex.test(control.value);
      return valid? null : { inValidPattern: true };
    }
  }

  userNamePasswordMaxlength(): ValidatorFn {
    return (control: AbstractControl) : { [key: string]: any} => {
      if(!control.value) {
        return null;
      }
      const valid = control.value.trim().length < 21;
      return valid ? null : { maxLengthcrossed: true };
    }
  }

  userNameMinlength() : ValidatorFn {
    return (control: AbstractControl) : { [key: string]: any } => {
      if(!control.value) {
        return null;
      }
      const valid = control.value.trim().length > 2;
      return valid ? null : { minLengtherror: true };
    }
  }

  ValidateAll(userName: string, password: string, loginButton: string) {
    return (formGroup: FormGroup) => {
      const userNameControl = formGroup.controls[userName];
      const passwordControl = formGroup.controls[password];
      const loginButtonControl = formGroup.controls[loginButton];

      // if (!userNameControl || !passwordControl) {
      //   return null;
      // }

      // if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {
      //   return null;
      // }

      if (userNameControl.errors || passwordControl.errors) {
        loginButtonControl.setErrors({ validateFailed: true });
      } else {
        loginButtonControl.setErrors(null);
      }
    }
  }

  signupValidateAll(userName: string, password: string,
    mobile: string, email: string, location: string, signupButton: string) {
    return (formGroup: FormGroup) => {
      const userNameControl = formGroup.controls[userName];
      const passwordControl = formGroup.controls[password];
      const signupButtonControl = formGroup.controls[signupButton];
      const mobileControl = formGroup.controls[mobile];
      const emailControl = formGroup.controls[email];
      const locationControl = formGroup.controls[location];

      // if (!userNameControl || !passwordControl) {
      //   return null;
      // }

      // if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {
      //   return null;
      // }

      if (userNameControl.errors || passwordControl.errors
      || mobileControl.errors || emailControl.errors || locationControl.errors) {
        signupButtonControl.setErrors({ validateFailed: true });
      } else {
        signupButtonControl.setErrors(null);
      }
    }
  }

  profileValidateAll( mobile: string, email: string, location: string, makeChangeButton: string) {
    return (formGroup: FormGroup) => {
      const makeChangeButtonControl = formGroup.controls[makeChangeButton];
      const mobileControl = formGroup.controls[mobile];
      const emailControl = formGroup.controls[email];
      const locationControl = formGroup.controls[location];

      // if (!userNameControl || !passwordControl) {
      //   return null;
      // }

      // if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {
      //   return null;
      // }

      if (mobileControl.errors || emailControl.erors || locationControl.errors) {
        makeChangeButtonControl.setErrors({ validateFailed: true });
      } else {
        makeChangeButtonControl.setErrors(null);
      }
    }
  }

  passwordMinlength(): ValidatorFn {
    return (control: AbstractControl) : { [key: string]: any} => {
      if(!control.value) {
        return null;
      }
      const valid = control.value.trim().length > 7;
      return valid ? null : { minLengtherror: true };
    }
  }

  // MatchPassword(password: string, confirmPassword: string) {
  //   return (formGroup: FormGroup) => {
  //     const passwordControl = formGroup.controls[password];
  //     const confirmPasswordControl = formGroup.controls[confirmPassword];

  //     if (!passwordControl || !confirmPasswordControl) {
  //       return null;
  //     }

  //     if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {
  //       return null;
  //     }

  //     if (passwordControl.value !== confirmPasswordControl.value) {
  //       confirmPasswordControl.setErrors({ passwordMismatch: true });
  //     } else {
  //       confirmPasswordControl.setErrors(null);
  //     }
  //   }
  // }

  // userNameValidator(userControl: AbstractControl) {
  //   return new Promise(resolve => {
  //     setTimeout(() => {
  //       if (this.validateUserName(userControl.value)) {
  //         resolve({ userNameNotAvailable: true });
  //       } else {
  //         resolve(null);
  //       }
  //     }, 1000);
  //   });
  // }

  // validateUserName(userName: string) {
  //   const UserList = ['ankit', 'admin', 'user', 'superuser'];
  //   return (UserList.indexOf(userName) > -1);
  // }
}