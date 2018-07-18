import { Observable } from 'rxjs/Observable';
import { Booking } from './../../models/booking';
import { MessageService } from './../../message.service';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators/tap';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class BookingService {

  private url = environment.apiUrl + '/api/BookingApi';  // URL to web api
  constructor(private http: HttpClient,
    private messageService: MessageService) { }

  /** GET All items from the server */
  getAllBooking(): Observable<Booking[]> {
    // debugger;
    return this.http.get<Booking[]>(this.url)
      .pipe(
        tap(data => {
          console.log(data);
          this.log(`fetched getAllBooking`);
        }),
        catchError(this.handleError('getAllBooking', []))
      );
  }

  /** GET one item from the server */
  getOneBooking(id: string | number): Observable<Booking> {
    // debugger;
    const url = `${this.url}/${id.toString()}`;
    return this.http.get<Booking>(url)
      .pipe(
        tap(data => {
          console.log(data);
          this.log(`fetched getOneBooking`);
        }),
        catchError(this.handleError('getOneBooking', null))
      );
  }

  //////// Save methods //////////

  /** POST: add a new item to the server */
  addBooking(item: Booking, token: string): Observable<Booking> {
    debugger;
    const url = `${this.url}/Create`;
    return this.http.post<Booking>(url, item,
      { headers: new HttpHeaders().append('Authorization', `Bearer ${token}`) }).pipe(
        tap((itemCreated: Booking) => this.log(`added Booking w/ id=${itemCreated.Id}`)),
        catchError(this.handleError<Booking>('addBooking'))
      );
  }

  /** DELETE: delete the item from the server */
  deleteBooking(item: Booking): Observable<Booking> {
    const url = `${this.url}/Delete?id=${item.Id.toString()}`;
    return this.http.post<Booking>(url, item, httpOptions).pipe(
      tap((itemDeleted: Booking) => this.log(`deleted Booking w/ id=${itemDeleted.Id}`)),
      catchError(this.handleError<Booking>('deleteBooking'))
    );
  }

  /** EDIT: edit the item from the server */
  editBooking(item: Booking): Observable<Booking> {
    const url = `${this.url}/Edit?id=${item.Id.toString()}`;
    return this.http.post<Booking>(url, item, httpOptions).pipe(
      tap((itemEdited: Booking) => this.log(`edited Booking w/ id=${itemEdited.Id}`)),
      catchError(this.handleError<Booking>('editBooking'))
    );
  }


  /**
 * GET, DELETE
 * by one field
 */

  /** GET list item from the server */
  GetById(value: string | number): Observable<Booking[]> {
    // debugger;
    const url = `${this.url}/GetById?value=${value}`;
    return this.http.get<Booking[]>(url)
      .pipe(
        tap(data => {
          console.log(data);
          this.log(`fetched GetById`);
        }),
        catchError(this.handleError('GetById', null))
      );
  }


  /** DELETE: delete multi items from the server */
  DeleteById(value: string | number): Observable<number> {
    const url = `${this.url}/DeleteById?value=${value}`;
    return this.http.get<number>(url)
      .pipe(
        tap(data => {
          debugger;
          console.log(data);
          this.log(`fetched DeleteById`);
        }),
        catchError(this.handleError('DeleteById', null))
      );

  }/** GET list item from the server */
  GetByUserId(value: string | number): Observable<Booking[]> {
    // debugger;
    const url = `${this.url}/GetByUserId?value=${value}`;
    return this.http.get<Booking[]>(url)
      .pipe(
        tap(data => {
          console.log(data);
          this.log(`fetched GetByUserId`);
        }),
        catchError(this.handleError('GetByUserId', null))
      );
  }


  /** DELETE: delete multi items from the server */
  DeleteByUserId(value: string | number): Observable<number> {
    const url = `${this.url}/DeleteByUserId?value=${value}`;
    return this.http.get<number>(url)
      .pipe(
        tap(data => {
          debugger;
          console.log(data);
          this.log(`fetched DeleteByUserId`);
        }),
        catchError(this.handleError('DeleteByUserId', null))
      );

  }/** GET list item from the server */
  GetByThongTin(value: string | number): Observable<Booking[]> {
    // debugger;
    const url = `${this.url}/GetByThongTin?value=${value}`;
    return this.http.get<Booking[]>(url)
      .pipe(
        tap(data => {
          console.log(data);
          this.log(`fetched GetByThongTin`);
        }),
        catchError(this.handleError('GetByThongTin', null))
      );
  }


  /** DELETE: delete multi items from the server */
  DeleteByThongTin(value: string | number): Observable<number> {
    const url = `${this.url}/DeleteByThongTin?value=${value}`;
    return this.http.get<number>(url)
      .pipe(
        tap(data => {
          debugger;
          console.log(data);
          this.log(`fetched DeleteByThongTin`);
        }),
        catchError(this.handleError('DeleteByThongTin', null))
      );

  }/** GET list item from the server */
  GetByGhiChuHtml(value: string | number): Observable<Booking[]> {
    // debugger;
    const url = `${this.url}/GetByGhiChuHtml?value=${value}`;
    return this.http.get<Booking[]>(url)
      .pipe(
        tap(data => {
          console.log(data);
          this.log(`fetched GetByGhiChuHtml`);
        }),
        catchError(this.handleError('GetByGhiChuHtml', null))
      );
  }


  /** DELETE: delete multi items from the server */
  DeleteByGhiChuHtml(value: string | number): Observable<number> {
    const url = `${this.url}/DeleteByGhiChuHtml?value=${value}`;
    return this.http.get<number>(url)
      .pipe(
        tap(data => {
          debugger;
          console.log(data);
          this.log(`fetched DeleteByGhiChuHtml`);
        }),
        catchError(this.handleError('DeleteByGhiChuHtml', null))
      );

  }/** GET list item from the server */
  GetByCheDoLapLaiJson(value: string | number): Observable<Booking[]> {
    // debugger;
    const url = `${this.url}/GetByCheDoLapLaiJson?value=${value}`;
    return this.http.get<Booking[]>(url)
      .pipe(
        tap(data => {
          console.log(data);
          this.log(`fetched GetByCheDoLapLaiJson`);
        }),
        catchError(this.handleError('GetByCheDoLapLaiJson', null))
      );
  }


  /** DELETE: delete multi items from the server */
  DeleteByCheDoLapLaiJson(value: string | number): Observable<number> {
    const url = `${this.url}/DeleteByCheDoLapLaiJson?value=${value}`;
    return this.http.get<number>(url)
      .pipe(
        tap(data => {
          debugger;
          console.log(data);
          this.log(`fetched DeleteByCheDoLapLaiJson`);
        }),
        catchError(this.handleError('DeleteByCheDoLapLaiJson', null))
      );

  }/** GET list item from the server */
  GetByViTriGeoJSON(value: string | number): Observable<Booking[]> {
    // debugger;
    const url = `${this.url}/GetByViTriGeoJSON?value=${value}`;
    return this.http.get<Booking[]>(url)
      .pipe(
        tap(data => {
          console.log(data);
          this.log(`fetched GetByViTriGeoJSON`);
        }),
        catchError(this.handleError('GetByViTriGeoJSON', null))
      );
  }


  /** DELETE: delete multi items from the server */
  DeleteByViTriGeoJSON(value: string | number): Observable<number> {
    const url = `${this.url}/DeleteByViTriGeoJSON?value=${value}`;
    return this.http.get<number>(url)
      .pipe(
        tap(data => {
          debugger;
          console.log(data);
          this.log(`fetched DeleteByViTriGeoJSON`);
        }),
        catchError(this.handleError('DeleteByViTriGeoJSON', null))
      );

  }/** GET list item from the server */
  GetByCheDoThongBaoJson(value: string | number): Observable<Booking[]> {
    // debugger;
    const url = `${this.url}/GetByCheDoThongBaoJson?value=${value}`;
    return this.http.get<Booking[]>(url)
      .pipe(
        tap(data => {
          console.log(data);
          this.log(`fetched GetByCheDoThongBaoJson`);
        }),
        catchError(this.handleError('GetByCheDoThongBaoJson', null))
      );
  }


  /** DELETE: delete multi items from the server */
  DeleteByCheDoThongBaoJson(value: string | number): Observable<number> {
    const url = `${this.url}/DeleteByCheDoThongBaoJson?value=${value}`;
    return this.http.get<number>(url)
      .pipe(
        tap(data => {
          debugger;
          console.log(data);
          this.log(`fetched DeleteByCheDoThongBaoJson`);
        }),
        catchError(this.handleError('DeleteByCheDoThongBaoJson', null))
      );

  }/** GET list item from the server */
  GetByMauSacHienThiJson(value: string | number): Observable<Booking[]> {
    // debugger;
    const url = `${this.url}/GetByMauSacHienThiJson?value=${value}`;
    return this.http.get<Booking[]>(url)
      .pipe(
        tap(data => {
          console.log(data);
          this.log(`fetched GetByMauSacHienThiJson`);
        }),
        catchError(this.handleError('GetByMauSacHienThiJson', null))
      );
  }


  /** DELETE: delete multi items from the server */
  DeleteByMauSacHienThiJson(value: string | number): Observable<number> {
    const url = `${this.url}/DeleteByMauSacHienThiJson?value=${value}`;
    return this.http.get<number>(url)
      .pipe(
        tap(data => {
          debugger;
          console.log(data);
          this.log(`fetched DeleteByMauSacHienThiJson`);
        }),
        catchError(this.handleError('DeleteByMauSacHienThiJson', null))
      );

  }/** GET list item from the server */
  GetByCheDoCongKhaiJson(value: string | number): Observable<Booking[]> {
    // debugger;
    const url = `${this.url}/GetByCheDoCongKhaiJson?value=${value}`;
    return this.http.get<Booking[]>(url)
      .pipe(
        tap(data => {
          console.log(data);
          this.log(`fetched GetByCheDoCongKhaiJson`);
        }),
        catchError(this.handleError('GetByCheDoCongKhaiJson', null))
      );
  }


  /** DELETE: delete multi items from the server */
  DeleteByCheDoCongKhaiJson(value: string | number): Observable<number> {
    const url = `${this.url}/DeleteByCheDoCongKhaiJson?value=${value}`;
    return this.http.get<number>(url)
      .pipe(
        tap(data => {
          debugger;
          console.log(data);
          this.log(`fetched DeleteByCheDoCongKhaiJson`);
        }),
        catchError(this.handleError('DeleteByCheDoCongKhaiJson', null))
      );

  }/** GET list item from the server */
  GetByDanhSachKhachMoiJson(value: string | number): Observable<Booking[]> {
    // debugger;
    const url = `${this.url}/GetByDanhSachKhachMoiJson?value=${value}`;
    return this.http.get<Booking[]>(url)
      .pipe(
        tap(data => {
          console.log(data);
          this.log(`fetched GetByDanhSachKhachMoiJson`);
        }),
        catchError(this.handleError('GetByDanhSachKhachMoiJson', null))
      );
  }


  /** DELETE: delete multi items from the server */
  DeleteByDanhSachKhachMoiJson(value: string | number): Observable<number> {
    const url = `${this.url}/DeleteByDanhSachKhachMoiJson?value=${value}`;
    return this.http.get<number>(url)
      .pipe(
        tap(data => {
          debugger;
          console.log(data);
          this.log(`fetched DeleteByDanhSachKhachMoiJson`);
        }),
        catchError(this.handleError('DeleteByDanhSachKhachMoiJson', null))
      );

  }

  /** POST: add multi new items to the server */
  CreateByListItem(listItems: Booking[]): Observable<number> {
    const url = `${this.url}/CreateByListItem`;
    debugger;
    return this.http.post<number>(url, listItems, httpOptions).pipe(
      tap((countCreated: number) => {
        debugger;
        this.log(`CreateByListItem w/ countCreated=${countCreated}`)
      }),
      catchError(this.handleError<number>('CreateByListItem'))
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
