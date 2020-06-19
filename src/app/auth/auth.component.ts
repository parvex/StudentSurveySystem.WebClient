import { Component, OnInit } from '@angular/core';
import { UsersService } from '../generated-api-client';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent implements OnInit {

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.usersUsosAuthDataGet().subscribe(data => {
      console.log(data);
    })
  }
}
