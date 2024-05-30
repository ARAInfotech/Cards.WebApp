import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomvalidationService } from '../services/customvalidation.service';
import { ResetPasswordModel } from '../models/resetPassword';
import { SigninService } from '../services/signin.service';
import { EncryptionService } from '../services/EncryptionService';
import { DialogComponent } from '../general/dialog/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.css'
})

export class ResetpasswordComponent {
  public id: string = "";
  showError:boolean = false;
  isPasswordResetSuccess:boolean = true;
  validationMsg:string = "";
  linkExpired: boolean = false;
  successPopupHeading:string="Password changed!";
  successPopupSubHeading:string="Your password has been changed successfully.";
  
  constructor(private route: ActivatedRoute,
    private customValidator: CustomvalidationService,
    private router: Router,
    private signinService:SigninService,
    private encryption: EncryptionService,
    private dialog: MatDialog,
    private fb: FormBuilder) {}

  resetPasswordForm = this.fb.group({  
    password: ['', [Validators.required], this.customValidator.passwordPatternValidator.bind(this.customValidator)],
    confirmPassword: ['', [Validators.required]]
    },
    {
    validator: this.customValidator.MatchPassword('password', 'confirmPassword'),
    }
  );

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;

    if(this.id == null){
      this.id="not allowed";
    }
  }

  ResetPassword(){
    let resetPassword: ResetPasswordModel = new ResetPasswordModel();

    resetPassword.ID = this.id;
    resetPassword.Password=this.encryption.encryptUsingTripleDES(this.resetPasswordForm.value["password"] as string, false);

    this.signinService.SubmitResetPassword<ResetPasswordModel>(resetPassword).subscribe({
      next:(data)=>{
        if(data.isSuccess){
          this.openDialog();
          this.validationMsg="";
        }
        else{
          this.validationMsg=data.errorMessage;
          if(this.validationMsg == 'Password update request expired.'){
            this.linkExpired = true;
            // this.validationMsg+=" Click <a (click)='forgot()' class='login__forgot'>here</a>"
          }
        }
      },
      error: (e)=>{        
        this.isPasswordResetSuccess=false;
      }
    });
  }

  forgot(): void{debugger
    this.router.navigate(['/forgotPassword']);
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

  public login(): void{
    this.router.navigate(['']);
  }
}
