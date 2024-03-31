import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';

export const routes: Routes = 
[
    {path:'', redirectTo:'homepage', pathMatch:'full'},
    {path:'homepage', component:HomePageComponent}
];
