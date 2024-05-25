import { Component, OnInit } from '@angular/core';
import { ApplicantService } from '../../../services/concretes/applicant.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-applicants',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './applicants.component.html',
  styleUrl: './applicants.component.scss'
})
export class ApplicantsComponent implements OnInit {

  readonly PAGE_SIZE = 99;

  constructor(private applicantService: ApplicantService) { }

  ngOnInit(): void {

  }
}
