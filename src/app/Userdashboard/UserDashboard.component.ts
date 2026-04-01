import { Component, Inject, OnInit } from '@angular/core';
import { QueueService, QueueResponse } from '../services/queue.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './UserDashboard.component.html',
  styleUrls: ['./UserDashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  currentQueue = 25;
  userQueue: number | null = null;

  constructor(@Inject(QueueService) private queueService: QueueService) {}

  ngOnInit(): void {
    this.queueService.getCurrentQueue().subscribe((res: QueueResponse) => {
      this.currentQueue = res.number;
    });
  }

  getQueueNumber(): void {
    if (this.userQueue === null) {
      this.queueService.requestQueue().subscribe((res: QueueResponse) => {
        this.userQueue = res.number;
      });
    }
  }
}
