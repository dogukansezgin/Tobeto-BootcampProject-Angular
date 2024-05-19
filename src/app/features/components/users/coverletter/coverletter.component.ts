import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApplicantAboutUpdateRequest } from '../../../models/requests/users/applicants/applicant-about-model';
import { GetApplicantResponse } from '../../../models/responses/users/applicant/get-applicant-response';
import { ApplicantService } from '../../../services/concretes/applicant.service';
import { TokenService } from '../../../services/concretes/token.service';


@Component({
  selector: 'app-coverletter',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './coverletter.component.html',
  styleUrl: './coverletter.component.scss'
})
export class CoverletterComponent implements OnInit {

  applicantData!: GetApplicantResponse;
  updateAboutRequest: ApplicantAboutUpdateRequest = {
    id: "",
    about: ""
  };
  about: string | undefined = "";
  isUpdated: boolean = false;

  constructor(private applicantService: ApplicantService, private tokenService: TokenService) { }
  ngOnInit(): void {
    this.getApplicantData(this.tokenService.getCurrentUserId());
  }
  getApplicantData(applicantId: string) {
    this.applicantService.getApplicant(applicantId).subscribe(response => {
      this.applicantData = response;
      this.about = response.about;
    })
  }
  updateApplicantData() {
    if (this.updateAboutRequest && this.applicantData) {
      this.updateAboutRequest.id = this.applicantData.id;
      this.updateAboutRequest.about = this.about ?? "";

      this.applicantService.updateAboutApplicant(this.updateAboutRequest).subscribe(response => {
        //span ile bir etiket oluştur
        this.isUpdated = true
      }, error => {
        console.error("Güncelleme sırasında bir hata oluştu:", error);
      })
    }
  }
  dataDismiss() {
    this.isUpdated = false;
  }
}
