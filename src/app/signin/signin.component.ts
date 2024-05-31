import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomvalidationService } from '../services/customvalidation.service';
import { newuser } from '../models/newuser';
import { SigninService } from '../services/signin.service';
import { EncryptionService } from '../services/EncryptionService';
import { submitOTP } from '../models/submitOTP';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../general/dialog/dialog/dialog.component';

@Component({
selector: 'app-signin',
templateUrl: './signin.component.html',
styleUrl: './signin.component.css'
})
export class SigninComponent implements OnInit{

  private customerUserType: string = "";
  private tempUserID: string = "";
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
  successPopupHeading:string="Welcome Aboard!";
  successPopupSubHeading:string="Your account has been succesfully created!";

  constructor(private signinService:SigninService,
  private router: Router,
  private fb: FormBuilder,
  private customValidator: CustomvalidationService,
  private encryption: EncryptionService,
  private dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.getCustomerUserType();
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
    this.headerMessage = "Enter the 6 digit verification code received on your email <span><b>"+this.censorEmail(this.email)+"</b></span>";

    this.signinService.GenerateSignInOTP<newuser>(user).subscribe({
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

  submitOTPEmitter(otp:string){
    this.OTP = otp;
    this.SubmitOTP();
  }

  resetOTPEmitter(){
    this.enterOTP()
  }

  SubmitOTP(){
    let model = new submitOTP();
    model.OTP = this.OTP;
    model.UserID = this.tempUserID;

    this.signinService.SubmitSignInOTP<submitOTP>(model).subscribe({
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

