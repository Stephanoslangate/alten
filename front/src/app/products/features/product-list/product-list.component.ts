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
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
  standalone: true,
  imports: [DataViewModule, CardModule, ButtonModule, DialogModule, ProductFormComponent,CardFormComponent],
})
export class ProductListComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly cartsService = inject(CartsService);

  public readonly products = this.productsService.products;
  public readonly carts = this.cartsService.carts;
 
  public isDialogVisible2 = false;
  public isDialogVisible = false;
  public isCreation = false;
  public readonly editedCart = signal<Cart>(emptyCart);
  public readonly editedProduct = signal<Product>(emptyProduct);

  ngOnInit() {
    this.productsService.get().subscribe();
    this.cartsService.get().subscribe();
  }

  public onCreate() {
    this.isCreation = true;
    this.isDialogVisible = true;
    this.editedProduct.set(emptyProduct);
  }

  public onUpdate(product: Product) {
    this.isCreation = false;
    this.isDialogVisible = true;
    this.editedProduct.set(product);
  }

  public onDelete(product: Product) {
    this.productsService.delete(product.id).subscribe();
  }
  public toCard(idProd: number,quanti:number) {
    
    this.isDialogVisible2 = true;
    let k = {id:quanti,productId: idProd, quantity: 0}
    this.editedCart.set(k);
   
  }

  public onSave(product: Product) {
    if (this.isCreation) {
      this.productsService.create(product).subscribe();
    } else {
      this.productsService.update(product).subscribe();
    }
    this.closeDialog();
  }
  public onSave2(cart: Cart) {
    console.log("cart")
    console.log(cart)
    this.cartsService.create(cart).subscribe();

    if (this.isCreation) {
    } else {
     // this.productsService.update(product).subscribe();
    }
    this.closeDialog();
  }

  public onCancel() {
    this.closeDialog();
  }

  private closeDialog() {
    this.isDialogVisible = false;
    this.isDialogVisible2 = false;

  }
}
