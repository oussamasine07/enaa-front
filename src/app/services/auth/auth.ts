import { inject, Injectable } from '@angular/core';
import { registerFormType } from '../../models/types/register-form';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from '../../models/interfaces/user';
import { loginFormType } from '../../models/types/login-form';
import { Token } from '../../models/interfaces/token';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  // constructor (httpClient: HttpClient) {

  // }

  httpClient: HttpClient = inject(HttpClient);

  // register function
  register (body: registerFormType): Observable<User> {
    return this.httpClient.post<User>("http://localhost:8085/app/register", body)
              .pipe(
                catchError((err: HttpErrorResponse) => {
                  return throwError(() => err);
                })
              );
  }

  // Login function
  // login(loginObj: { email: string; password: string; }): Observable<User> --> loginObj

  login(body : loginFormType): Observable<Token> {
    return this.httpClient.post<Token>('http://localhost:8085/app/admin/login', body )
      .pipe(
        catchError((err: HttpErrorResponse) => throwError(() => err))
      );
  }
  
}
