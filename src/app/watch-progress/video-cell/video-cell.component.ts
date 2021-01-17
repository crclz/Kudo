import { Component, Input, OnInit } from '@angular/core';
import { Video } from 'src/apilib';

@Component({
  selector: 'app-video-cell',
  templateUrl: './video-cell.component.html',
  styleUrls: ['./video-cell.component.scss']
})
export class VideoCellComponent implements OnInit {

  @Input('video')
  video: Video;

  constructor() {
  }

  ngOnInit(): void {
  }

}
