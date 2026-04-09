import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="bottom-nav">
      <a routerLink="/home" routerLinkActive="active" class="nav-item">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
        <span>Home</span>
      </a>

      <a routerLink="/my-queue" routerLinkActive="active" class="nav-item">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="2" y="7" width="20" height="10" rx="2"/>
          <circle cx="7" cy="12" r="1.5" fill="currentColor"/>
          <circle cx="17" cy="12" r="1.5" fill="currentColor"/>
          <line x1="10" y1="10" x2="14" y2="10"/><line x1="10" y1="14" x2="14" y2="14"/>
        </svg>
        <span>My Queue</span>
      </a>

      <a routerLink="/profile" routerLinkActive="active" class="nav-item">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
        <span>Profile</span>
      </a>
    </nav>
  `,
  styles: [`
    .bottom-nav {
      position: fixed; bottom: 0; left: 50%; transform: translateX(-50%);
      width: 100%; max-width: 430px;
      display: flex; justify-content: space-around; align-items: center;
      background: #fff; border-top: 1px solid #E0E0E0;
      padding: 8px 0 12px; z-index: 100;
    }
    .nav-item {
      display: flex; flex-direction: column; align-items: center; gap: 4px;
      text-decoration: none; color: #999; font-size: 11px; font-weight: 500;
      padding: 4px 20px; transition: color 0.2s;
    }
    .nav-item.active, .nav-item:hover { color: #8B0000; }
  `]
})
export class BottomNavComponent {}