import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter, Routes } from '@angular/router';
import { LoginComponent } from './app/authentication/login/login.component';
import { register } from 'module';
import { RegisterComponent } from './app/authentication/register/register.component';



bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
