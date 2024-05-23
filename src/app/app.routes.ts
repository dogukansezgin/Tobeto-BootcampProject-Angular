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
import { BootcampAllPageComponent } from './pages/bootcamp-all-page/bootcamp-all-page.component';
import { AppliedBootcampListComponent } from './features/components/users/applicants/applied-bootcamp-list/applied-bootcamp-list.component';
import { AccountPageComponent } from './pages/account-page/account-page.component';
import { ProfileComponent } from './features/components/users/profile/profile.component';
import { CoverletterComponent } from './features/components/users/coverletter/coverletter.component';
import { PersonalComponent } from './features/components/users/personal/personal.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { LoginFormComponent } from './features/components/auth/login-form/login-form.component';
import { RegisterFormComponent } from './features/components/auth/register-form/register-form.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { DashboardComponent } from './features/components/admin/dashboard/dashboard.component';
import { BootcampsComponent } from './features/components/admin/bootcamps/bootcamps.component';
import { ApplicationsComponent } from './features/components/admin/applications/applications.component';
import { InstructorsComponent } from './features/components/admin/instructors/instructors.component';
import { SettingsComponent } from './features/components/admin/settings/settings.component';
import { AccountComponent } from './features/components/admin/account/account.component';
import { ApplicantsComponent } from './features/components/admin/applicants/applicants.component';

export const routes: Routes =
    [
        { path: '', pathMatch: 'full', component: HomePageComponent },
        { path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard] },
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
        
        // Bootcamp
        { path: "bootcamp", component: BootcampAllPageComponent },
        { path: 'bootcamp/:bootcampName', component: BootcampDetailPageComponent, data: { id: [''] }},

        // Account
        {
            path: "Account", component: AccountPageComponent, canActivate: [AuthGuard],
            children: [
                {
                    path: 'Profile', component: ProfileComponent,
                    children: [
                        {
                            path: "CoverLetter", component: CoverletterComponent, canActivate: [AuthGuard]
                        },
                        {
                            path: "Personal", component: PersonalComponent, canActivate: [AuthGuard]

                        },
                        {
                            path: '', redirectTo: 'CoverLetter', pathMatch: "full"
                        }
                    ]
                },
                {
                    path: 'Applications', component: AppliedBootcampListComponent
                }
            ]
        },

        // Authorization
        {
            path: "Auth", component: AuthPageComponent,
            canActivate: [PreventLoginAccessGuard],
            children: [
                {
                    path: 'Login', component: LoginFormComponent
                },
                {
                    path: 'Register', component: RegisterFormComponent
                },
                {
                    path: '', redirectTo: 'Login', pathMatch: "full"
                }
            ]
        },
        { path: 'login', redirectTo: 'Auth/Login' },
        { path: 'register', redirectTo: 'Auth/Register' },

        // Admin
        {
            path: 'admin', component: AdminPageComponent, canActivate: [AuthGuard],
            children: [
                {path:'',pathMatch:'full',redirectTo:'Dashboard'},
                { path: 'Dashboard', component: DashboardComponent },
                { path: 'Bootcamps', component: BootcampsComponent },
                { path: 'Applications', component: ApplicationsComponent },
                { path: 'Instructors', component: InstructorsComponent },
                {path:'Applicants',component:ApplicantsComponent},
                { path: 'Settings', component: SettingsComponent },
                { path: 'Account', component: AccountComponent }
            ]
        },

        // undefined
        { path: '**', redirectTo: '' }
    ];
