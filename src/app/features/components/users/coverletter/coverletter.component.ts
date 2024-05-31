import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GetApplicantResponse } from '../../../models/responses/applicant/get-applicant-response';
import { ApplicantService } from '../../../services/concretes/applicant.service';
import { TokenService } from '../../../services/concretes/token.service';
import { ApplicantAboutUpdateRequest } from '../../../models/requests/applicants/applicant-about-model';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-coverletter',
  standalone: true,
  imports: [FormsModule, CommonModule,ToastModule],
  providers: [MessageService],
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
  isValid: boolean = true;

  constructor(private messageService: MessageService, private applicantService: ApplicantService, private tokenService: TokenService) { }
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
          
          this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Bilgileriniz kaydoldu.' })
        }, error => {
          console.error("Güncelleme sırasında bir hata oluştu:", error);
        })
    }
  }

}
