import { Component } from '@angular/core';
import { BootcampShowcaseComponent } from '../../features/components/bootcamps/bootcamp-showcase/bootcamp-showcase.component';
import { BootcampSliderComponent } from '../../features/components/bootcamps/bootcamp-slider/bootcamp-slider.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [BootcampShowcaseComponent,BootcampSliderComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}
