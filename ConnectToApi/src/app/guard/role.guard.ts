import { CanActivate ,Router } from '@angular/router';
import { RoleService } from '../services/role.service';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})

export class roleGuard implements CanActivate {

  roles:string[] = [];

  constructor(private roleService:RoleService , private router:Router){}

  canActivate():boolean 
  {

    this.roles = JSON.parse(localStorage.getItem('roles') || '[]');
    console.log(this.roles)

    if(this.roles?.includes('admin')) {
      return true
    }
    else {
      this.router.navigate(['**']);
      return false
    }
  }

}