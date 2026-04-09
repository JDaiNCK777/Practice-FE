import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { BottomNavComponent } from '../../shared/bottom-nav/bottom-nav.component';
import { SideMenuComponent } from '../../shared/side-menu/side-menu.component';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, BottomNavComponent, SideMenuComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  menuOpen = signal(false);
  editMode = signal(false);
  saving = signal(false);

  age = '';
  sex = '';
  birthday = '';
  courseYear = '';

  constructor(public auth: AuthService) {}

  ngOnInit(): void {
    const u = this.auth.currentUser();
    if (u) {
      this.age = u.age?.toString() ?? '';
      this.sex = u.sex ?? '';
      this.birthday = u.birthday ?? '';
      this.courseYear = u.courseYear ?? '';
    }
  }

  get user() { return this.auth.currentUser(); }

  saveProfile(): void {
    this.saving.set(true);
    this.auth.updateProfile({
      age: this.age ? +this.age : undefined,
      sex: this.sex,
      birthday: this.birthday,
      courseYear: this.courseYear
    }).subscribe({
      next: () => { this.editMode.set(false); this.saving.set(false); },
      error: () => this.saving.set(false)
    });
  }
}