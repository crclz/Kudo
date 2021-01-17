import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateUserModel } from 'src/apilib';
import { ApiService } from '../api.service';
import { FieldErrorService } from '../field-error.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    public hinter: FieldErrorService,
    private noti: NotificationService,
    private router: Router,
  ) {
    this.form = fb.group({
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(16)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]]
    })

  }

  ngOnInit(): void {
  }

  onSubmit(value: CreateUserModel) {
    console.log(value)

    this.api.users.createUser(value).subscribe(res => {
      this.noti.ok("注册成功，即将跳转到登录页面");
      this.router.navigate(['/login'])
    }, p => this.noti.err(p));
  }

}
