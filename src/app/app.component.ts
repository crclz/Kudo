import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { publish, refCount } from 'rxjs/operators';
import { AccessService } from 'src/apilib';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Kudo';


  constructor(
    private http: HttpClient,
    private accessApi: AccessService,
    public auth: AuthService,
    private router: Router) {
  }

  async logoutButtonOnClick() {
    // logout
    await this.accessApi.cookieLogout().toPromise();

    // refresh the auth state
    this.auth.refresh();

    // jump to main page
    this.router.navigate(['/']);
  }
}
