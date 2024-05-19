import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GetApplicantInfoResponse } from '../../../../models/responses/users/applicant/get-applicant-info-response';
import { ApplicantInfoUpdateRequest } from '../../../../models/requests/users/applicants/applicant-info-update-request';
import { ApplicantService } from '../../../../services/concretes/applicant.service';
import { TokenService } from '../../../../services/concretes/token.service';
import { GetApplicantResponse } from '../../../../models/responses/users/applicant/get-applicant-response';


@Component({
  selector: 'app-applicant-info-update-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './applicant-info-update-form.component.html',
  styleUrl: './applicant-info-update-form.component.scss'
})
export class ApplicantInfoUpdateFormComponent implements OnInit {

  userId!: string;

  formSubmitted: boolean = false;
  updateForm!: FormGroup;
  applicantData!: GetApplicantResponse;
  updatedData!: ApplicantInfoUpdateRequest;

  constructor(private applicantService: ApplicantService, private formBuilder: FormBuilder, private tokenService: TokenService) {}

  ngOnInit(): void {
    this.createRegisterForm();
    this.getApplicantData(this.tokenService.getCurrentUserId());

  }

  createRegisterForm(){

    this.updateForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      nationalIdentity: ["", Validators.required],
      dateOfBirth: ["", Validators.required],
      about: [""]
    });

  }

  getApplicantData(applicantId: string) {
    this.applicantService.getApplicant(applicantId).subscribe(response =>{
      this.applicantData = response;
      this.updateForm.patchValue(this.applicantData);

      const formattedDateOfBirth: string = this.formatDate(this.applicantData.dateOfBirth);
      this.updateForm.patchValue( { dateOfBirth: formattedDateOfBirth } );
    })

  }

  formatDate(date: Date): string {
    return date.toString().split('T')[0];
  }

  updateApplicant(): void{
    this.formSubmitted = true;
    
    if(this.updateForm.valid){
      alert("Güncelleme işlemi başladı.");

      this.updatedData = this.updateForm.value;
      this.updatedData.id = this.applicantData.id;
      this.updatedData.userName = `${this.updatedData.firstName} ${this.updatedData.lastName}`

      setTimeout(() => {
        this.applicantService.updateApplicant(this.updatedData).subscribe(response =>{
          this.formSubmitted = false;
          alert("Güncelleme işlemi başarılı.");

        }, error => {
          console.error("Güncelleme işlemi sırasında bir hata oluştu:", error);
          this.formSubmitted = false;

        });
        
      }, 2000);

    }else{
      this.formSubmitted = false;
      alert("Hatalı alanlar.")

    }
  }


}
