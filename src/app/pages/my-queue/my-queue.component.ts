import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { BottomNavComponent } from '../../shared/bottom-nav/bottom-nav.component';
import { SideMenuComponent } from '../../shared/side-menu/side-menu.component';
import { QueueService } from '../../core/services/queue.service';

@Component({
  selector: 'app-my-queue',
  standalone: true,
  imports: [CommonModule, NavbarComponent, BottomNavComponent, SideMenuComponent],
  templateUrl: './my-queue.component.html',
  styleUrls: ['./my-queue.component.scss']
})
export class MyQueueComponent implements OnInit {
  menuOpen = signal(false);
  loading = signal(false);

  constructor(public queueService: QueueService) {}

  ngOnInit(): void {
    this.loading.set(true);
    this.queueService.getCurrentQueue().subscribe({ next: () => this.loading.set(false), error: () => this.loading.set(false) });
    this.queueService.getQueueHistory().subscribe();
  }

  get current() { return this.queueService.currentQueue(); }
  get history() { return this.queueService.queueHistory(); }

  statusClass(status: string): string {
    const map: Record<string, string> = {
      served: 'status-green',
      waiting: 'status-orange',
      serving: 'status-orange',
      missed: 'status-red',
      cancelled: 'status-grey'
    };
    return map[status] ?? '';
  }

  statusLabel(status: string): string {
    return status.charAt(0).toUpperCase() + status.slice(1);
  }
}