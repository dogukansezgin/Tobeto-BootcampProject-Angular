import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { BootcampDetailPageComponent } from './pages/bootcamp-detail-page/bootcamp-detail-page.component';

export const routes: Routes = 
[
    {path:'', redirectTo:'homepage', pathMatch:'full'},
    {path:'homepage', component: HomePageComponent},
    {path:'register', component: RegisterPageComponent},
    {path:'login', component: LoginPageComponent},
    {path: 'p/:bootcampId', component: BootcampDetailPageComponent}
];
