import { Component, OnInit } from '@angular/core';
import { ApplicantService } from '../../../features/services/concretes/applicant.service';
import { GetApplicantResponse } from '../../../features/models/responses/users/applicant/get-applicant-response';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TokenService } from '../../../features/services/concretes/token.service';
import { ApplicantAboutUpdateRequest } from '../../../features/models/requests/users/applicants/applicant-about-model';

@Component({
  selector: 'app-coverletter',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './coverletter.component.html',
  styleUrl: './coverletter.component.scss'
})

export class CoverletterComponent implements OnInit {

  applicantData!: GetApplicantResponse;
  updateAboutRequest : ApplicantAboutUpdateRequest={
    id:"",
    about:""
  };
  about: string | undefined = "";


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
    if(this.updateAboutRequest && this.applicantData){
      this.updateAboutRequest.id=this.applicantData.id;
      this.updateAboutRequest.about=this.about??"";

      this.applicantService.updateAboutApplicant(this.updateAboutRequest).subscribe(response => {
        //span ile bir etiket oluştur
      }, error => {
        console.error("Güncelleme sırasında bir hata oluştu:", error);
      })
    }

  }

}
