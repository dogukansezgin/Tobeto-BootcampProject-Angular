import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ApplicantService } from '../../../features/services/concretes/applicant.service';
import { TokenService } from '../../../features/services/concretes/token.service';
import { GetApplicantInfoResponse } from '../../../features/models/responses/users/applicant/get-applicant-info-response';
import { ApplicantInfoUpdateRequest } from '../../../features/models/requests/users/applicants/applicant-info-update-request';
import { GetApplicantResponse } from '../../../features/models/responses/users/applicant/get-applicant-response';
import { ApplicantUpdateRequest } from '../../../features/models/requests/users/applicants/applicant-update-request';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './personal.component.html',
  styleUrl: './personal.component.scss'
})
export class PersonalComponent implements OnInit {

  updateForm!: FormGroup;
  applicantData!: GetApplicantResponse;
  updatedData!: ApplicantUpdateRequest;
  personalInfo!:string;
  isUpdated:boolean=false;

  constructor(private applicantService: ApplicantService, private formBuilder: FormBuilder, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.createRegisterForm();
    this.getApplicantData(this.tokenService.getCurrentUserId());
  }
  createRegisterForm() {
    this.updateForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      dateOfBirth:["", Validators.required]
      // city:["",Validators.required]
    });
  }
  getApplicantData(applicantId: string) {
    this.applicantService.getApplicant(applicantId).subscribe(response => {
      this.applicantData = response;
      // if(this.applicantData.dateOfBirth!==null){
      //   this.applicantData.dateOfBirth= this.datePipe.transform(new Date(this.applicantData.dateOfBirth.toString()),'yyyy-MM-dd');
      // }

      this.updateForm.patchValue(this.applicantData);
      const formattedDateOfBirth: string = this.formatDate(this.applicantData.dateOfBirth);
      this.updateForm.patchValue({ dateOfBirth: formattedDateOfBirth });
    })

  }
  formatDate(date: Date): string {
    return date.toString().split('T')[0];
  }

  updateApplicant(): void {
    if (this.updateForm.valid) {
      this.updatedData = this.updateForm.value;
      this.updatedData.id = this.applicantData.id;
      this.applicantService.updateApplicant(this.updatedData).subscribe(response => {
        console.log("Güncellendi");
      }, error => {
        console.error("Güncelleme sırasında bir hata oluştu:", error);
      });
    }
    else{
      alert("Hatalı alanlar.")
    }
  }
}
