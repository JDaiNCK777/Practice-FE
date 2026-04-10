import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { User } from '../models/queue.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private API = 'http://localhost:3000/api';
  currentUser = signal<User | null>(null);
  isLoggedIn = signal<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {
    const stored = localStorage.getItem('qjump_user');
    if (stored) {
      this.currentUser.set(JSON.parse(stored));
      this.isLoggedIn.set(true);
    }
  }

  login(identifier: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.API}/auth/login`, { identifier, password }).pipe(
      tap(res => {
        localStorage.setItem('qjump_token', res.token);
        localStorage.setItem('qjump_user', JSON.stringify(res.user));
        this.currentUser.set(res.user);
        this.isLoggedIn.set(true);
      })
    );
  }

  signup(data: Partial<User> & { password: string }): Observable<any> {
    return this.http.post<any>(`${this.API}/auth/register`, data).pipe(
      tap(res => {
        localStorage.setItem('qjump_token', res.token);
        localStorage.setItem('qjump_user', JSON.stringify(res.user));
        this.currentUser.set(res.user);
        this.isLoggedIn.set(true);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('qjump_token');
    localStorage.removeItem('qjump_user');
    this.currentUser.set(null);
    this.isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('qjump_token');
  }

  updateProfile(data: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.API}/auth/profile`, data).pipe(
      tap(updated => {
        this.currentUser.set(updated);
        localStorage.setItem('qjump_user', JSON.stringify(updated));
      })
    );
  }
}