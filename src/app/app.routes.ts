import { Routes } from '@angular/router';
import {Register} from './components/pages/auth/register/register';
import { Layout } from './components/layout/layout';
import { Dashboard } from './components/pages/dashboard/dashboard';

  
export const routes: Routes = [
    {
        path: "app",
        component: Layout,
        children: [
            {
                path: 'dashboard',
                component: Dashboard
            }
        ]
    },
    {
        path: "register",
        component: Register
    }
];
