import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  fullName = '';
  studentId = '';
  email = '';
  password = '';
  confirmPassword = '';
  showPassword = false;
  showConfirm = false;
  loading = signal(false);
  error = signal('');

  constructor(private auth: AuthService, private router: Router) {}

  onSignup(): void {
    if (!this.fullName || !this.studentId || !this.email || !this.password) {
      this.error.set('Please fill in all fields.');
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.error.set('Passwords do not match.');
      return;
    }
    this.loading.set(true);
    this.error.set('');

    this.auth.signup({
      fullName: this.fullName,
      studentId: this.studentId,
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => this.router.navigate(['/home']),
      error: (err) => {
        this.error.set(err?.error?.message || 'Registration failed. Please try again.');
        this.loading.set(false);
      }
    });
  }
}