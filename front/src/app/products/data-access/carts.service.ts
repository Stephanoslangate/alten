import { Injectable, inject, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, of, tap } from "rxjs";
import { Cart } from "./cart.model";

@Injectable({
    providedIn: "root"
}) export class CartsService {

    private readonly userId = localStorage.getItem('userId') ?? '0';
    private readonly http = inject(HttpClient);
    private readonly path = `http://localhost:3000/api/carts/${this.userId}`;
    
    private readonly _carts = signal<Cart[]>([]);
    public readonly carts = this._carts.asReadonly();

    
    public get(): Observable<Cart[]> {
        return this.http.get<Cart[]>(this.path).pipe(
            catchError((error) => {
                return this.http.get<Cart[]>("assets/cart.json");
            }),
            tap((carts) => this._carts.set(carts)),
        );
    }

    public getCart(): Observable<any> {
        return this.http.get<any>(`${this.path}/details`).pipe(
            catchError((error) => {
                return this.http.get<any>("assets/cart.json");
            }),
        );
    }

    public create(cart: Cart): Observable<boolean> {
        return this.http.post<boolean>(`${this.path}/items`, cart).pipe(
            catchError(() => {
                return of(true);
            })
        );
    }

    public update(cart: Cart): Observable<boolean> {
        return this.http.patch<boolean>(`${this.path}/${cart.id}`, cart).pipe(
            catchError(() => {
                return of(true);
            }),
            tap(() => this._carts.update(carts => {
                return carts.map(p => p.id === cart.id ? cart : p)
            })),
        );
    }
    public delete(productId: number): Observable<boolean> {
        return this.http.delete<boolean>(`${this.path}/items/${productId}`).pipe(
            catchError(() => {
                return of(true);
            }),
            tap(() => this._carts.update(carts => carts.filter(cart => cart.productId !== productId))),
        );
    }
}