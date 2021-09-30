import { HttpClient, HttpClientModule} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserResponse, UserRegister, registerOk } from '../shared/models/user.interface';
import {catchError, map} from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) { }

  register(regData: UserRegister):Observable<any>{
    return this.http
    .post(`${environment.API_URL}/user`, regData)
}
}
