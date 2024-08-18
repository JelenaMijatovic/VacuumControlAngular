import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {LoginComponentComponent} from "./login-component/login-component.component";
import {UserComponentComponent} from "./user-component/user-component.component";
import {EditUserComponentComponent} from "./edit-user-component/edit-user-component.component";
import {AddUserComponentComponent} from "./add-user-component/add-user-component.component";
import {AuthGuard} from "./auth.guard";


const routes: Routes = [
  {
    path: "",
    component: AppComponent,
    canActivate: [AuthGuard],
    canDeactivate: [AuthGuard]
  },
  {
    path: "auth/login",
    component: LoginComponentComponent
  },
  {
    path: "users",
    component: UserComponentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "users/edit/:email",
    component: EditUserComponentComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"users/add",
    component: AddUserComponentComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
