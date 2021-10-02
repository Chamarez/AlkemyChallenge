import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OperationData } from '../shared/models/operations';



@Injectable({
  providedIn: 'root'
})
export class OperationsService {
  helper = new JwtHelperService();

  constructor(private http:HttpClient, authSvc: AuthService,) {

   }


   create(token:any, newData:any):Observable<any>{

    return this.http.post(`${environment.API_URL}/balance/balance/`,newData, {headers: new HttpHeaders({'auth': token})}  );
  }


  update(token:any, editData:any):Observable<any>{
         return this.http.put(`${environment.API_URL}/balance/update/`,editData, {headers: new HttpHeaders({'auth': token})}  );
       }


  income(token:any):Observable<any>{
    return this.http.get(`${environment.API_URL}/balance/income/`,  {headers: new HttpHeaders({'auth': token})});
    }
  expense(token:any):Observable<any>{
      return this.http.get(`${environment.API_URL}/balance/expense/`,  {headers: new HttpHeaders({'auth': token})});
      }

  delete(token:any, entryId:any):Observable<any>{
    return this.http.delete(`${environment.API_URL}/balance/delete/`, {headers: new HttpHeaders({'auth': token}), body: entryId});
    }


}

