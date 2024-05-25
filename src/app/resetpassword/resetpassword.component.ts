import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomvalidationService } from '../services/customvalidation.service';
import { faCircleCheck, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { ResetPasswordModel } from '../models/resetPassword';
import { SigninService } from '../services/signin.service';
import { EncryptionService } from '../services/EncryptionService';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.css'
})

export class ResetpasswordComponent {
  public id: string = "";
  showError:boolean = false;
  isUserRegistrationSuccess:boolean = false;
  faCircleCheck = faCircleCheck;
  isPasswordResetSuccess:boolean = true;
  
  constructor(private route: ActivatedRoute,
    private customValidator: CustomvalidationService,
    private router: Router,
    private signinService:SigninService,
    private encryption: EncryptionService,
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
        }
        else{
        }
      },
      error: (e)=>{        
        this.isPasswordResetSuccess=false;
      }
    });
  }

  public login(): void{
    this.router.navigate(['']);
  }
}
