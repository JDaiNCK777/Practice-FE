import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { SideMenuComponent } from '../../shared/side-menu/side-menu.component';

@Component({
  selector: 'app-guide',
  standalone: true,
  imports: [CommonModule, NavbarComponent, SideMenuComponent],
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.scss']
})
export class GuideComponent {
  menuOpen = signal(false);

  steps = [
    {
      text: 'You only have two options with only one tap, the button below will get your Queue number instantly and the arrow above shows other options.'
    },
    {
      text: 'Once you received your queue number, you may wait till the current number reached to your queue number. You can check your queue status to see who you\'re ahead and the estimated time when it reaches your queue number.'
    },
    {
      text: 'Once your queue number is called, you must proceed to the Rodelsa Hall immediately. If you missed your Queue, you may try again and for some students who will try to mess with the system will receive a cooldown penalty of 1 day.'
    },
    {
      text: 'When there are no Queue numbers available, that means the remaining numbers are occupied and this will reset at (Maximum queue numbers).'
    }
  ];
}