import { Component, inject } from '@angular/core';
import { registerFormType } from '../../../../models/types/register-form';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth } from '../../../../services/auth/auth';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule, CommonModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  authService: Auth = inject(Auth);
  router: Router = inject(Router);

  errorFields: Record<string, string|string[]> = {};

  registerObj: registerFormType = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role : ""
  }

  onRegisterSubmit(form: FormsModule){
    this.authService.register(this.registerObj).subscribe({
      next: (res) => {
        this.registerObj = {
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          role : ""
        }

        // redirect to login
        this.router.navigate(["/login"]);
      },
      error: (err) => {
        this.errorFields = err.error;
      }
    });
    
  }

  setRole(role: string): void {
    this.registerObj.role = role;
  }


}
