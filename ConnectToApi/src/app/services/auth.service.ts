import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route , ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private ApiUrl = 'https://localhost:7078/api/Auth';
  constructor(private http:HttpClient,private activatedRoute: ActivatedRoute, private router:Router) { }


  register(data:{username:string, email:string , password:string}):Observable<any>{

    return this.http.post(`${this.ApiUrl}/register`,data);

  }

  login(data:{username:string, password:string}):Observable<any>{

    return this.http.post(`${this.ApiUrl}/login`,data);

  }


  saveToken(token: string) {
    localStorage.setItem('jwtToken', token);
  }

  getToken() {
    return localStorage.getItem('jwtToken');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('jwtToken');
    this.router.navigate(['auth/login']);
  }
}
