import { Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';
import { AuthenticationComponent } from './authentication/authentication.component';

export const routes: Routes = [
    { path: '', redirectTo: '/auth/login', pathMatch: 'full' } ,
    {path:'transaction' , component:TransactionDetailsComponent},

    { path: 'auth', component: AuthenticationComponent, children: [
        { path: 'login', component: LoginComponent },
        { path: 'register', component: RegisterComponent }
    ] },

    { path: '**', redirectTo: 'auth/login' , pathMatch:'full' } 
    

];
