import { Component, Input, OnInit, Signal, inject, signal } from "@angular/core";
import { Product } from "app/products/data-access/product.model";
import { Cart } from "app/products/data-access/cart.model";
import { ProductsService } from "app/products/data-access/products.service";
import { ProductFormComponent } from "app/products/ui/product-form/product-form.component";
import { CardFormComponent } from "app/products/ui/card-form/card-form.component";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { CartsService } from "app/products/data-access/carts.service";
const emptyCart: Cart = {
  id: 0,
  productId: 0,
  quantity: 0,
};
const emptyProduct: Product = {
  id: 0,
  code: "",
  name: "",
  description: "",
  image: "",
  category: "",
  price: 0,
  quantity: 0,
  internalReference: "",
  shellId: 0,
  inventoryStatus: "INSTOCK",
  rating: 0,
  createdAt: 0,
  updatedAt: 0,
};



@Component({
  selector: "app-cart-list",
  templateUrl: "./cart-list.component.html",
  styleUrls: ["./cart-list.component.scss"],
  standalone: true,
  imports: [DataViewModule, CardModule, ButtonModule, DialogModule, ProductFormComponent,CardFormComponent],
})
export class CartListComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly cartsService = inject(CartsService);

  public readonly products = this.productsService.products;
  public prods : any;
 
  ngOnInit() {
    this.productsService.get().subscribe();
    this.cartsService.getCart().subscribe({
        next: (cart) => {
            console.log('Cart reçu :', cart);
            this.prods =cart.items;

          },
          error: (err) => {
            console.error('Erreur lors de la récupération du cart :', err);
          }
    });
  }

  public onDelete(productID: number) {
    this.cartsService.delete(productID).subscribe();
  }

}
