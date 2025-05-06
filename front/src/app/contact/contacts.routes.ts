import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, Routes } from "@angular/router";
import { ContactFormComponent } from "./features/contact-form/contact-form.component";

export const CONTACTS_ROUTES: Routes = [
	{
		path: "form",
		component: ContactFormComponent,
	},
	{ path: "**", redirectTo: "form" },
];
