import { Component } from '@angular/core';
import { BootcampListGroupComponent } from '../../features/components/bootcamps/bootcamp-list-group/bootcamp-list-group.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { NavComponent } from '../../shared/components/nav/nav.component';


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [BootcampListGroupComponent,NavComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}
