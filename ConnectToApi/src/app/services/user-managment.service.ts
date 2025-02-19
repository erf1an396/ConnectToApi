import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class UserManagmentService {

  

  private apiUrl = "https://localhost:7078/api/user";
  private token = localStorage.getItem('JwtToken');

  constructor(private http : HttpClient) { }


  private getHeaders(){
    return new HttpHeaders({
      'Authorization' : `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });
  }



   getUsers():Observable<any[]> {
      const token = localStorage.getItem('JwtToken');
      const headers = new HttpHeaders( {
        'Authorization' : `Bearer ${this.token}`
      });
    
    return this.http.get<any[]>(`${this.apiUrl}/users`, {headers:headers});
  }

  getRoles():Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/roles` ,{headers:this.getHeaders()}  );

  }

  addRole(roleName:string):Observable<void> {
    console.log(roleName)
    return this.http.post<void>(`${this.apiUrl}/roles/add?roleName=${roleName}`  ,"" , {headers:this.getHeaders()});
  }


  deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/delete/${userId}`,{ headers: this.getHeaders() });
  }
  
  assignRole(userId: string, roleName: string): Observable<void> {
   
    return this.http.post<void>(`${this.apiUrl}/assign-role`, { userId , roleName }, { headers: this.getHeaders() });
  }


  removeRole(userId: string, roleName: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/remove-role`, { userId, roleName }, { headers: this.getHeaders() });
  }


  getRoleByUserId(userId:string):Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/RolesById?userId=${userId}`, {headers:this.getHeaders()});
  }

}
