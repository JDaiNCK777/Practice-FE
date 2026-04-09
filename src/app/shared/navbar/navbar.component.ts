import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="navbar">
      <div class="navbar-left">
        <button *ngIf="showBack" class="back-btn" (click)="goBack()">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M19 12H5M5 12l7-7M5 12l7 7"/>
          </svg>
        </button>
        <div *ngIf="!showBack" class="brand">
          <div class="brand-logo">
            <svg width="36" height="36" viewBox="0 0 36 36">
              <rect x="2" y="10" width="32" height="16" rx="2" fill="#8B0000"/>
              <circle cx="2" cy="18" r="4" fill="#F5F5F5"/>
              <circle cx="34" cy="18" r="4" fill="#F5F5F5"/>
              <circle cx="18" cy="18" r="8" fill="none" stroke="#D4A017" stroke-width="2.5"/>
              <polyline points="13,18 16.5,22 23,14" stroke="#D4A017" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M24 10 A8 8 0 0 1 26 14" stroke="#D4A017" stroke-width="2" fill="none" stroke-linecap="round"/>
              <polygon points="26,12 28,15 24,15" fill="#D4A017"/>
            </svg>
          </div>
          <span class="brand-name">Liceo Q-jump</span>
        </div>
      </div>

      <button class="menu-btn" (click)="toggleMenu.emit()">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <line x1="3" y1="6" x2="21" y2="6"/>
          <line x1="3" y1="12" x2="21" y2="12"/>
          <line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      </button>
    </header>
  `,
  styles: [`
    .navbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      background: #fff;
      border-bottom: 1px solid #eee;
      position: sticky;
      top: 0;
      z-index: 100;
      min-height: 60px;
    }
    .navbar-left { display: flex; align-items: center; gap: 10px; }
    .brand { display: flex; align-items: center; gap: 8px; }
    .brand-name { font-size: 16px; font-weight: 700; color: #1A1A1A; }
    .back-btn, .menu-btn {
      background: none; border: none; cursor: pointer;
      padding: 6px; color: #1A1A1A; display: flex; align-items: center;
    }
  `]
})
export class NavbarComponent {
  @Input() showBack = false;
  @Output() toggleMenu = new EventEmitter<void>();

  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}