import { Component } from '@angular/core';
import { BootcampListGroupComponent } from '../../features/components/bootcamps/bootcamp-list-group/bootcamp-list-group.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [BootcampListGroupComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}
