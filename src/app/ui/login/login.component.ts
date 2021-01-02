import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { LoginUser } from 'src/app/models/loginUser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginMessage: string = ""
  public loginUserData: LoginUser

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.loginUserData = new LoginUser
  }

  ngOnInit(): void {
  }

  login(){
    this.loginMessage = ""
    this.authService.loginUser(this.loginUserData)
      .subscribe(
        res => {
          this.router.navigate(['/dashboard'])
        },err => {
          this.loginMessage = "Invalid email or password"
          console.error(err)
        }
      )
  }

}
