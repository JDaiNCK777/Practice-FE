import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface QueueResponse {
  number: number;
}

@Injectable({
  providedIn: 'root'
})
export class QueueService {
  private _currentQueue = 25;

  getCurrentQueue(): Observable<QueueResponse> {
    return of({ number: this._currentQueue });
  }

  requestQueue(): Observable<QueueResponse> {
    this._currentQueue += 1;
    return of({ number: this._currentQueue });
  }
}
