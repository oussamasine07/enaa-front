import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {

  router: Router = inject(Router);

  logout () {
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }

}
