import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http'
import { AuthService } from './auth.service';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { Observable, throwError, BehaviorSubject, of } from 'rxjs';
import { TokenResponse } from '../models/tokenResponse';
import { error } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  private authService: AuthService
  private isRefreshing = false
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null)

  constructor(
    private injector: Injector
  ) {
    this.authService = this.injector.get(AuthService)
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    let accessToken = this.authService.getToken()

    if(accessToken && request.url != this.authService.AUTH_BASE+"login"){
      request = TokenInterceptorService.addToken(request, accessToken)
    }

    return next.handle(request)
      .pipe(
        // catchError(error => {
        //   if(error instanceof HttpErrorResponse){
        //     if(error.status === 401 && request.url != this.authService._tokenURL+"token"){
        //       return this.handle401Error(request, next)
        //     }else if(error.status === 400 && request.url === this.authService._tokenURL+"token"){
        //       this.authService.deleteTokens()
        //       return throwError(error.message)
        //     }else{
        //       return throwError(error.status)
        //     }
        //   }else{
        //     console.log(error)
        //     return throwError(error.status)
        //   }
        // })
      )
  }

  private static addToken(request: HttpRequest<any>, token: string):  HttpRequest<any>{

    return request.clone({
      setHeaders: {
        Authorization: 'Bearer '+token
      }
    })
  }

  // private handle401Error(request: HttpRequest<any>, next: HttpHandler){

  //   if(!this.isRefreshing){

  //     this.isRefreshing = true
  //     this.refreshTokenSubject.next(null)

  //     return this.authService.refreshToken()
  //       .pipe(
  //         switchMap((token: TokenResponse) => {

  //           this.isRefreshing = false
  //           this.refreshTokenSubject.next(token.access_token)
  //           return next.handle(TokenInterceptorService.addToken(request, token.access_token))
  //         }),
  //         catchError(error => {
  //           this.isRefreshing = false
  //           return of(null)
  //         })
  //       )
  //   }else{

  //     return this.refreshTokenSubject.pipe(
  //       filter(token => token != null),
  //       take(1),
  //       switchMap(accessToken => {
  //         return next.handle(TokenInterceptorService.addToken(request, accessToken))
  //       })
  //     )
  //   }
  // }
}
