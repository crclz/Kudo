import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(
    private api: ApiService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.api.access.getMe().subscribe(me => {
      if (me == null) {
        this.router.navigate(['/login']);
      } else {
        this.router.navigate(['/progress']);
      }
    })
  }

}
