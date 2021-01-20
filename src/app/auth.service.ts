import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';
import { QUser } from 'src/apilib';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private refresh$ = new BehaviorSubject<any>(0);

  private _me$: Observable<QUser>;

  constructor(
    private api: ApiService,
  ) {

    this._me$ = this.refresh$.pipe(
      switchMap(() => api.access.getMe()),
      shareReplay(1),
    );

  }

  refresh() {
    this.refresh$.next(1);
  }

  get me$() {
    return this._me$;
  }
}
