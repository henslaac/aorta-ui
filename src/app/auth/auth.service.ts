import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http'
import { TokenResponse } from '../models/tokenResponse'
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt'
import { of, Observable, throwError } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { CustomEncoder } from '../util/customEncoder';
import {LoaderService} from "../services/loader.service";
import { LoginUser } from '../models/loginUser';
import { SignupUser } from '../models/signupUser';

const GRANT_TYPE_PASSWORD = "password"
const GRANT_TYPE_REFRESH = "refresh_token"
const CLIENT_ID = "aorta-core"
const CLIENT_SECRET = "6f2c72d6-014f-4802-8c37-5030543c5586"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private roles: string[] = []
  public AUTH_BASE = "/user/"
  helper = new JwtHelperService()

  constructor(
    private http: HttpClient,
    private router: Router,
    private loaderService: LoaderService,

  ) {
    // this.roles = JSON.parse(localStorage.getItem('roles')!)
  }

  loginUser(user: LoginUser): Observable<boolean>{
    const payload = new HttpParams({encoder: new CustomEncoder()})
        .set('username', user.username!)
        .set('password', user.password!)
        .set('grant_type', GRANT_TYPE_PASSWORD)
        .set('client_id', CLIENT_ID)
        .set('client_secret', CLIENT_SECRET)

    return this.http.post<TokenResponse>(this.AUTH_BASE+"login", payload)
      .pipe(
        tap(tokenResponse => {
          this.saveTokens(tokenResponse.access_token, tokenResponse.refresh_token)
          this.updateRoles()
        }),
        mapTo(true),
        catchError(error => {
          throw(error)
        })
      )
  }

  registerUser(signUpUserData: SignupUser): Observable<boolean>{
    const payload = new HttpParams({encoder: new CustomEncoder()})
      .set('username', signUpUserData.email!)
      .set('password', signUpUserData.password!)
      .set('first_name', signUpUserData.companyName!)
      .set('last_name', signUpUserData.companyRegistration!)
      .set('email', signUpUserData.email!)

    return this.http.post<any>(this.AUTH_BASE+"register", payload)
      .pipe(
        mapTo(true),
        catchError(error => {
          throw(error)
        })
      )
  }

  // refreshToken(): Observable<TokenResponse>{
  //   const payload = new HttpParams()
  //       .set('grant_type', GRANT_TYPE_REFRESH)
  //       .set('client_id', CLIENT_ID)
  //       .set('refresh_token', this.getRefreshToken())

  //   return this.http.post<TokenResponse>(this._tokenURL+"token", payload)
  //     .pipe(
  //       tap(tokenResponse => this.saveTokens(tokenResponse.access_token, tokenResponse.refresh_token)),
  //       catchError(error => {
  //         console.error(error);

  //         this.router.navigateByUrl('/login')
  //         return of(null)
  //       })
  //     )
  // }

  doLogout(){
    this.deleteTokens()
    this.router.navigate(['/home'])
  }

  private updateRoles(){
    let accessToken = this.getToken()
    let decodedToken = this.helper.decodeToken(accessToken!)
    this.roles = decodedToken['roles'];
    localStorage.setItem('roles', JSON.stringify(this.roles))
  }

  hasExpectedRole(expectedRoles: string[]): boolean{
    let result = false
    console.log(this.roles)
    expectedRoles.forEach((exRole) => {
      if(this.roles.includes(exRole))
        result = true
    })
    return result
  }

  isDriver(): boolean{
    return this.roles.includes("Driver")
  }

  isAdmin(): boolean{
    return this.roles.includes("Administrator")
  }

  getLoggedInUserName(): string{
    return this.helper.decodeToken(this.getToken()!)['name']
  }

  isLoggedIn(){
    let accessToken = this.getToken()
    let refreshToken = this.getRefreshToken()
    if(accessToken == null || refreshToken == null ){
      return false
    }
    if(this.helper.isTokenExpired(accessToken)){
      return !this.helper.isTokenExpired(refreshToken);
    }else{
      return true
    }
  }

  deleteTokens(){
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('roles')
  }

  getUserId(){
    return this.helper.decodeToken(this.getToken()!)['entity-id']
  }

  getToken(){
    return localStorage.getItem('access_token')
  }

  getRefreshToken(){
    return localStorage.getItem('refresh_token')
  }

  saveTokens(accessToken: string, refreshToken: string){
    localStorage.setItem('access_token', accessToken)
    localStorage.setItem('refresh_token', refreshToken)
  }

  getEmail(): string{
    return this.helper.decodeToken(this.getToken()!)["email"]
  }

}
