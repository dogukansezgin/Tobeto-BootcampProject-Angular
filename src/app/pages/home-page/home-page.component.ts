import { Component } from '@angular/core';
import { BootcampShowcaseComponent } from '../../features/components/bootcamps/bootcamp-showcase/bootcamp-showcase.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [BootcampShowcaseComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}
