import { Observable } from 'rxjs/Observable';
import { LoginModel, TokenViewModel, UserViewModel, RegisterViewModel } from './../../models/auth';
import { MessageService } from './../../message.service';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators/tap';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';

import { Storage } from '@ionic/storage';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class AuthService {
  token = '';
  user: UserViewModel = null;

  private url = environment.apiUrl + '/api/Jwt';  // URL to web api
  constructor(private http: HttpClient,
    private messageService: MessageService,
    private storage: Storage) { }


  /** POST: RequestToken */
  RequestToken(item: LoginModel): Observable<TokenViewModel> {
    //
    const url = `${this.url}/RequestToken`;
    return this.http.post<TokenViewModel>(url, item, httpOptions).pipe(
      tap((data: TokenViewModel) => this.log(`RequestToken w/ token=${data.token}`)),
      catchError(this.handleError<TokenViewModel>('RequestToken'))
    );
  }
  /** POST: RegisterUser */
  RegisterUser(item: RegisterViewModel): Observable<any> {
    //
    const url = `${this.url}/RegisterUser`;
    return this.http.post<any>(url, item, httpOptions).pipe(
      tap((data: boolean) => this.log(`RegisterUser w/ result=${data}`)),
      catchError(this.handleError<any>('RegisterUser'))
    );
  }
  /** GET user info by current token on localStorage*/
  getUserInfo(): Observable<UserViewModel> {

    const url = `${this.url}/GetUserInfo`;
    //

    return this.http.get<UserViewModel>(url,
      { headers: new HttpHeaders().append('Authorization', `Bearer ${this.token}`) })
      .pipe(
        tap((data: UserViewModel) => {
          console.log(data);
          this.log(`fetched getUserInfo`);
        }),
        catchError(this.handleError('getUserInfo', null))
      );
  }

  /** GET list user info*/
  getListUser_Employee(): Observable<UserViewModel[]> {

    const url = `${this.url}/getListUser_Employee`;
        //

    return this.http.get<UserViewModel[]>(url,
      { headers: new HttpHeaders().append('Authorization', `Bearer ${this.token}`) })
      .pipe(
        tap((data: UserViewModel[]) => {
          console.log(data);
          this.log(`fetched getListUser_Employee`);
        }),
        catchError(this.handleError('getListUser_Employee', null))
      );
  }

  getListUser_Friend(): Observable<UserViewModel[]> {

    const url = `${this.url}/getListUser_Friend`;
        //

    return this.http.get<UserViewModel[]>(url,
      { headers: new HttpHeaders().append('Authorization', `Bearer ${this.token}`) })
      .pipe(
        tap((data: UserViewModel[]) => {
          console.log(data);
          this.log(`fetched getListUser_Friend`);
        }),
        catchError(this.handleError('getListUser_Friend', null))
      );
  }

// Logout
public logout() {
  this.token = '';
  this.user = null;
  this.storage.set('loginToken', this.token);

  return Observable.create(observer => {
    observer.next(true);
    observer.complete();
  });
}


  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }
}
