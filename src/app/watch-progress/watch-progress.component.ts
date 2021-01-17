import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Video } from 'src/apilib';
import { ApiService } from '../api.service';
import { FieldErrorService } from '../field-error.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-watch-progress',
  templateUrl: './watch-progress.component.html',
  styleUrls: ['./watch-progress.component.scss']
})
export class WatchProgressComponent implements OnInit {

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    public hinter: FieldErrorService,
    private noti: NotificationService,
    private router: Router,
  ) {
    this.allVideos = this.api.videos.getVideos().pipe(shareReplay(1));

    this.showingVideos = this.allVideos;
  }

  allVideos: Observable<Video[]>;
  showingVideos: Observable<Video[]>;

  ngOnInit(): void {

  }

}