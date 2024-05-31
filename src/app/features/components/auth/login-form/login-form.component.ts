import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/concretes/auth.service';
import { Router, RouterModule } from '@angular/router';
import { UserForLoginRequest } from '../../../models/requests/users/user-for-login-request';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
declare var feather: any;

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ToastModule, InputIconModule, IconFieldModule, InputTextModule, ReactiveFormsModule, RouterModule, FormsModule, InputTextModule, ButtonModule, CheckboxModule, CommonModule],
  providers: [MessageService],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent implements OnInit {

  loginForm!: FormGroup;
  remember = "";
  errorMessage!: string;

  constructor(private messageService: MessageService, private authService: AuthService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    feather.replace();

    this.createLoginForm();

  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])[a-zA-Z0-9#?!@$%^&*-ÇĞİÖŞÜçğıöşü]{8,}$/)])
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

  login() {
    if (this.loginForm.valid) {
      let loginModel: UserForLoginRequest = Object.assign({}, this.loginForm.value);
      this.authService.login(loginModel).subscribe(response => {
        this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Giriş yapıldı.' })
        setTimeout(()=>{
          this.router.navigate([""])
        },1000);
      }, error => {
        this.errorMessage = "E-posta adresin ve/veya şifren hatalı";
      })
    }
    else {
      console.log('Form is invalid');
      this.markFormGroupTouched(this.loginForm);
    }
  }
  isFieldInvalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }
}
