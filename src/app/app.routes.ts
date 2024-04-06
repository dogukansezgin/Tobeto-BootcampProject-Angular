import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { BootcampDetailComponent } from './features/components/bootcamps/bootcamp-detail/bootcamp-detail.component';
import { RegisterFormComponent } from './features/components/auth/register-form/register-form.component';
import { LoginFormComponent } from './features/components/auth/login-form/login-form.component';

export const routes: Routes = 
[
    {path:'', redirectTo:'homepage', pathMatch:'full'},
    {path:'homepage', component:HomePageComponent},
    {path:'register', component:RegisterFormComponent},
    {path:'login', component:LoginFormComponent},
    {path: 'p/:bootcampId', component: BootcampDetailComponent}
];
