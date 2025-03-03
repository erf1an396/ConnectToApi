import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RoleService } from '../../services/role.service';
import { jwtDecode } from 'jwt-decode';



@Component({
  selector: 'app-login',
  imports: [FormsModule , CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private ApiUrl = 'https://localhost:7078/api/Auth';
 
  username:string = '';
  password:string = '';

  constructor(private authService:AuthService , public router:Router , private http: HttpClient , private roleService:RoleService  )
  {

  }

  login(){

    const data = {
      username: this.username,
      password: this.password
    };
  

  //  console.log(data)
  //   this.http.post(`${this.ApiUrl}/login`,data).subscribe({
  //     next:(res:any) => {
        

  //       localStorage.setItem('JwtToken', res.token) ;
        
  //       this.router.navigate(['/dashboard']) ; 
  //       console.log(res.token);
        

  //     },
  //     error: err => alert(`خطا: ${err.error.message || 'مشکلی پیش آمد'}`)
  //   })



    this.authService.login({username:this.username, password:this.password}).subscribe({
      next:(res) =>{
        this.authService.saveToken(res.token);

        const UserId = this.getUserIdFromToken();

        this.roleService.saveUserRoles(UserId!);
        
        localStorage.setItem('JwtToken', res.token) ;
        
        this.roleService.isGetRole.subscribe(x=>{

          this.router.navigate(['/dashboard']);
          
        })
       
        
      },
      error: err => alert(` ${err.error.message || 'نام کاربری یا رمز عبور نادرست است'}`)
    });

    
  
}

  getUserIdFromToken():string |null {
    const token = localStorage.getItem('JwtToken')

  
      if(token)
      {

        const decodedToken: any = jwtDecode(token);
        const UserId = decodedToken['nameid'];
        return UserId ;

      }
      
      return null;
    }

}



