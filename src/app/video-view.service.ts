import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, pipe, Subject } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';
import { Video, VideoView } from 'src/apilib';
import { ApiService } from './api.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class VideoViewService {

  private refresh$ = new Subject<any>();
  private viewRecords$: Observable<VideoView[]>;

  private viewSet = new Set<string>();

  constructor(
    private api: ApiService,
    private noti: NotificationService,
  ) {

    this.viewRecords$ = this.refresh$.pipe(
      switchMap(() => this.api.users.getMyVideoViews()),
      shareReplay(1)
    );

    this.viewRecords$.subscribe(records => {
      this.viewSet.clear();
      for (let r of records) {
        this.viewSet.add(r.videoId);
      }
    })

    this.refresh$.next(1);
  }

  hasViewed(videoId: string): boolean {
    return this.viewSet.has(videoId);
  }

  setView(videoId: string) {
    this.api.videos.setView(videoId).subscribe(
      () => {
        this.viewSet.add(videoId);
      },
      res => this.noti.err(res))
  }

  unsetView(videoId: string) {
    this.api.videos.unsetView(videoId).subscribe(
      () => {
        if (this.viewSet.has(videoId)) {
          this.viewSet.delete(videoId);
        }
      },
      res => this.noti.err(res)
    )
  }


}
