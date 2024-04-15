import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { BootcampDetailPageComponent } from './pages/bootcamp-detail-page/bootcamp-detail-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { AppliedBootcampsPageComponent } from './pages/applied-bootcamps-page/applied-bootcamps-page.component';
import { AuthGuard } from './core/guards/auth.guard';
import { PreventLoginAccessGuard } from './core/guards/prevent-login-access.guard';

export const routes: Routes = 
[
    {path:'', redirectTo:'homepage', pathMatch:'full'},
    {path:'homepage', component: HomePageComponent},
    {path:'register', component: RegisterPageComponent, canActivate: [PreventLoginAccessGuard]},
    {path:'login', component: LoginPageComponent, canActivate: [PreventLoginAccessGuard]},
    {path:'profile', component: ProfilePageComponent, canActivate: [AuthGuard]},
    {path: 'p/:bootcampId', component: BootcampDetailPageComponent},
    {path: 'applied-bootcamps', component: AppliedBootcampsPageComponent, canActivate: [AuthGuard]}
];
