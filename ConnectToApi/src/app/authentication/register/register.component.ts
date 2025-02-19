import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { EmailValidator, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule , CommonModule],
  templateUrl:'./register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm :FormGroup ;

  // username='';
  // email='';
  // password='';
  

  constructor(private authService:AuthService , public router:Router , private fb:FormBuilder){
      this.registerForm = this.fb.group({
        username: ['', Validators.required],
        email:['',Validators.required , Validators.email],
        password:['', 
          [
            Validators.required,
            Validators.minLength(8) , 
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
          ]
        ]
      })
  }

  register(){

    if(this.registerForm.invalid){
      alert("'لطفاً اطلاعات را به‌درستی وارد کنید.'");
      return
    }

     const formData = this.registerForm.value ;

    this.authService.register(formData).subscribe({
      next:() => {
        alert('ثبت‌ نام با موفقیت انجام شد! لطفاً وارد شوید.');
        
        this.router.navigate(['auth/login']);
      },
      error:err=>alert(`خطا: ${err.error.message || 'مشکلی پیش آمد'}`)

    })
  }
}
