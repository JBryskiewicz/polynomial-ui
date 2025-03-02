import {Component} from '@angular/core';
import {NgIf, NgStyle} from "@angular/common";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormGroup,
  Validators
} from "@angular/forms";
import {MatCheckbox} from "@angular/material/checkbox";
import {UserService} from "../services/user.service";
import {UserDto} from "../types/user.interface";
import {take} from "rxjs";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {setUser} from "../../reducers/polynomial.actions";

@Component({
  selector: 'user-screen',
  standalone: true,
  imports: [
    NgIf,
    MatFormField,
    MatInput,
    MatButton,
    FormsModule,
    MatCheckbox,
    ReactiveFormsModule,
    NgStyle
  ],
  templateUrl: './user-screen.component.html',
  styleUrl: './user-screen.component.scss'
})
export class UserScreenComponent {

  protected isLoginView: boolean = false;

  protected loginForm: UntypedFormGroup;

  protected responseMsg: { flag: boolean, msg: string, color: string };

  constructor(
    private formBuilder: FormBuilder, private userService: UserService,
    private router: Router,
    private store: Store
) {
    this.loginForm = this.formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    this.responseMsg = {flag: false, msg: '', color: ''};
  }

  protected handleRegister(): void {
    const {login, password} = this.loginForm.value;
    const user = {
      username: login,
      password: password,
    } as UserDto;
    this.userService.registerNewUser(user).pipe(take(1)).subscribe(result => {
      this.responseMsg = {flag: true, msg: `User ${result.username} was created!`, color: 'green'}
      this.isLoginView = true;
    }, error => {
      this.responseMsg = {flag: true, msg: `Error has occured!`, color: 'red'}
    });
  }

  protected handleLogin(): void {
    const {login, password} = this.loginForm.value;
    const user = {
      username: login,
      password: password,
    } as UserDto;
    this.userService.loginUser(user).pipe(take(1)).subscribe(user => {
      this.router.navigate(['/loggedIn']);
      this.store.dispatch(setUser({ user }))
      localStorage.setItem('authToken', JSON.stringify(user));
    }, error => {
      this.responseMsg = {flag: true, msg: `Incorrect password or username!`, color: 'red'}
    });
  }
}
