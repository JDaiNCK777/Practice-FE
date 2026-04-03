import { Routes } from '@angular/router';
import { UserDashboardComponent } from './Userdashboard/UserDashboard.component';
import { UserLoginComponent } from './Userdashboard/UserLogin/UserLogin.component';
import { UserCreateAccountComponent } from './Userdashboard/UserCreateAccount/UserCreateAccount.component';


export const routes: Routes = [
    { path: '', component: UserDashboardComponent },
    { path: 'login', component: UserLoginComponent },
    { path: 'createuser', component: UserCreateAccountComponent },
];
