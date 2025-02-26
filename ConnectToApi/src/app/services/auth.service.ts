import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route , ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { error } from 'node:console';
import { json } from 'node:stream/consumers';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private ApiUrl = 'http://localhost:5091/api/Auth';
  constructor(private http:HttpClient,private activatedRoute: ActivatedRoute, private router:Router) { }


  register(data:{username:string, email:string , password:string}):Observable<any>{

    console.log(data)
    return this.http.post(`${this.ApiUrl}/register`,data);
    

  }

  login(data:{username:string, password:string}):Observable<any>{

    return this.http.post(`${this.ApiUrl}/login`,data);

  }


  saveToken(token: string) {
    localStorage.setItem('JwtToken', token);


  }

 

  getUserRoles():string[] {
    const roles = localStorage.getItem('roles');
    return roles ? JSON.parse(roles): [];
  }

  

  getToken() {
    return localStorage.getItem('JwtToken');
  }


  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('jwtToken');
    this.router.navigate(['auth/login']);
  }
}
