import { Component } from '@angular/core';

@Component({
    selector: 'app-user-create-account',
    templateUrl: './UserCreateAccount.component.html',
    styleUrl: './UserCreateAccount.component.scss'
})
export class UserCreateAccountComponent {
  email: string = '';
  password: string = '';

  login() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);

    //connect to backend
  }
}
