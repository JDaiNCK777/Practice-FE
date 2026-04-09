import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { SideMenuComponent } from '../../shared/side-menu/side-menu.component';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [CommonModule, NavbarComponent, SideMenuComponent],
  template: `
    <app-navbar [showBack]="true" (toggleMenu)="menuOpen.set(true)" />
    <app-side-menu [open]="menuOpen()" (close)="menuOpen.set(false)" />
    <main class="help-page">
      <h2 class="page-title">Help</h2>
      <p class="help-body">
        For assistance, please contact the Registrar's Office or approach any school staff on duty.
      </p>
    </main>
  `,
  styles: [`
    .help-page { padding: 0 20px; background: #fff; min-height: 100vh; }
    .page-title { font-size: 20px; font-weight: 700; padding: 16px 0 8px; border-bottom: 1px solid #e0e0e0; margin-bottom: 16px; }
    .help-body { font-size: 14px; color: #555; line-height: 1.7; }
  `]
})
export class HelpComponent {
  menuOpen = signal(false);
}