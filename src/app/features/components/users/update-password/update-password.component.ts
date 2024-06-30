import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TokenService } from '../../../services/concretes/token.service';
import { ApplicantPasswordUpdateRequest } from '../../../models/requests/applicants/applicant-password-update-request';
import { ApplicantService } from '../../../services/concretes/applicant.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-update-password',
  standalone: true,
  imports: [InputIconModule, IconFieldModule, InputTextModule, ReactiveFormsModule, RouterModule, FormsModule, InputTextModule, ButtonModule, CommonModule,ToastModule],
  providers:[MessageService],
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.scss'
})
export class UpdatePasswordComponent implements OnInit {

  applicantId!: string;

  constructor(private formBuilder: FormBuilder, private tokenService: TokenService,private applicantService:ApplicantService,private messageService:MessageService) { }
  ngOnInit(): void {
    this.createPlatform();
    this.applicantId=this.tokenService.getCurrentUserId();
  }

  updateForm!: FormGroup;
  errorMessage!: string;

  createPlatform() {
    this.updateForm = this.formBuilder.group({
      currentPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])[a-zA-Z0-9#?!@$%^&*-ÇĞİÖŞÜçğıöşü]{8,}$/)])
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.updateForm.get(field);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }

  updatePassword() {
    if (this.updateForm.valid) {
      let passwordUpdateModel: ApplicantPasswordUpdateRequest = Object.assign({}, this.updateForm.value);
      passwordUpdateModel.id=this.applicantId;
      console.log("Gönderilen : "+passwordUpdateModel);
      this.applicantService.updateApplicantPassword(passwordUpdateModel).subscribe(response=>{
        this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Şireniz başarıyla güncellendi.', life: 2000 })
        this.updateForm.reset({
          currentPassword: '',
          newPassword: ''
        });
      },error=>{
        this.messageService.add({ severity: 'error', summary: 'Hata', detail: 'Mevcut şifreniz hatalı girildi.', life: 2000 })
      }
    )
    }
    else {
      console.log('Form is invalid');
      this.markFormGroupTouched(this.updateForm);
    }
  }

}
