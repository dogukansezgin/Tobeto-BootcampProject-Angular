import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GetApplicantResponse } from '../../../models/responses/applicant/get-applicant-response';
import { ApplicantService } from '../../../services/concretes/applicant.service';
import { TokenService } from '../../../services/concretes/token.service';
import { ApplicantUpdateRequest } from '../../../models/requests/applicants/applicant-update-request';

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
  personalInfo!: string;
  isUpdated: boolean = false;

  constructor(private applicantService: ApplicantService, private formBuilder: FormBuilder, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.createRegisterForm();
    this.getApplicantData(this.tokenService.getCurrentUserId());
  }
  createRegisterForm() {
    this.updateForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      dateOfBirth: ["", Validators.required]
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
    else {
      alert("Hatalı alanlar.")
    }
  }
}
