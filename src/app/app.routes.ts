import { Routes } from '@angular/router';
import {Register} from './components/pages/auth/register/register';
import { Layout } from './components/layout/layout';

  
export const routes: Routes = [
    {
        path: "layout",
        component: Layout
    },
    {
        path: "register",
        component: Register
    }
];
