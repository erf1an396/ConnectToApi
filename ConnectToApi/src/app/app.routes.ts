import { Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthGuard } from './guard/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserManagmnetComponent } from './user-managmnet/user-managmnet.component';

export const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  {
    path: 'transaction',
    component: TransactionDetailsComponent,
    canActivate :[AuthGuard]
  },
  {
    path :'dashboard' , component:DashboardComponent
  },

  {
    path: 'auth',
    component: AuthenticationComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
    
  },
  {path : 'user' , component: UserManagmnetComponent , canActivate:[AuthGuard]},

  { path: '**', component: PageNotFoundComponent },
  
];
