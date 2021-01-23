import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private titleService: Title,
  ) { }

  content$: Observable<string>;

  ngOnInit(): void {

    this.content$ = this.route.paramMap.pipe(
      map(m => m.get('id')),
      switchMap(id => {
        if (id == null) {
          return of(null);
        }
        // get from assets
        return this.http.get(`/assets/${id}.md`, { responseType: 'text' }).pipe(
          catchError(err => {
            console.error('error loading asset', err);
            return of(null);
          }))
      }),
      // tap(p => console.log(p)),
      shareReplay(1),
    );

    this.content$.subscribe(c => {
      // get md title from content and set the title
      var title = "标题错误";

      var m = c.match(/^# ([^\n]+)\n/);
      if (m != null) {
        title = m[1];
      }

      this.titleService.setTitle(title);
    })

  }

}
