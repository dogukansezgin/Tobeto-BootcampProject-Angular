import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { BootcampDetailComponent } from './features/components/bootcamps/bootcamp-detail/bootcamp-detail.component';

export const routes: Routes = 
[
    {path:'', redirectTo:'homepage', pathMatch:'full'},
    {path:'homepage', component:HomePageComponent},
    {path: 'p/:bootcampId', component: BootcampDetailComponent}
];
