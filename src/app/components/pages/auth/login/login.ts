import { Component, inject, OnInit } from '@angular/core';
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
export class Login implements OnInit {

  authService: Auth = inject(Auth);
  router: Router = inject(Router);

  errorFields: Record<string, string | string[]> = {};

  token: string | null = localStorage.getItem("token")

  ngOnInit(): void {
    if (this.token) {
      this.router.navigate(['/app/dashboard']);
    }
  }

  loginObj = {
    email: '',
    password: ''
  };

  onLoginSubmit(form: NgForm) {

    this.authService.login(this.loginObj).subscribe({
      next: (res) => {
        // create save token into localstorage
        this.token = res.token

        // set token to localstorage
        localStorage.setItem("token" , this.token);

        // Clear form
        this.loginObj = {
          email: '',
          password: ''
        };
        
        // Redirect after login success
        this.router.navigate(['/app/dashboard']); // <---- Coreect Path 
      },
      error: (err) => {
        this.errorFields = err.error;
      }
    });
  }

}
