import { Component } from '@angular/core';
import { registerFormType } from '../../../../models/types/register-form';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  registerObj: registerFormType = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role : ""
  }

  onRegisterSubmit(form: FormsModule){
    console.log(this.registerObj);
  }

  setRole(role: string): void {
    this.registerObj.role = role;
  }


}
