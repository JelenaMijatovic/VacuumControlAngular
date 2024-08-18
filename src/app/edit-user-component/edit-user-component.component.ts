import {Component, OnInit} from '@angular/core';
import {Permission} from "../model";
import {UserService} from "../services/user.service";
import {AlertService} from "../services/alert.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-user-component',
  templateUrl: './edit-user-component.component.html',
  styleUrls: ['./edit-user-component.component.css']
})
export class EditUserComponentComponent implements OnInit {

  name: string
  surname: string
  email: string
  permissions: Array<string>

  constructor(private router: Router, private userService: UserService, private alertService: AlertService) {
    this.name = "";
    this.surname = "";
    this.email = "";
    this.permissions = [];
  }

  ngOnInit(): void {
    this.userService.getUser(this.router.url.substring(this.router.url.lastIndexOf("/") + 1)).subscribe({
      next: (data) => {
        console.log(data);
        this.name = data.name;
        this.surname = data.surname;
        this.email = data.email;
        for (let i = 0; i < data.permissions.length; i++) {
          this.permissions.push(data.permissions[i].permission);
        }
      },
      error: (e) => {
        console.log(e);
      }
    })
  }
  save() {
    this.userService.updateUser(this.name, this.surname, this.email, this.permissions).subscribe({
      next: (data) => {
        this.alertService.throwAlert("Successfully edited user " + data.email + "!");
      },
      error: (e) => {
        this.alertService.throwAlert("Couldn't successfully edit user " + this.email + "!");
      }
    })
  }

}
