import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule , CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  username='';
  email='';
  password='';

  constructor(private authService:AuthService , public router:Router){}

  register(){
    this.authService.register({username:this.username,email:this.email,password:this.password}).subscribe({
      next:() => {
        alert('ثبت‌ نام با موفقیت انجام شد! لطفاً وارد شوید.');
        this.router.navigate(['auth/login']);
      },
      error:err=>alert(`خطا: ${err.error.message || 'مشکلی پیش آمد'}`)

    })
  }
}
