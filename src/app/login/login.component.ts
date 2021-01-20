import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from 'src/apilib';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { FieldErrorService } from '../field-error.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    public hinter: FieldErrorService,
    private noti: NotificationService,
    private router: Router,
    private auth: AuthService,
  ) {

    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })

  }

  form: FormGroup;

  ngOnInit(): void {
  }

  onSubmit(model: LoginModel) {
    this.api.access.login(model).subscribe(() => {
      this.noti.ok("登陆成功");
      this.auth.refresh();
      this.router.navigate(['/progress']);
    }, p => this.noti.err(p));
  }

}
