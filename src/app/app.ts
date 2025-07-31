import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { BriefFormComponent } from './components/pages/brief-form/brief-form.component';

import {Register} from './components/pages/auth/register/register';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, 
    Register, BriefFormComponent
  ],

  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'enaa-front';
}
