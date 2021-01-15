import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AccessService } from 'src/apilib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Kudo';


  constructor(private http: HttpClient, private accessApi: AccessService) {
  }

  async b1click() {
    this.accessApi.getMe().subscribe(me => {
      console.log(me)
    })
  }
}
