import {
  Component,
  computed,
  EventEmitter,
  input,
  Output,
  ViewEncapsulation,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Cart } from "app/products/data-access/cart.model";
import { ButtonModule } from "primeng/button";
import { DropdownModule } from "primeng/dropdown";
import { InputNumberModule } from "primeng/inputnumber";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from 'primeng/inputtextarea';
@Component({
  selector: "app-card-form",
  template: `
    <form #form="ngForm" (ngSubmit)="onSave()">
   

      <div class="form-field">
        <label for="quantity">Quantite</label>
        <p-inputNumber 
          
          [(ngModel)]="editedCart().quantity"
          name="quantity"
          id="quantity"
          [min]="0"
          [max]="editedCart().id"
          mode="decimal"
          [showButtons]="true"
          required/> 
      </div>
       <div class="form-field">
        <label for="quantity">Quantite en stock</label>
        <p-inputNumber 
          [(ngModel)]="editedCart().id"
          id="id"
          name="id"
          readonly
          required/> 
      </div>
       
    
      <div class="flex justify-content-between">
        <p-button type="button" (click)="onCancel()" label="Annuler" severity="help"/>
        <p-button type="submit" [disabled]="!form.valid" label="Enregistrer" severity="success"/>
      </div>
    </form>
  `,
  styleUrls: ["./card-form.component.scss"],
  standalone: true,
  imports: [
    FormsModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    InputTextareaModule,
    DropdownModule,
  ],
  encapsulation: ViewEncapsulation.None
})
export class CardFormComponent {
  public readonly cart = input.required<Cart>();
  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<Cart>();

  public readonly editedCart = computed(() => ({ ...this.cart() }));

  public tempQuantity: number =0;

  onCancel() {
    this.cancel.emit();
  }
  onSave() {
    this.save.emit(this.editedCart());
  }

  
}
