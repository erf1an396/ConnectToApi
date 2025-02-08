import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';


@Injectable({
  providedIn:'root',
})


export class AuthGuard implements CanActivate {

  constructor(private router:Router) {}


canActivate(): boolean  {
    const isLoggedIn = !! localStorage.getItem('JwtToken');

    if(!isLoggedIn)
    {
      this.router.navigate(['auth/login'])
      return false
    }

    return true

}


}