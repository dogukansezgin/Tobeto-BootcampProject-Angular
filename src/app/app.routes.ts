import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { BootcampDetailPageComponent } from './pages/bootcamp-detail-page/bootcamp-detail-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { AuthGuard } from './core/guards/auth.guard';
import { PreventLoginAccessGuard } from './core/guards/prevent-login-access.guard';
import { BaseDashboardPageComponent } from './pages/dashboards/base-dashboard-page/base-dashboard-page.component';
import { RoleGuard } from './core/guards/role.guard';
import { AdminDashboardPageComponent } from './pages/dashboards/admin-dashboard-page/admin-dashboard-page.component';
import { ApplicantDashboardPageComponent } from './pages/dashboards/applicant-dashboard-page/applicant-dashboard-page.component';
import { LoginPageComponent } from './pages/account/login/login-page.component';
import { RegisterPageComponent } from './pages/account/register/register-page.component';
import { BootcampAllPageComponent } from './pages/bootcamp-all-page/bootcamp-all-page.component';
import { AppliedBootcampListComponent } from './features/components/users/applicants/applied-bootcamp-list/applied-bootcamp-list.component';
import { AccountPageComponent } from './pages/account-page/account-page.component';
import { CoverletterComponent } from './pages/account/coverletter/coverletter.component';
import { PersonalComponent } from './pages/account/personal/personal.component';

export const routes: Routes =
    [
        { path: '', pathMatch: 'full', component: HomePageComponent },
        { path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard] },
        { path: 'p/:bootcampId', component: BootcampDetailPageComponent },
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
                    data: { expectedRoles: ['Admin'] }
                },
                {
                    path: 'user',
                    component: ApplicantDashboardPageComponent,
                    canActivate: [RoleGuard],
                    data: { expectedRoles: ['Applicants.User'] }
                },
            ]
        },

        { path: 'login', redirectTo: 'Account/Login' },
        { path: "Account/Login", component: LoginPageComponent, canActivate: [PreventLoginAccessGuard] },
        { path: 'register', redirectTo: 'Account/Register' },
        { path: "Account/Register", component: RegisterPageComponent, canActivate: [PreventLoginAccessGuard] },

        { path: "bootcamps", component: BootcampAllPageComponent },

        { path: "applications", component: AppliedBootcampListComponent },

        {
            path: "Account/Profile", component: AccountPageComponent, canActivate: [AuthGuard], children:
                [
                    { path: '', pathMatch: 'full', component: CoverletterComponent }
                ]
        },
        {
            path: "Account/Profile/CoverLetter", component: AccountPageComponent, canActivate: [AuthGuard], children:
                [
                    { path: '', pathMatch: 'full', component: CoverletterComponent }
                ]
        },
        {
            path: "Account/Profile/Personal", component: AccountPageComponent, canActivate: [AuthGuard], children:
                [
                    { path: '', pathMatch: 'full', component: PersonalComponent }
                ]
        },
        
        { path: '**', redirectTo: '' }
    ];
