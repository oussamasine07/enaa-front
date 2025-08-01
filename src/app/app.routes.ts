import { Routes } from '@angular/router';
import {Register} from './components/pages/auth/register/register';
import { Layout } from './components/layout/layout';
import { Dashboard } from './components/pages/dashboard/dashboard';
import { BriefFormComponent } from './components/pages/brief-form/brief-form.component';
import { Rendu } from './components/pages/rendu/rendu';

  
export const routes: Routes = [
    {
        path: "app",
        component: Layout,
        children: [
            {
                path: 'dashboard',
                component: Dashboard
            },
            {
                path: 'brief',
                component: BriefFormComponent
            },
            {
                path:'rendu',
                component:Rendu
            }
        ]
    },
    {
        path: "register",
        component: Register
    }
];
