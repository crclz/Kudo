import { Injectable } from '@angular/core';
import { AccessService, UsersService, VideosService } from 'src/apilib';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    public users: UsersService,
    public access: AccessService,
    public videos: VideosService,
  ) { }
}
