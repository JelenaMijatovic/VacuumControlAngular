import {Component, OnInit} from '@angular/core';
import {UserService} from "./services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'user-management';
  currPage: number
  validToken: boolean
  username: string
  permissions: Array<string>
  canCreate: boolean
  hasPerms: boolean

  constructor(private userService: UserService) {
    this.currPage = 0;
    this.validToken = !!localStorage.getItem("token");
    this.hasPerms = false;
    this.canCreate = false;
    this.username = "";
    this.permissions = [];
    let user = localStorage.getItem('user');
    if (user) {
      let userJ = JSON.parse(user);
      this.username = userJ.name + " " + userJ.surname;
      for (let perm of userJ.permissions) {
        this.permissions.push(perm.permission);
      }
      //console.log(this.permissions);
      this.hasPerms = !(this.permissions.length == 0);
      this.canCreate = this.permissions.includes("can_create_users");
    }
  }

  setPage(p: number) {
    this.currPage = p
  }
}
