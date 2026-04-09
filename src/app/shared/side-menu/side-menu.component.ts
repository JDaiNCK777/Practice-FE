import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="overlay" *ngIf="open" (click)="close.emit()"></div>
    <div class="side-menu" [class.open]="open">
      <button class="close-arrow" (click)="close.emit()">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M5 12h14M5 12l7-7M5 12l7 7"/>
        </svg>
      </button>

      <div class="menu-items">
        <button class="menu-item" (click)="navigate('guide')">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
          </svg>
          Guide
        </button>

        <button class="menu-item" (click)="navigate('help')">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          Help
        </button>

        <button class="menu-item logout" (click)="onLogout()">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Logout
        </button>
      </div>
    </div>
  `,
  styles: [`
    .overlay {
      position: fixed; inset: 0; background: rgba(0,0,0,0.4);
      z-index: 200; animation: fadeIn 0.2s ease;
    }
    .side-menu {
      position: fixed; top: 0; right: -300px; width: 280px; height: 100%;
      background: #F0F0F0; z-index: 300; padding: 24px 16px;
      transition: right 0.3s ease; border-radius: 16px 0 0 16px;
    }
    .side-menu.open { right: 0; }
    .close-arrow {
      background: none; border: none; cursor: pointer;
      padding: 6px; margin-bottom: 20px; display: flex;
    }
    .menu-items { display: flex; flex-direction: column; gap: 12px; }
    .menu-item {
      display: flex; align-items: center; gap: 14px;
      width: 100%; padding: 16px 20px;
      background: #8B0000; color: #fff;
      border: 2px solid #D4A017; border-radius: 10px;
      font-size: 16px; font-weight: 600; cursor: pointer;
      text-align: left; transition: background 0.2s;
    }
    .menu-item:hover { background: #6B0000; }
    .menu-item.logout { background: #8B0000; }
    @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
  `]
})
export class SideMenuComponent {
  @Input() open = false;
  @Output() close = new EventEmitter<void>();

  constructor(private router: Router, private auth: AuthService) {}

  navigate(page: string): void {
    this.router.navigate([`/${page}`]);
    this.close.emit();
  }

  onLogout(): void {
    this.auth.logout();
    this.close.emit();
  }
}