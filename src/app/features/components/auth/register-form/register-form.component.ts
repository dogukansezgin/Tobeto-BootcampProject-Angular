import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/concretes/auth.service';
import { Router, RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, FormsModule, ButtonModule, InputTextModule, InputIconModule, IconFieldModule, CommonModule, ToastModule],
  providers: [MessageService],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }
  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern(/^[a-zA-ZÇĞİÖŞÜçğıöşü]+$/)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern(/^[a-zA-ZÇĞİÖŞÜçğıöşü]+$/)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])[a-zA-Z0-9#?!@$%^&*-ÇĞİÖŞÜçğıöşü]{8,}$/)]),
    });
  }
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }
  showLifeLong() {
    this.messageService.add({ severity: 'info', summary: 'Life', detail: 'I show for 20000ms', life: 20000 });
  }
  registerApplicant() {
    if (this.registerForm.valid) {
      console.log("Form is valid")
      let registerModel = Object.assign({}, this.registerForm.value);
      console.log(registerModel);
      this.authService.registerApplicant(registerModel).subscribe(response => {
        this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Kaydınız oluşturuldu.', life: 2000 })
        setTimeout(() => {
          this.router.navigateByUrl("auth/login")
        }, 2000);
      }, error => {
        console.error("Kayıt işlemi başarısız", error);
        this.messageService.add({ severity: 'error', summary: 'Hata', detail: 'Email adresi çoktan kayıtlı.', life: 2000 })
      });
    }
    else {
      console.log('Form is invalid');
      this.markFormGroupTouched(this.registerForm);
    }
  }
  isFieldInvalid(field: string): boolean {
    const control = this.registerForm.get(field);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }
}
