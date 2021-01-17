import { Component, Input, OnInit } from '@angular/core';
import { Video } from 'src/apilib';
import { VideoViewService } from 'src/app/video-view.service';

@Component({
  selector: 'app-video-cell',
  templateUrl: './video-cell.component.html',
  styleUrls: ['./video-cell.component.scss']
})
export class VideoCellComponent implements OnInit {

  @Input('video')
  video: Video;

  @Input('hide-title')
  hideTitle = false;

  constructor(
    private viewService: VideoViewService,
  ) {
  }

  ngOnInit(): void {
  }

  get watched() {
    return this.viewService.hasViewed(this.video.id);
  }

  setView() {
    this.viewService.setView(this.video.id);
  }

  unsetView() {
    this.viewService.unsetView(this.video.id);
  }

  watchIconClick() {
    if (this.watched) {
      this.unsetView();
    } else {
      this.setView();
    }
  }

}
