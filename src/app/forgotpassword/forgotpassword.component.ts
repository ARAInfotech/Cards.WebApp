import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { newuser } from '../models/newuser';
import { submitOTP } from '../models/submitOTP';
import { CustomvalidationService } from '../services/customvalidation.service';
import { SigninService } from '../services/signin.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../general/dialog/dialog/dialog.component';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css'
})
export class ForgotpasswordComponent {
  private ID: string = "";
  private email: string = "";
  private timerInterval: any;
  private resendMailTimerInterval: any;

  isVisibleModal:boolean = false;
  OTP: string = "";
  disableOTP: boolean = false;
  isOTPSendSuccess:boolean = true;
  validationMsgOTP: string = "";  
  headerMessage:string = "";
  OtpValidity = 5; // in minutes
  ResendMailValidity = 2; // in minutes
  successPopupHeading:string="Done!";
  successPopupSubHeading:string="Your link to reset the password is shared to your registered email. Please check your inbox.";

  constructor(private signinService:SigninService,
  private router: Router,
  private fb: FormBuilder,
  private customValidator: CustomvalidationService,
  public dialog: MatDialog
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
    this.headerMessage = "Enter the 6 digit verification code received on your email <span><b>"+this.censorEmail(this.email)+"</b></span>";

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

  submitOTPEmitter(otp:string){
    this.OTP = otp;
    this.SubmitOTP();
  }

  resetOTPEmitter(){
    this.enterOTP()
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        header: this.successPopupHeading,
        subHeader: this.successPopupSubHeading
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.login();
    });
  }

  SubmitOTP(){
    let model = new submitOTP();
    model.OTP = this.OTP;
    model.ID = this.ID;

    this.signinService.SubmitForgotPasswordOTP<submitOTP>(model).subscribe({
      next:(data)=>{
        if(data.isSuccess){
          if(data.result.isSuccess){
            this.openDialog();
            this.isVisibleModal = false;
          }
          else{
            this.validationMsgOTP=data.result.message;
          }
        }
        else{
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
}
