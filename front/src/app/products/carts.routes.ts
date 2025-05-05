import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, Routes } from "@angular/router";
import { CartListComponent } from "./features/cart-list.component/cart-list.component";
export const CARTS_ROUTES: Routes = [
    {
        path: "list",
        component: CartListComponent,
    },
    { path: "**", redirectTo: "list" },
];
