import { Component } from '@angular/core';
import { ApplicantsApplicationsComponent } from '../applicants-applications/applicants-applications.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ApplicantsApplicationsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
