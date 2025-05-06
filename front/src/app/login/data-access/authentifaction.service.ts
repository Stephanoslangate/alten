import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';

export interface Credentials{
  email: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthentifactionService {
  private http = inject(HttpClient);
  private url = "http://localhost:3000/api/auth";

  constructor(private router: Router) { }

  public register(credentials:any): Observable<boolean> {
      return this.http.post<any>(this.url+"/account", credentials).pipe(
              catchError(() => {
                  return of(true);
              })
          );
      }
  login(credentials:any): Observable<boolean> {
 
    return this.http.post<any>(this.url+"/token", credentials)
      .pipe(
        map(response => {
          localStorage.setItem('token', response['token']);
          localStorage.setItem('userId', response['user'].id);
          localStorage.setItem('userEmail', response['user'].email);

          return true;
        }),
        catchError(error => {
          return of(false);
        })
      );
  }

  deconnexion(){
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');

    this.router.navigate(['/login']);

  }
}
