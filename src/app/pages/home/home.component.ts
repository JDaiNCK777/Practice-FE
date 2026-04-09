import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { BottomNavComponent } from '../../shared/bottom-nav/bottom-nav.component';
import { SideMenuComponent } from '../../shared/side-menu/side-menu.component';
import { QueueService } from '../../core/services/queue.service';
import { WebSocketService } from '../../core/services/websocket.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent, BottomNavComponent, SideMenuComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  menuOpen = signal(false);
  loading = signal(false);
  actionLoading = signal(false);

  constructor(
    public queueService: QueueService,
    private ws: WebSocketService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ws.connect();
    this.loading.set(true);
    this.queueService.getHomeState().subscribe({
      next: () => this.loading.set(false),
      error: () => this.loading.set(false)
    });
    this.queueService.getCurrentQueue().subscribe();
  }

  get state() { return this.queueService.homeState(); }

  onActionButton(): void {
    if (this.state.myQueueNumber) {
      this.router.navigate(['/my-queue']);
    } else {
      this.getQueueNumber();
    }
  }

  getQueueNumber(): void {
    this.actionLoading.set(true);
    this.queueService.getQueueNumber().subscribe({
      next: () => this.actionLoading.set(false),
      error: () => this.actionLoading.set(false)
    });
  }

  ngOnDestroy(): void {}
}