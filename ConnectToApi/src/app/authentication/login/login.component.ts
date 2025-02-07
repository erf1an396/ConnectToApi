import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



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

  constructor(private authService:AuthService , public router:Router , private http: HttpClient  )
  {

  }

  login(){

    const data = {
      username: this.username,
      password: this.password
    };
  

   console.log(data)
    this.http.post(`${this.ApiUrl}/login`,data).subscribe({
      next:(res:any) => {
        
        localStorage.setItem('JwtToken', res.token) ;
        this.router.navigate(['/transaction']) ; 
        console.log(res.token)
      },
      error: err => alert(`خطا: ${err.error.message || 'مشکلی پیش آمد'}`)
    })

   
    // this.authService.login({username:this.username, password:this.password}).subscribe({
    //   next:(res) =>{
    //     this.authService.saveToken(res.token);
    //     this.router.navigate(['/transaction'])
    //   },
    //   error: err => alert(`خطا: ${err.error.message || 'مشکلی پیش آمد'}`)
    // });
  
}
}



