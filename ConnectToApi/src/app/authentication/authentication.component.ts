import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';

import { RegisterComponent } from './register/register.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-authentication',
  imports: [RouterOutlet],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css'
})
export class AuthenticationComponent {



}
