import {Component, EventEmitter, Output} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent {

  email: string;
  password: string;

  @Output()
  childEmitter: EventEmitter<string>

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService, private userService: UserService) {
    this.email = "";
    this.password = "";
    this.childEmitter = new EventEmitter<string>()
  }


  login() {
    this.authService.login(this.email, this.password)
      .subscribe( {
        next: (data) => {
          this.authService.setToken(JSON.stringify(data.jwt));
          this.userService.getMe().subscribe({
            next: (user) => {
              this.authService.setUser(JSON.stringify(user));
            },
            error: (e) => {
              console.log(e);
            }})
          this.router.navigateByUrl('/users');
        }, error: (e) => {
          console.log(e);
        }});
  }
}
