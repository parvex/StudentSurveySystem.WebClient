import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { UsersService } from '../generated-api-client';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isMenuCollapsed = true;
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private authService: AuthService, private usersService: UsersService, private modalService: NgbModal, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = this.authService.isAuthenticated();
    });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onUpdateCoursesClick(content){
    if(!this.authService.isAuthenticated)
      return;

    this.spinner.show();
    this.usersService.usersUpdateUserUsosDataPut().subscribe((data) =>{
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
      this.spinner.hide();
  })
  }
}
