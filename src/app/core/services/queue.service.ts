import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { QueueEntry, HomeState } from '../models/queue.model';
import { WebSocketService } from './websocket.service';

@Injectable({ providedIn: 'root' })
export class QueueService {
  private API = 'http://localhost:8080/api';

  homeState = signal<HomeState>({
    nowServing: null,
    myQueueNumber: null,
    peopleAhead: 0,
    estimatedWaitMinutes: 0,
    queueAvailable: true
  });

  queueHistory = signal<QueueEntry[]>([]);
  currentQueue = signal<QueueEntry | null>(null);

  constructor(private http: HttpClient, private ws: WebSocketService) {
    this.listenToWebSocket();
  }

  private listenToWebSocket(): void {
    this.ws.messages$.subscribe(msg => {
      switch (msg.type) {
        case 'now_serving':
          this.homeState.update(s => ({ ...s, nowServing: msg.payload.number }));
          break;
        case 'queue_update':
          this.homeState.update(s => ({
            ...s,
            peopleAhead: msg.payload.peopleAhead,
            estimatedWaitMinutes: msg.payload.estimatedWait,
            queueAvailable: msg.payload.queueAvailable
          }));
          break;
        case 'queue_assigned':
          this.homeState.update(s => ({ ...s, myQueueNumber: msg.payload.number }));
          this.currentQueue.set(msg.payload);
          break;
        case 'queue_cancelled':
          this.homeState.update(s => ({ ...s, myQueueNumber: null }));
          this.currentQueue.set(null);
          break;
      }
    });
  }

  getHomeState(): Observable<HomeState> {
    return this.http.get<HomeState>(`${this.API}/queue/home`).pipe(
      tap(state => this.homeState.set(state))
    );
  }

  getQueueHistory(): Observable<QueueEntry[]> {
    return this.http.get<QueueEntry[]>(`${this.API}/queue/history`).pipe(
      tap(history => this.queueHistory.set(history))
    );
  }

  getCurrentQueue(): Observable<QueueEntry | null> {
    return this.http.get<QueueEntry | null>(`${this.API}/queue/current`).pipe(
      tap(q => {
        this.currentQueue.set(q);
        if (q) {
          this.homeState.update(s => ({ ...s, myQueueNumber: q.queueNumber }));
        }
      })
    );
  }

  getQueueNumber(): Observable<QueueEntry> {
    return this.http.post<QueueEntry>(`${this.API}/queue/get-number`, {}).pipe(
      tap(q => {
        this.currentQueue.set(q);
        this.homeState.update(s => ({ ...s, myQueueNumber: q.queueNumber }));
      })
    );
  }

  viewQueueStatus(): Observable<QueueEntry> {
    return this.http.get<QueueEntry>(`${this.API}/queue/status`);
  }
}