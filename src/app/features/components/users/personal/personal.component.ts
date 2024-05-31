import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { GetApplicantResponse } from '../../../models/responses/applicant/get-applicant-response';
import { ApplicantService } from '../../../services/concretes/applicant.service';
import { TokenService } from '../../../services/concretes/token.service';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { ApplicantInfoUpdateRequest } from '../../../models/requests/applicants/applicant-info-update-request';

@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, InputTextModule, CalendarModule],
  templateUrl: './personal.component.html',
  styleUrl: './personal.component.scss'
})
export class PersonalComponent implements OnInit {

  updateForm!:FormGroup;
  applicantData!: GetApplicantResponse;
  updateInfoRequest!: ApplicantInfoUpdateRequest;

  personalInfo!: string;
  isUpdated: boolean = false;

  constructor(private applicantService: ApplicantService, private formBuilder: FormBuilder, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.createUpdateForm();
    this.getApplicantData(this.tokenService.getCurrentUserId());
  }
  createUpdateForm() {
    this.updateForm = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      nationalIdentity: new FormControl('', [Validators.pattern(/^\d{11}$/)]),
      dateOfBirth: new FormControl('', Validators.required)
    });
  }
  getApplicantData(applicantId: string) {
    this.applicantService.getApplicant(applicantId).subscribe(response => {
      this.applicantData = response;
      this.updateForm.patchValue(this.applicantData);
      const formattedDateOfBirth: string = this.formatDate(this.applicantData.dateOfBirth);
      this.updateForm.patchValue({ dateOfBirth: new Date(formattedDateOfBirth) });
    })

  }
  formatDate(date: Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    return `${year}-${month}-${day}`; // ISO formatı
  }

  updateApplicant(): void {
    if (this.updateForm.valid) {
      console.log("Form is valid");
      this.updateInfoRequest =Object.assign({},this.updateForm.value);
      this.updateInfoRequest.id=this.applicantData.id;
      if(this.updateInfoRequest.nationalIdentity?.length==0){
        this.updateInfoRequest.nationalIdentity=undefined;
      }
      this.applicantService.updateInfoApplicant(this.updateInfoRequest).subscribe(response => {
        console.log("Güncellendi");
      }, error => {
        console.error("Güncelleme sırasında bir hata oluştu:", error);
      });
    }
    else {
      alert("Hatalı alanlar.")
    }
  }
  isFieldInvalid(field: string): boolean {
    const control = this.updateForm.get(field);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }
}
