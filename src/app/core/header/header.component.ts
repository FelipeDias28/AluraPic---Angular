import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../user/user';
import { UserService } from '../user/user.service';

@Component({
  selector: "ap-header",
  templateUrl: "./header.component.html"
})
export class HeaderComponent {
  user$: Observable<User>; // Boa prática colocar $ em uma variável do tipo Observable

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.user$ = userService.getUser();
  }

  logout() {
    this.userService.logout();
    this.router.navigate([""]) // leva para página de login
  }
}
