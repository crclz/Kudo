import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable, ReplaySubject } from 'rxjs';
import { filter, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { StoryLine, Video, VideoView } from 'src/apilib';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { FieldErrorService } from '../field-error.service';
import { NotificationService } from '../notification.service';
import { VideoViewService } from '../video-view.service';

@Component({
  selector: 'app-watch-progress',
  templateUrl: './watch-progress.component.html',
  styleUrls: ['./watch-progress.component.scss'],
  providers: [VideoViewService]
})
export class WatchProgressComponent implements OnInit {

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    public hinter: FieldErrorService,
    private noti: NotificationService,
    private router: Router,
    public viewService: VideoViewService,
    private titleService: Title,
    public auth: AuthService,
  ) {

    this.allVideos = this.api.videos.getVideos().pipe(shareReplay(1));

    this.storylines$ = this.api.storylines.getStoryLines();

    this.showingVideos = combineLatest([this.allVideos, this.selectedStoryline$, this.orderByStory$]).pipe(
      map(([videos, line, shouldOrderByStory]) => {
        var videosRef = new Map(videos.map(p => [p.id, p]));

        var x: Video[] = [];

        // filter
        if (line == null) {
          x = [...videos];
        } else {

          for (let vid of line.videos) {
            if (!videosRef.has(vid)) {
              throw "Key not found " + vid;
            }
            x.push(videosRef.get(vid));
          }
        }

        // order
        if (!shouldOrderByStory) {
          // order by pub
          x = x.sort((a, b) => a.publish - b.publish);
        }
        return x;
      }),
      shareReplay(1),
      tap(x => console.log(x.length, "Tapped"))
    );

    this.showingVideos = combineLatest([this.showingVideos, this.hideWatched$]).pipe(
      map(([videos, hideWatch]) => {
        if (!hideWatch) {
          return videos;
        } else {
          return videos.filter(p => !viewService.hasViewed(p.id));
        }
      })
    )

    this.initRecentView();
  }

  allVideos: Observable<Video[]>;
  showingVideos: Observable<Video[]>;

  storylines$: Observable<StoryLine[]>;
  selectedStoryline$ = new BehaviorSubject<StoryLine>(null);

  inputLine: StoryLine | 0 = 0;

  hideTitle = false;
  public detailVideo: Video = null;

  orderByStory = false;
  orderByStory$ = new BehaviorSubject(this.orderByStory);

  recentViewRecords$: Observable<VideoView[]>;
  recentWatch$: Observable<{ view: VideoView, video: Video }[]>;

  hideWatched: boolean = false;
  hideWatched$ = new BehaviorSubject<boolean>(this.hideWatched);


  ngOnInit(): void {
    this.titleService.setTitle('控制台');
  }

  videoClick(video: Video) {
    if (this.detailVideo == video) {
      this.detailVideo = null;
    } else {
      this.detailVideo = video;
    }
  }

  inputLineChange() {
    console.log(this.inputLine);

    var l: StoryLine = this.inputLine == 0 ? null : this.inputLine;

    this.selectedStoryline$.next(l);
    this.resetOrderByStory();
  }

  resetOrderByStory() {
    this.orderByStory = false;
    this.orderByStory$.next(this.orderByStory);
  }

  orderByStorySwitchChange() {
    this.orderByStory$.next(this.orderByStory);
  }

  initRecentView() {
    this.recentViewRecords$ = this.viewService.changed$.pipe(
      switchMap(() => this.api.users.getMyRecentVideoViews(6)),
      shareReplay(1),
    );

    this.recentWatch$ = combineLatest([this.recentViewRecords$, this.allVideos])
      .pipe(
        map(([views, videos]) => {
          var videoRef = new Map(videos.map(p => [p.id, p]));
          return views.map<any>(p => ({ view: p, video: videoRef.get(p.videoId) }));
        })
      )
  }

  hideWatchOnchange() {
    this.hideWatched$.next(this.hideWatched);
  }

}
