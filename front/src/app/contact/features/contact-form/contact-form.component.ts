import { Component } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { ToastModule } from 'primeng/toast';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { InputNumberModule } from "primeng/inputnumber";
import { InputTextModule } from "primeng/inputtext";
import { NgIf } from "@angular/common";
import { MessageService } from 'primeng/api';

@Component({
  selector: "app-cart-list",
  templateUrl: "./contact-form.component.html",
  styleUrls: ["./contact-form.component.scss"],
  standalone: true,
  imports: [DataViewModule,NgIf, CardModule, ButtonModule, DialogModule, FormsModule,InputNumberModule,InputTextModule,ReactiveFormsModule,ToastModule],
  providers: [MessageService]

})
export class ContactFormComponent {

   formContact = new FormGroup(
      {
        email: new FormControl('',Validators.required),
        message: new FormControl('',Validators.required),
     }
    );
  constructor(private messageService: MessageService) {}

  public onSave() {  
    if (this.formContact.valid) {
      this.messageService.add({
        severity: 'success',
        summary: 'Succès',
        detail: 'Demande de contact envoyée avec succès !',
      });
    }
  }

}
