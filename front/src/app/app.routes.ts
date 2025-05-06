import { Routes } from "@angular/router";
import { HomeComponent } from "./shared/features/home/home.component";
import { AuthGuard } from "./guards/auth.guard";
import { LoginComponent } from "./login/login.component";

export const APP_ROUTES: Routes = [
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "products",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./products/products.routes").then((m) => m.PRODUCTS_ROUTES)
  },
  {
    path: "carts",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./products/carts.routes").then((m) => m.CARTS_ROUTES)
  },
  {
    path: "contacts",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./contact/contacts.routes").then((m) => m.CONTACTS_ROUTES)
  },
  { path: "", redirectTo: "home", pathMatch: "full" },
];
