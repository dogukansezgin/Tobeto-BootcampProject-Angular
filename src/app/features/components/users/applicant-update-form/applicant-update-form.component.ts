import { Component, OnInit } from '@angular/core';
import { ApplicantInfoUpdateRequest } from '../../../models/requests/users/applicants/applicant-info-update-request';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApplicantService } from '../../../services/concretes/applicant.service';
import { LocalStorageService } from '../../../services/concretes/local-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { GetApplicantInfoResponse } from '../../../models/responses/users/applicant/get-applicant-info-response';

@Component({
  selector: 'app-applicant-update-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './applicant-update-form.component.html',
  styleUrl: './applicant-update-form.component.scss'
})
export class ApplicantUpdateFormComponent implements OnInit {

  jwtHelper:JwtHelperService = new JwtHelperService;
  token: any;
  userId!: string;

  formSubmitted: boolean = false;
  updateForm!: FormGroup;
  applicantData!: GetApplicantInfoResponse;
  updatedData!: ApplicantInfoUpdateRequest;

  constructor(private applicantService: ApplicantService, private formBuilder: FormBuilder, private localStorage: LocalStorageService) {}

  ngOnInit(): void {
    this.createRegisterForm();
    this.getApplicantData(this.getCurrentUserId());

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
  
  // decode token
  getDecodedToken(){
    try{
      this.token = this.localStorage.getToken();
      return this.jwtHelper.decodeToken(this.token)
    }
    catch(error){
      return error;
    }
  }
  // set userId from decoded token
  getCurrentUserId(): string{
    var decoded = this.getDecodedToken();
    var propUserId = Object.keys(decoded).filter(x=>x.endsWith("/nameidentifier"))[0]
    return this.userId = decoded[propUserId]
  }


  getApplicantData(applicantId: string) {
    this.applicantService.getApplicantInfo(applicantId).subscribe(response =>{
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
