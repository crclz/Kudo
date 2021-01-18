import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable, ReplaySubject } from 'rxjs';
import { filter, map, shareReplay, tap } from 'rxjs/operators';
import { StoryLine, Video, VideoView } from 'src/apilib';
import { ApiService } from '../api.service';
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
  ) {

    this.allVideos = this.api.videos.getVideos().pipe(shareReplay(1));

    this.storylines$ = this.api.storylines.getStoryLines();

    this.selectedStorylineVideoIdSet$ = this.selectedStoryline$.pipe(
      map(line => line == null ? null : new Set(line.videos)),
      shareReplay(1)
    );

    this.showingVideos = combineLatest([this.allVideos, this.selectedStorylineVideoIdSet$]).pipe(
      map(([videos, vset]) => {
        if (vset == null) {
          return videos;
        } else {
          return videos.filter(p => vset.has(p.id));
        }
      }),
      shareReplay(1),
      tap(x => console.log(x.length, "Tapped"))
    );
  }

  allVideos: Observable<Video[]>;
  showingVideos: Observable<Video[]>;

  storylines$: Observable<StoryLine[]>;
  selectedStoryline$ = new BehaviorSubject<StoryLine>(null);
  selectedStorylineVideoIdSet$: Observable<Set<string>>;

  inputLine: StoryLine | 0 = 0;

  hideTitle = false;
  public detailVideo: Video = null;

  ngOnInit(): void {

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
  }

}
