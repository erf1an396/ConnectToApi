import { Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthGuard } from './guard/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { UserManagmnetComponent } from './user-managmnet/user-managmnet.component';

import { SideDashboardComponent } from './side-dashboard/side-dashboard.component';
import { roleGuard } from './guard/role.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {
    path: 'transaction',
    component: TransactionDetailsComponent,
    canActivate :[AuthGuard]
  },

  {
    path :'dashboard' , component:SideDashboardComponent , canActivate:[AuthGuard]
  },

  {
    path: 'auth',
    component: AuthenticationComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
    
  },
  {path : 'user' , component: UserManagmnetComponent , canActivate:[AuthGuard  , roleGuard]},
  {path:'side' , component:SideDashboardComponent},
  

  { path: '**', component: PageNotFoundComponent },

  
  
];
