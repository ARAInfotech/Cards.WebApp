import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { SigninService } from './signin.service';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomvalidationService {

  constructor(
    private signinService: SigninService
    ){}

  MatchPassword(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors['passwordMismatch']) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }

      return null;
    }
  }

  passwordPatternValidator(userControl: AbstractControl){
    const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
    return new Promise(resolve => {
        if (!regex.test(userControl.value)) {
          resolve({ invalidPassword: true });
        } else {
          resolve(null);
        }
    });
  }

  phonePatternValidator(userControl: AbstractControl){
    const regex = new RegExp('^(?=.*?[0-9]).{10,}$');
    return new Promise(resolve => {
        if (!regex.test(userControl.value)) {
          resolve({ invalidPhoneNumber: true });
        } else {
          resolve(null);
        }
    });
  }

  userNameValidator(userControl: AbstractControl) {
    return new Promise(resolve => {
      setTimeout(async () => {
        let flag = await this.validateUserName(userControl.value);
        if (flag.result) {
          resolve({ userNameNotAvailable: true });
        } else {
          resolve(null);
        }
      }, 100);
    });
  }

  validateUserName(userName: string): Promise<any>{
    return this.signinService.CheckUsernameExists(userName).toPromise()
  } 

  userNameExists(userControl: AbstractControl) {
    return new Promise(resolve => {
      setTimeout(async () => {
        let flag = await this.validateUserName(userControl.value);
        if (!flag.result) {
          resolve({ userNameNotAvailable: true });
        } else {
          resolve(null);
        }
      }, 100);
    });
  }
}