import { Component } from '@angular/core';
import { Sidebar } from '../partials/sidebar/sidebar';
import { Navbar } from '../partials/navbar/navbar';

@Component({
  selector: 'app-layout',
  imports: [
    Sidebar, Navbar
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {

}
