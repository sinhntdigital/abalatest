import { Observable } from 'rxjs/Observable';
import { LoginModel, TokenViewModel, UserViewModel, RegisterViewModel } from './../../models/auth';
import { MessageService } from './../../message.service';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators/tap';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { WpPost } from './../../models/wp-model';
import { WpMedia } from './../../models/wp-media';

import { Storage } from '@ionic/storage';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


/*
  Generated class for the WordpressProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WordpressProvider {
  user: UserViewModel = null;

  private url = environment.apiUrl + '/api/Jwt';  // URL to web api
  constructor(public http: HttpClient,
    public messageService: MessageService,
    public storage: Storage) {
      console.log('Hello WordpressProvider Provider');
    }

    /** GET user info by current token on localStorage*/
    getPostByCategory(idCategory: string | number): Observable<WpPost[]> {

    const url = `https://batalanews.agileviet.vn/wp-json/wp/v2/posts?categories=${idCategory.toString()}&_embed`;

    return this.http.get<WpPost[]>(url, httpOptions)
      .pipe(
        tap((data: WpPost[]) => {
          console.log(data);
          this.log(`fetched getPostFeaturedMedia`);
        }),
        catchError(this.handleError('getPostFeaturedMedia', null))
      );
  }


    /** GET user info by current token on localStorage*/
  getPostFeaturedMedia(idMedia: string | number): Observable<WpMedia> {

    const url = `https://binhthuannews.vn/wp-json/wp/v2/media/${idMedia.toString()}`;

    return this.http.get<WpMedia>(url, httpOptions)
      .pipe(
        tap((data: WpMedia) => {
          console.log(data);
          this.log(`fetched getPostFeaturedMedia`);
        }),
        catchError(this.handleError('getPostFeaturedMedia', null))
      );
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
