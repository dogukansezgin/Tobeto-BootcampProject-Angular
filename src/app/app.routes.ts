import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { BootcampDetailPageComponent } from './pages/bootcamp-detail-page/bootcamp-detail-page.component';
import { AuthGuard } from './core/guards/auth.guard';
import { PreventLoginAccessGuard } from './core/guards/prevent-login-access.guard';
import { RoleGuard } from './core/guards/role.guard';
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
import { EmployeeBootcampsComponent } from './features/components/admin/employee-bootcamps/employee-bootcamps.component';
import { InstructorsComponent } from './features/components/admin/instructors/instructors.component';
import { SettingsComponent } from './features/components/admin/settings/settings.component';
import { AccountComponent } from './features/components/admin/account/account.component';
import { EmployeesComponent } from './features/components/admin/employees/employees.component';
import { BootcampStatesComponent } from './features/components/admin/bootcamp-states/bootcamp-states.component';
import { ApplicationStatesComponent } from './features/components/admin/application-states/application-states.component';
import { BlacklistsComponent } from './features/components/admin/blacklists/blacklists.component';
import { ApplicantsComponent } from './features/components/admin/applicants/applicants.component';
import { EmployeeApplicationsComponent } from './features/components/admin/employee-applications/employee-applications.component';
import { InstructorApplicationsComponent } from './features/components/admin/instructor-applications/instructor-applications.component';
import { InstructorBootcampsComponent } from './features/components/admin/instructor-bootcamps/instructor-bootcamps.component';
import { ApplicantsApplicationsComponent } from './features/components/admin/applicants-applications/applicants-applications.component';
import { UpdatePasswordComponent } from './features/components/users/update-password/update-password.component';

export const routes: Routes =
    [
        { path: '', pathMatch: 'full', component: HomePageComponent },

        // Bootcamp
        { path: "bootcamp", component: BootcampAllPageComponent },
        { path: 'bootcamp/:bootcampName', component: BootcampDetailPageComponent },

        // Account
        {
            path: "Account", component: AccountPageComponent, canActivate: [AuthGuard, RoleGuard], canActivateChild: [AuthGuard, RoleGuard],
            data: { expectedRoles: ['Applicants.User'] },
            children: [
                {
                    path: 'Profile', component: ProfileComponent, canActivate: [AuthGuard, RoleGuard], canActivateChild: [AuthGuard, RoleGuard],
                    data: { expectedRoles: ['Applicants.User'] },
                    children: [
                        { path: "Coverletter", component: CoverletterComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRoles: ['Applicants.User'] } },
                        { path: "personal", component: PersonalComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRoles: ['Applicants.User'] } },
                        { path: '', redirectTo: 'Coverletter', pathMatch: "full" }
                    ]
                },
                {
                    path: 'Applications', component: AppliedBootcampListComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRoles: ['Applicants.User'] },
                },
                { 
                    path:'UpdatePassword', component:UpdatePasswordComponent,canActivate:[AuthGuard,RoleGuard],data: { expectedRoles: ['Applicants.User'] }
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
        { path: 'login', redirectTo: 'Auth/login' },
        { path: 'register', redirectTo: 'Auth/register' },

        // Admin
        {
            path: 'admin', component: AdminPageComponent, canActivate: [AuthGuard, RoleGuard], canActivateChild: [AuthGuard, RoleGuard],
            data: { expectedRoles: ['Admin', 'Employees.User', 'Instructors.User'] },
            children: [
                { path: 'dashboard', component: DashboardComponent, canActivate: [RoleGuard], data: { expectedRoles: ['Admin', 'Employees.User'] }, },
                { path: 'settings', component: SettingsComponent },
                { path: 'account', component: AccountComponent },
                { path: '', pathMatch: 'full', redirectTo: 'Dashboard' },

                { path: 'applications/instructor', component: InstructorApplicationsComponent, canActivate: [RoleGuard], data: { expectedRoles: ['Admin', 'Instructors.User'] }, },
                { path: 'bootcamps/instructor', component: InstructorBootcampsComponent, canActivate: [RoleGuard], data: { expectedRoles: ['Admin', 'Instructors.User'] }, },

                { path: 'blacklist', component: BlacklistsComponent, canActivate: [RoleGuard], data: { expectedRoles: ['Admin', 'Employees.User'] }, },
                { path: 'bootcamp-states', component: BootcampStatesComponent, canActivate: [RoleGuard], data: { expectedRoles: ['Admin', 'Employees.User'] }, },
                { path: 'bootcamps', component: EmployeeBootcampsComponent, canActivate: [RoleGuard], data: { expectedRoles: ['Admin', 'Employees.User'] }, },
                { path: 'application-states', component: ApplicationStatesComponent, canActivate: [RoleGuard], data: { expectedRoles: ['Admin', 'Employees.User'] }, },
                { path: 'applications', component: EmployeeApplicationsComponent, canActivate: [RoleGuard], data: { expectedRoles: ['Admin', 'Employees.User'] }, },
                { path: 'instructors', component: InstructorsComponent, canActivate: [RoleGuard], data: { expectedRoles: ['Admin', 'Employees.User'] }, },
                { path: 'applicants', component: ApplicantsComponent, canActivate: [RoleGuard], data: { expectedRoles: ['Admin', 'Employees.User'] }, },

                { path: 'employees', component: EmployeesComponent, canActivate: [RoleGuard], data: { expectedRoles: ['Admin'] }, },
                { path: 'applicants-applications', component: ApplicantsApplicationsComponent, canActivate: [RoleGuard], data: { expectedRoles: ['Admin', 'Employees.User'] }, }
            ]
        },

        // undefined
        { path: '**', redirectTo: '' }
    ];
