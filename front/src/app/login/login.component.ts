import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentifactionService, Credentials } from './data-access/authentifaction.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private route = inject(Router);
  private authentificationService = inject(AuthentifactionService);
  formLogin = new FormGroup(
    {
      email: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
   }
  );
  onSubmit(){
    this.authentificationService.login(this.formLogin.value as Credentials).subscribe(
      (value) => {
        if(value){
          this.route.navigate(["/home"]);
        }
      }
    )
    this.formLogin.reset();
    
  }
}
