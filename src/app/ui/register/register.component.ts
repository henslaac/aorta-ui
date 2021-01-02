import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { SignupUser } from 'src/app/models/signupUser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerMessage: string = ""
  public signUpUserData: SignupUser

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.signUpUserData = new SignupUser
  }

  ngOnInit(): void {
  }

  doChecks(): boolean{
    if(this.signUpUserData.companyName == undefined){
      this.registerMessage = "Please enter company name"
      return false
    }
    if(this.signUpUserData.companyRegistration == undefined){
      this.registerMessage = "Please enter company registration number"
      return false
    }
    if(this.signUpUserData.email == undefined || !this.validEmail(this.signUpUserData.email)){
      this.registerMessage = "Please enter valid email address"
      return false
    }
    if(this.signUpUserData.password == undefined){
      this.registerMessage = "Please enter password"
      return false
    }
    if(this.signUpUserData.password != this.signUpUserData.confirmPassword){
      this.registerMessage = "Password and confirmation do not match"
      return false
    }
    return true
  }

  validEmail(email: string): boolean{
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  signup(){
    this.registerMessage = ""
    if(this.doChecks()){
      this.authService.registerUser(this.signUpUserData)
      .subscribe(
        res => {
          this.router.navigate(['/login'])
        },err => {
          this.registerMessage = "An error occured while creating your account. Please try again later."
          console.error(err)
        }
      )
    }
  }

}
