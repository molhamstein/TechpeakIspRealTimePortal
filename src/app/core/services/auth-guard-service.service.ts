import { MainService } from './main.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { CanActivate, Route, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, ActivatedRoute } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanLoad, CanActivate {
  constructor(private mainServ: MainService, private router: Router, private c : ActivatedRoute) {
  }
  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    if (this.mainServ.loginServ.isLogin()) {
       return true;
    }
    // this.authService.setRedirectUrl(url);
    this.router.navigate(["/login"]);
    return false;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
     if (this.mainServ.loginServ.isLogin()) {
      return true;
    }
    // this.authService.setRedirectUrl(url);
    this.router.navigate(["/login"]);
   //window.location.reload();
    return false;
  }
} 