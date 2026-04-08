import { Routes } from '@angular/router';
import { UserDashboardComponent } from './Userdashboard/UserDashboard.component';
import { UserLoginComponent } from './Userdashboard/UserLogin/UserLogin.component';
import { UserCreateAccountComponent } from './Userdashboard/UserCreateAccount/UserCreateAccount.component';
import { UserMyQueueComponent } from './Userdashboard/UserMyQueue/UserMyQueue.component'
import { UserHelpComponent } from './Userdashboard/UserHelp/UserHelp.component'
import { UserGuideComponent } from './Userdashboard/UserGuide/UserGuide.component';


export const routes: Routes = [
    { path: '', component: UserDashboardComponent },
    { path: 'login', component: UserLoginComponent },
    { path: 'createuser', component: UserCreateAccountComponent },
    { path: 'myqueue', component: UserMyQueueComponent },
    { path: 'help', component: UserHelpComponent},
    { path: 'guide', component: UserGuideComponent }
];
