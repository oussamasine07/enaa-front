import { Routes } from '@angular/router';
import {Register} from './components/pages/auth/register/register';
import { Layout } from './components/layout/layout';
import { Dashboard } from './components/pages/dashboard/dashboard';
import { BriefFormComponent } from './components/pages/brief-form/brief-form.component';
import { SkillForm } from './components/pages/skill-form/skill-form';
import { SkillList } from './components/pages/skill-list/skill-list';
import { Login } from './components/pages/auth/login/login';

  
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
                path: "create-skill",
                component: SkillForm
            },
            {
                path: "list-skill",
                component: SkillList
            }
        
        ]
    },
    {
        path: "register",
        component: Register
    },
    {
        path: "login",
        component: Login
    }
];
