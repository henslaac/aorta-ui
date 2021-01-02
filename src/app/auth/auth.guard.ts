import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const expectedRoles: string[] = route.data.expectedRoles

    if(expectedRoles === null){
      if(this.authService.isLoggedIn()){
        return true
      }else{
        this.router.navigate(['/login'])
        return false
      }
    }else{
      if(this.authService.isLoggedIn() && this.authService.hasExpectedRole(expectedRoles)){
        return true
      }else{
        this.router.navigate(['/login'])
        return false
      }
    }
  }

  private getResolvedUrl(route: ActivatedRouteSnapshot): string{
    return route.pathFromRoot
                .map(v => v.url.map(segment => segment.toString()).join('/'))
                .join('/')
  }
  
}
