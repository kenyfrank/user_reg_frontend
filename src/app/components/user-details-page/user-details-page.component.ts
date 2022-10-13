import { Component, OnInit } from '@angular/core';
import {UserPojo} from '../model/user-pojo.model';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-user-details-page',
  templateUrl: './user-details-page.component.html',
  styleUrls: ['./user-details-page.component.css']
})
export class UserDetailsPageComponent implements OnInit {

  data: UserPojo;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUser().subscribe(it => {
      this.data = it;
    });
  }

}
