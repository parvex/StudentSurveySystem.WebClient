import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mobile-auth',
  templateUrl: './mobile-auth.component.html',
  styleUrls: ['./mobile-auth.component.scss']
})
export class MobileAuthComponent implements OnInit {
  pin: string;

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.pin = params['oauth_verifier'];
    });
   }

  ngOnInit(): void {
  }
}
