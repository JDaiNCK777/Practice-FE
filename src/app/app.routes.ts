import { Routes } from '@angular/router';
import { UserDashboardComponent } from './Userdashboard/UserDashboard.component';
import { UserLoginComponent } from './Userdashboard/UserLogin/UserLogin.component';


export const routes: Routes = [
    { path: 'dashboard', component: UserDashboardComponent },
    { path: '', component: UserLoginComponent },
    //{ path: 'create-account', component: UserCreateAccountComponent },
];
