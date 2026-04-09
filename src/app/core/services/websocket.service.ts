import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Observable, timer, EMPTY } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { catchError, switchAll, tap, retryWhen, delay } from 'rxjs/operators';

export interface WsMessage {
  type: 'queue_update' | 'now_serving' | 'queue_assigned' | 'queue_cancelled' | 'ping';
  payload: any;
}

@Injectable({ providedIn: 'root' })
export class WebSocketService implements OnDestroy {
  private socket$: WebSocketSubject<WsMessage> | null = null;
  private messagesSubject$ = new Subject<Observable<WsMessage>>();
  public messages$ = this.messagesSubject$.pipe(switchAll());

  private WS_URL = 'ws://localhost:8080/ws/queue';

  connect(): void {
    if (this.socket$) return;

    this.socket$ = webSocket<WsMessage>({
      url: this.WS_URL,
      openObserver: {
        next: () => console.log('[WS] Connected')
      },
      closeObserver: {
        next: () => {
          console.log('[WS] Disconnected');
          this.socket$ = null;
        }
      }
    });

    this.messagesSubject$.next(
      this.socket$.pipe(
        tap(msg => console.log('[WS] Received:', msg)),
        catchError(err => {
          console.error('[WS] Error:', err);
          return EMPTY;
        })
      )
    );
  }

  sendMessage(msg: WsMessage): void {
    if (this.socket$) {
      this.socket$.next(msg);
    }
  }

  disconnect(): void {
    if (this.socket$) {
      this.socket$.complete();
      this.socket$ = null;
    }
  }

  ngOnDestroy(): void {
    this.disconnect();
  }
}