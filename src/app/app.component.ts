import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'user-management';
  currPage: number
  validToken: boolean
  username: string
  permissions: Array<string>
  canCreate: boolean
  canSearch: boolean
  canAdd: boolean
  hasPerms: boolean

  constructor(private authService: AuthService) {
    this.currPage = 0;
    this.validToken = !!this.authService.getToken();
    this.hasPerms = false;
    this.canCreate = false;
    this.canSearch = false;
    this.canAdd = false;
    this.username = "";
    this.permissions = [];
  }

  ngOnInit(): void {
    //this.authService.loginStatusChange().subscribe(loggedIn => {
      this.update();
    //});
  }

  update() {
    let user = this.authService.getUser();
    if (user) {
      let userJ = JSON.parse(user);
      this.username = userJ.name + " " + userJ.surname;
      for (let perm of userJ.permissions) {
        this.permissions.push(perm.permission);
      }
      //console.log(this.permissions);
      this.hasPerms = !(this.permissions.length == 0);
      this.canCreate = this.permissions.includes("can_create_users");
      this.canSearch = this.permissions.includes("can_search_vacuum");
      this.canAdd = this.permissions.includes("can_add_vacuum");
    }
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
}
