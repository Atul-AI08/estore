import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { user } from '../../../types/user.type';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  createUser(user: user): Observable<any>{
    return this.http.post('http://localhost:5001/users/signup', user);
  }
}
