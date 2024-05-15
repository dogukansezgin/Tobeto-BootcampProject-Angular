import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ApplicantService } from '../../../features/services/concretes/applicant.service';
import { TokenService } from '../../../features/services/concretes/token.service';
import { GetApplicantInfoResponse } from '../../../features/models/responses/users/applicant/get-applicant-info-response';
import { ApplicantInfoUpdateRequest } from '../../../features/models/requests/users/applicants/applicant-info-update-request';
import { GetApplicantResponse } from '../../../features/models/responses/users/applicant/get-applicant-response';
import { ApplicantUpdateRequest } from '../../../features/models/requests/users/applicants/applicant-update-request';


@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './personal.component.html',
  styleUrl: './personal.component.scss'
})
export class PersonalComponent implements OnInit {

  userId!: string;

  formSubmitted: boolean = false;
  updateForm!: FormGroup;
  applicantData!: GetApplicantResponse;
  updatedData!: ApplicantUpdateRequest;

  constructor(private applicantService: ApplicantService, private formBuilder: FormBuilder, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.createRegisterForm();
    this.getApplicantData(this.tokenService.getCurrentUserId());
  }
  createRegisterForm() {
    this.updateForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      dateOfBirth: ["", Validators.required],
      about: [""]
    });
  }
  getApplicantData(applicantId: string) {
    this.applicantService.getApplicant(applicantId).subscribe(response => {
      this.applicantData = response;
      this.updateForm.patchValue(this.applicantData);

      const formattedDateOfBirth: string = this.formatDate(this.applicantData.dateOfBirth);
      this.updateForm.patchValue({ dateOfBirth: formattedDateOfBirth });
    })

  }
  formatDate(date: Date): string {
    return date.toString().split('T')[0];
  }

  updateApp(): void {
    this.formSubmitted = true;

    if (this.updateForm.valid) {
      alert("Güncelleme işlemi başladı.");

      this.updatedData = this.updateForm.value;
      this.updatedData.id = this.applicantData.id;

      setTimeout(() => {
        this.applicantService.updateApp(this.updatedData).subscribe(response => {
          this.formSubmitted = false;
          alert("Güncelleme işlemi başarılı.");

        }, error => {
          console.error("Güncelleme işlemi sırasında bir hata oluştu:", error);
          this.formSubmitted = false;

        });

      }, 2000);

    } else {
      this.formSubmitted = false;
      alert("Hatalı alanlar.")

    }
  }
}
