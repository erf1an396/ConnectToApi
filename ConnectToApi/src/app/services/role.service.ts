import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private ApiUrl = 'https://localhost:7078/api/Expense';

  isGetRole = new BehaviorSubject<boolean>(false);

  constructor(private http:HttpClient) { }



  saveUserRoles(userId: string): void {

    const token = localStorage.getItem('JwtToken'); 
      
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}` 
          });


    this.http.get<string[]>(`${this.ApiUrl}/RolesById?userId=${userId}` , {headers}).subscribe({
      next: (roles) => {
        localStorage.setItem('roles', JSON.stringify(roles));
        this.isGetRole.next(true);
      },
      error: (error) => {
        console.error("Error fetching roles", error);
      },
      complete: () => {
        console.log("Fetching roles completed.");
        
      }
    });
  }

  getUserRoles():string[]{
    const roles = localStorage.getItem('roles');
    return roles ? JSON.parse(roles): [];
  }

  


  hasRole(role:string):boolean {
    return this.getUserRoles().includes(role);
  }

  logout():void{
    localStorage.removeItem('roles')
  }

  getStatus(){
    return this.isGetRole.getValue();
  }


}
