import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export interface WsMessage {
  type: string;
  payload: any;
}

@Injectable({ providedIn: 'root' })
export class WebSocketService implements OnDestroy {
  private socket: WebSocket | null = null;
  private messageSubject = new Subject<WsMessage>();
  public messages$ = this.messageSubject.asObservable();
  private reconnectTimer: any;

  connect(): void {
    const token = localStorage.getItem('qjump_token');
    const url = token
      ? `ws://localhost:3000/ws/queue?token=${token}`
      : `ws://localhost:3000/ws/queue`;

    if (this.socket?.readyState === WebSocket.OPEN) return;

    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      console.log('[WS] Connected');
      clearTimeout(this.reconnectTimer);
    };

    this.socket.onmessage = (event) => {
      try {
        const msg: WsMessage = JSON.parse(event.data);
        this.messageSubject.next(msg);
      } catch (e) {
        console.error('[WS] Parse error', e);
      }
    };

    this.socket.onclose = () => {
      console.log('[WS] Disconnected — reconnecting in 3s...');
      this.reconnectTimer = setTimeout(() => this.connect(), 3000);
    };

    this.socket.onerror = (err) => {
      console.error('[WS] Error', err);
    };
  }

  disconnect(): void {
    clearTimeout(this.reconnectTimer);
    this.socket?.close();
    this.socket = null;
  }

  ngOnDestroy(): void {
    this.disconnect();
  }
}