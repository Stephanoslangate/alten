import { Component, Input, OnInit, Signal, inject, signal } from "@angular/core";
import { Cart } from "app/products/data-access/cart.model";
import { ProductFormComponent } from "app/products/ui/product-form/product-form.component";
import { CardFormComponent } from "app/products/ui/card-form/card-form.component";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { CartsService } from "app/products/data-access/carts.service";
import { BadgeModule } from 'primeng/badge';
import { NgIf } from "@angular/common";

const emptyCart: Cart = {
  id: 0,
  productId: 0,
  quantity: 0,
};

@Component({
  selector: "app-cart-list",
  templateUrl: "./cart-list.component.html",
  styleUrls: ["./cart-list.component.scss"],
  standalone: true,
  imports: [DataViewModule, CardModule, ButtonModule, DialogModule, ProductFormComponent,CardFormComponent,NgIf,BadgeModule],
})
export class CartListComponent implements OnInit {
  private readonly cartsService = inject(CartsService);
  public prods$ : any;
  cartCount = 0;
 
  ngOnInit() {
    this.cartsService.getCart().subscribe({
        next: (cart) => {
            this.prods$ =cart.items;
            this.cartCount = 0;
            cart.items.forEach((_element: any) => {
              this.cartCount+=_element.quantity;
            });
          },
          error: (err) => {
            console.error('Erreur lors de la récupération du cart :', err);
          }
    });
  }

  public onDelete(productID: number) {
    this.cartsService.delete(productID).subscribe();
    this.cartsService.getCart().subscribe({
      next: (cart) => {
          this.prods$ =cart.items;
          this.cartCount = 0;
          cart.items.forEach((_element: any) => {
            this.cartCount+=_element.quantity;
          });
        },
        error: (err) => {
          console.error('Erreur lors de la récupération du cart :', err);
        }
  });
  }

}
