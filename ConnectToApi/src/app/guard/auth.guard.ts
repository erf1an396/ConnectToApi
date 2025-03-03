import { Injectable } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  RouterStateSnapshot,
} from '@angular/router';
import { Router } from '@angular/router';
import { jwtDecode, JwtDecodeOptions } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router , @Inject(PLATFORM_ID) private platformId: any) {}

  canActivate(): boolean {
    const token = localStorage.getItem('JwtToken');
    
    if (token && !this.isTokenExpire(token)) {
      
      return true;
      
    } else {
      localStorage.removeItem('JwtToken');
      this.router.navigate(['auth/login']); 
      return false;
    }
  }


  private isTokenExpire(token:string) :boolean {
    try 
    {
      const decode :any = jwtDecode(token)
      console.log(decode)
      const exp = decode.exp * 1000 
      return exp < Date.now()

    }
    catch(error) {
      return true
      console.log(error)
    }
  }
}
