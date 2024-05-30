import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css'
})
export class OtpComponent implements OnInit{

  ngOnInit(): void {
    this.oTPTimer(this.OTPValidityTimer);
    this.disableResend = true;
    this.resendMailTimer(this.ResendValidityTimer);
  }

  ngOnChanges(changes: SimpleChanges) 
  {   
    for (let propName in changes) 
    {
        if (changes['OTPValidationMsg'] && this.OTPValidationMsg) 
        {
          this.validationMsgOTP = this.OTPValidationMsg;

          this.isUserRegistrationError = !(this.validationMsgOTP == "");
        }
    }
  }

  constructor(){}

  @Output() SubmitOTP:EventEmitter<string> = new EventEmitter<string>();
  @Output() ResendOTP:EventEmitter<string> = new EventEmitter<string>();

  @Input() HeaderMessage!:string;
  @Input() OTPValidityTimer!:number;
  @Input() ResendValidityTimer!:number;
  @Input() OTPValidationMsg!:string;
  
  private timerInterval: any;
  private resendMailTimerInterval: any;

  maskedEmail:string ="";
  faInfoCircle=faInfoCircle;
  OTPDanger: boolean = false;
  displayOTP: any;
  isUserRegistrationError:boolean = false;
  validationMsgOTP: string = "";
  enableOTPSubmit:boolean = false;
  disableResend: boolean = false;
  resendMailTooltip: string = "";
  OTP: string = "";
  disableOTP: boolean = false;

  

  onOtpChange(value: string){
    if(value.length == 6 ){
      this.OTP = value;
      this.enableOTPSubmit = true;
    }
    else{
      this.enableOTPSubmit = false;}
  }

  submitOTP(){
    this.SubmitOTP.emit(this.OTP);
  }

  resendOTP(){

    if(this.resendMailTimerInterval!== undefined){
      clearInterval(this.resendMailTimerInterval);
    }

    if(this.timerInterval !== undefined){
      clearInterval(this.timerInterval);
    }
    
    this.oTPTimer(this.OTPValidityTimer);
    this.disableResend = true;
    this.resendMailTimer(this.ResendValidityTimer);

    this.ResendOTP.emit();
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
