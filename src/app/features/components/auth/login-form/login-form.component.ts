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
declare var feather: any;

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [InputIconModule, IconFieldModule, InputTextModule, ReactiveFormsModule, RouterModule, FormsModule, InputTextModule, ButtonModule, CheckboxModule, CommonModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent implements OnInit {

  loginForm!: FormGroup;
  remember = "";
  errorMessage!: string ;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    feather.replace();
    this.createLoginForm();

  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
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
        // alert(response.accessToken.token)
        // alert(response.accessToken.expirationDate)
        setTimeout(() => {
          window.location.reload();
        }, 500);
        this.router.navigate([""])
      }, error => {
        this.errorMessage="E-posta adresin ve/veya şifren hatalı";
        console.log(error);    
      });
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
