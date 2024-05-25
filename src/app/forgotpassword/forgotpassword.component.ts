import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faInfoCircle, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { newuser } from '../models/newuser';
import { submitOTP } from '../models/submitOTP';
import { EncryptionService } from '../services/EncryptionService';
import { CustomvalidationService } from '../services/customvalidation.service';
import { SigninService } from '../services/signin.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css'
})
export class ForgotpasswordComponent {
  private customerUserType: string = "";
  private ID: string = "";
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
  isResetPasswordSuccess:boolean = false;
  isResetPasswordError:boolean = false;
  validationMsgOTP: string = "";

  constructor(private signinService:SigninService,
  private router: Router,
  private fb: FormBuilder,
  private customValidator: CustomvalidationService,
  private encryption: EncryptionService
  ){}

  showError:boolean = false;

  forgotPasswordForm = this.fb.group({
    email: ['', [Validators.required, Validators.email], this.customValidator.userNameExists.bind(this.customValidator)],
    }
  );

  public login(): void{
    this.router.navigate(['']);
  }

  enterOTP(){
    let user:newuser = new newuser();
    user.Email = this.forgotPasswordForm.value["email"] as string;

    this.email = this.forgotPasswordForm.value["email"] as string;
    this.maskedEmail = this.censorEmail(this.email);

    this.signinService.GenerateForgotPasswordOTP<newuser>(user).subscribe({
      next:(data)=>{
        if(data.isSuccess){
          if(this.resendMailTimerInterval!== undefined){
            clearInterval(this.resendMailTimerInterval);
          }

          if(this.timerInterval !== undefined){
            clearInterval(this.timerInterval);
          }          
          
          this.ID = data.result;
          this.isVisibleModal = true;
          this.startOTPTime();
          this.startResendMailTime();
          this.isOTPSendSuccess=true;
        }
        else{
          this.isOTPSendSuccess=false;
        }
      },
      error: (e)=>{        
        this.isOTPSendSuccess=false;
      }
    });
  }

  SubmitOTP(){
    this.isResetPasswordError = false;

    let model = new submitOTP();
    model.OTP = this.OTP;
    model.ID = this.ID;

    this.signinService.SubmitForgotPasswordOTP<submitOTP>(model).subscribe({
      next:(data)=>{
        if(data.isSuccess){
          if(data.result.isSuccess){
            this.isResetPasswordError = false;
            this.isResetPasswordSuccess = true;
          }
          else{
            this.isResetPasswordError = true;
            this.isResetPasswordSuccess = false;
            this.validationMsgOTP=data.result.message;
          }
        }
        else{
          this.isResetPasswordError = true;
          this.isResetPasswordSuccess = false;
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
