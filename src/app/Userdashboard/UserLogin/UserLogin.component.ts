import { Component } from '@angular/core';

@Component({
    selector: 'app-user-login',
    templateUrl: './UserLogin.component.html',
    styleUrl: './UserLogin.component.scss'
})

export class UserLoginComponent {
  email: string = '';
  password: string = '';
}