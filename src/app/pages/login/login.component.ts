import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { WebSocketService } from '../../core/services/websocket.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  identifier = '';
  password = '';
  showPassword = false;
  loading = signal(false);
  error = signal('');

  constructor(
    private auth: AuthService,
    private ws: WebSocketService,
    private router: Router
  ) {}

  onLogin(): void {
    if (!this.identifier || !this.password) {
      this.error.set('Please fill in all fields.');
      return;
    }
    this.loading.set(true);
    this.error.set('');

    this.auth.login(this.identifier, this.password).subscribe({
      next: () => {
        this.ws.connect();
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.error.set(err?.error?.message || 'Invalid credentials. Please try again.');
        this.loading.set(false);
      }
    });
  }
}