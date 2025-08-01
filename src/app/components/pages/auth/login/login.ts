import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth } from '../../../../services/auth/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule, CommonModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  authService: Auth = inject(Auth);
  router: Router = inject(Router);

  errorFields: Record<string, string | string[]> = {};

  loginObj = {
    email: '',
    password: ''
  };

  onLoginSubmit(form: NgForm) {
    if (form.invalid) return;

    this.authService.login(this.loginObj).subscribe({
      next: (res) => {
        // Clear form
        this.loginObj = {
          email: '',
          password: ''
        };

        // Redirect after login success
        this.router.navigate(['/dashboard']); // <---- Coreect Path 
      },
      error: (err) => {
        this.errorFields = err.error;
      }
    });
  }

}
