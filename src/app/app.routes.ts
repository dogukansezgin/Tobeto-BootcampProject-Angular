import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { BootcampDetailPageComponent } from './pages/bootcamp-detail-page/bootcamp-detail-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { AuthGuard } from './core/guards/auth.guard';
import { PreventLoginAccessGuard } from './core/guards/prevent-login-access.guard';
import { ApplicantAppliedBootcampsPageComponent } from './pages/applicant-applied-bootcamps-page/applicant-applied-bootcamps-page.component';
import { BaseDashboardPageComponent } from './pages/dashboards/base-dashboard-page/base-dashboard-page.component';
import { RoleGuard } from './core/guards/role.guard';
import { AdminDashboardPageComponent } from './pages/dashboards/admin-dashboard-page/admin-dashboard-page.component';
import { ApplicantDashboardPageComponent } from './pages/dashboards/applicant-dashboard-page/applicant-dashboard-page.component';

export const routes: Routes = 
[
    {path: '', redirectTo:'homepage', pathMatch:'full'},
    {path: 'homepage', component: HomePageComponent},
    {path: 'register', component: RegisterPageComponent, canActivate: [PreventLoginAccessGuard]},
    {path: 'login', component: LoginPageComponent, canActivate: [PreventLoginAccessGuard]},
    {path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard]},
    {path: 'p/:bootcampId', component: BootcampDetailPageComponent},
    {path: 'applied-bootcamps', component: ApplicantAppliedBootcampsPageComponent, canActivate: [AuthGuard]},

    {
        path: 'dashboard',
        component: BaseDashboardPageComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'admin',
                component: AdminDashboardPageComponent,
                canActivate: [RoleGuard],
                data: { expectedRoles: ['Admin']}
            },
            {
                path: 'user',
                component: ApplicantDashboardPageComponent,
                canActivate: [RoleGuard],
                data: { expectedRoles: ['Applicants.User']}
            },
        ]
    },



    
    {path: '**', redirectTo:'homepage'}
];
