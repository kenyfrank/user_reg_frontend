import { Component, OnInit } from '@angular/core';
import {UserPojo} from '../model/user-pojo.model';
import {UserService} from '../service/user.service';
import {Router} from '@angular/router';
import {AuthenticationService} from '../auth/authentication.service';
import {PageManager} from '../util/page-manager';

@Component({
  selector: 'app-user-details-page',
  templateUrl: './user-details-page.component.html',
  styleUrls: ['./user-details-page.component.css']
})
export class UserDetailsPageComponent implements OnInit {

  data: UserPojo;
  user: UserPojo;
  constructor(private userService: UserService,
              private router: Router,
              private pageManager: PageManager,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.user = this.pageManager.currentUser;
    if (!this.user) {
      console.log('---isifjsi');
      this.router.navigate(['/login']);
    }
    this.userService.getUser().subscribe(it => {
      this.data = it;
      console.log('isifjsi');
      if (!it) {
        console.log('---isifjsi');
        this.router.navigate(['/login']);
      }
    }, error => {
      this.router.navigate(['/login']);
    });
  }

  logout() {
    this.authenticationService.logout();
  }
}
