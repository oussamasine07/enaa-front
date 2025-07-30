import { Component } from '@angular/core';
import { Sidebar } from '../partials/sidebar/sidebar';
import { Navbar } from '../partials/navbar/navbar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [
    Sidebar, Navbar, 
    RouterOutlet
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {

}
