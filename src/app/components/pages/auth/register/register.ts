import { Component } from '@angular/core';
import { registerFormType } from '../../../../models/types/register-form';

@Component({
  selector: 'app-register',
  imports: [],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  registerObj: registerFormType = {
    firstName: ""
  }
}
