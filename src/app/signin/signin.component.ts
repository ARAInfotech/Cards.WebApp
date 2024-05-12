import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomvalidationService } from '../services/customvalidation.service';
import { newuser } from '../models/newuser';
import { SigninService } from '../services/signin.service';
import { EncryptionService } from '../services/EncryptionService';
import { faCircleCheck, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { submitOTP } from '../models/submitOTP';

@Component({
selector: 'app-signin',
templateUrl: './signin.component.html',
styleUrl: './signin.component.css'
})
  export class SigninComponent implements OnInit{

  private customerUserType: string = "";
  private tempUserID: string = "";
  private email: string = "";
  private OtpValidity = 5; // in minutes
  private ResendMailValidity = 2; // in minutes
  private timerInterval: any;
  private resendMailTimerInterval: any;

  isVisibleModal:boolean = false;
  maskedEmail:string ="";
  OTP: string = "";
  displayOTP: any;
  OTPDanger: boolean = false;
  disableOTP: boolean = false;
  enableOTPSubmit:boolean = false;
  faInfoCircle = faInfoCircle;
  faCircleCheck = faCircleCheck;
  resendMailTooltip: string = "";
  disableResend: boolean = false;
  isOTPSendSuccess:boolean = true;
  isUserRegistrationSuccess:boolean = false;
  isUserRegistrationError:boolean = false;
  validationMsgOTP: string = "";

  constructor(private signinService:SigninService,
  private router: Router,
  private fb: FormBuilder,
  private customValidator: CustomvalidationService,
  private encryption: EncryptionService
  ){}

  ngOnInit(): void {
    this.getCustomerUserType();
    //this.startOTPTime();
    //.startResendMailTime();
    //this.maskedEmail = this.censorEmail(this.email);
  }

  showError:boolean = false;

  registrationForm = this.fb.group({    
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email], this.customValidator.userNameValidator.bind(this.customValidator)],
    phoneNumber: ['', [Validators.required], this.customValidator.phonePatternValidator.bind(this.customValidator)],
    password: ['', [Validators.required], this.customValidator.passwordPatternValidator.bind(this.customValidator)],
    confirmPassword: ['', [Validators.required]]
    },
    {
    validator: this.customValidator.MatchPassword('password', 'confirmPassword'),
    }
  );

  // public register(): void{
  //   let user:newuser = new newuser();
  //   user.Email = this.registrationForm.value["email"];
  //   user.FirstName = this.registrationForm.value["firstName"];
  //   user.LastName = this.registrationForm.value["lastName"];
  //   user.Password = this.registrationForm.value["password"];
  //   user.UserName = this.registrationForm.value["email"];
  //   user.mobileNumber = this.registrationForm.value["phoneNumber"];
  //   user.encUserTypeID = this.customerUserType;

  // // this.signinService.SignIn<newuser>(user).subscribe({
  // //   next:(data)=>{
  // //     if(data.isSuccess){
  // //     }
  // //     else{
  // //     }
  // //   },
  // //   error: (e)=>{
  // //   }
  // // });    
  // }

  public login(): void{
    this.router.navigate(['']);
  }

  getCustomerUserType() {
    let userType: string = "";
    this.signinService.GetCustomerUserType().subscribe({
        next:(data)=>{
        if(data.isSuccess){
          this.customerUserType = data.result;
        }
      },
      error: (e)=>{
      }
    });
  }

  enterOTP(){
    let user:newuser = new newuser();
    user.Email = this.registrationForm.value["email"];
    user.FirstName = this.registrationForm.value["firstName"];
    user.LastName = this.registrationForm.value["lastName"];
    user.Password = this.encryption.encryptUsingTripleDES(this.registrationForm.value["password"], false);
    user.UserName = this.registrationForm.value["email"];
    user.mobileNumber = this.registrationForm.value["phoneNumber"];
    user.encUserTypeID = this.customerUserType;

    this.email = this.registrationForm.value["email"];
    this.maskedEmail = this.censorEmail(this.email);

    this.signinService.GenerateOTP<newuser>(user).subscribe({
      next:(data)=>{
        if(data.isSuccess){
          if(this.resendMailTimerInterval!== undefined){
            clearInterval(this.resendMailTimerInterval);
          }

          if(this.timerInterval !== undefined){
            clearInterval(this.timerInterval);
          }          
          
          this.tempUserID = data.result;
          this.isVisibleModal = true;
          this.startOTPTime();
          this.startResendMailTime();
          this.isOTPSendSuccess=true;
        }
        else{
        }
      },
      error: (e)=>{        
        this.isOTPSendSuccess=false;
      }
    });
  }

  SubmitOTP(){
    this.isUserRegistrationError = false;

    let model = new submitOTP();
    model.OTP = this.OTP;
    model.UserID = this.tempUserID;

    this.signinService.SubmitOTP<submitOTP>(model).subscribe({
      next:(data)=>{
        if(data.isSuccess){
          if(data.result.isSuccess){
            this.isUserRegistrationError = false;
            this.isUserRegistrationSuccess = true;
          }
          else{
            this.isUserRegistrationError = true;
            this.isUserRegistrationSuccess = false;
            this.validationMsgOTP=data.result.message;
          }
        }
        else{
          this.isUserRegistrationError = true;
          this.isUserRegistrationSuccess = false;
          this.validationMsgOTP=data.errorMessage;
        }
      },
      error: (e)=>{        
        this.isOTPSendSuccess=false;
      }
    });   
  }

  censorWord(str: string) {
    let res:string="";
    let hide:boolean = false;
    for(let i = 0 ; i < str.length ; i++){
      if(hide){
        res += "*";
        hide = false;
      }
      else{
        res += str[i];
        hide = true;
      }
    }

    return res;
  }

  censorEmail(email: string){
    var arr = email.split("@");
    return this.censorWord(arr[0]) + "@" + this.censorWord(arr[1]);
  }

  onOtpChange(value: string){
    if(value.length == 6 ){
      this.OTP = value;
      this.enableOTPSubmit = true;
    }
    else{
      this.enableOTPSubmit = false;}
  }

  oTPTimer(minute: number) {
    // let minute = 1;
    let seconds: number = minute * 60;
    let textSec: any = '0';
    let statSec: number = 60;

    const prefix = minute < 10 ? '0' : '';

    this.timerInterval = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = '0' + statSec;
      } else textSec = statSec;

      if(Math.floor(seconds / 60) == 0){
        this.OTPDanger = true;
      }

      this.displayOTP = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;

      if (seconds == 0) {
        this.disableOTP = true;
        clearInterval(this.timerInterval);
      }
    }, 1000);
  }

  startOTPTime() {
    this.oTPTimer(this.OtpValidity);
  }

  startResendMailTime() {
    this.disableResend = true;
    this.resendMailTimer(this.ResendMailValidity);
  }

  resendMailTimer(minute: number) {
    let seconds: number = minute * 60;
    let textSec: any = '0';
    let statSec: number = 60;

    const prefix = minute < 10 ? '0' : '';

    this.resendMailTimerInterval = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = '0' + statSec;
      } else textSec = statSec;

      this.resendMailTooltip = 'Resend mail will enable in '+`${prefix}${Math.floor(seconds / 60)}:${textSec}`;

      if (seconds == 0) {
        this.disableResend = false;
        this.resendMailTooltip = 'Resend mail is enabled ';
        clearInterval(this.resendMailTimerInterval);
      }
    }, 1000);
  }
}

