import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Store} from "@ngrx/store";
import {User, UserDto} from "../types/user.interface";
import {map, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // private userURL = 'http://localhost:8080/api/users';
  private userURL = 'http://polynomial-api-latest.onrender.com/api/users';

  constructor(private http: HttpClient, private store: Store) {

  }

  public registerNewUser(user: UserDto): Observable<User> {
    return this.http.post<UserDto>(this.userURL, user).pipe(map(user => {
      return {
        id: user.id,
        username: user.username
      } as User;
    }));
  }

  public loginUser(user: UserDto): Observable<User> {
    return this.http.post<UserDto>(`${this.userURL}/login`, user).pipe(map(user => {
      return {
        id: user.id,
        username: user.username
      } as User;
    }));
  }

}
