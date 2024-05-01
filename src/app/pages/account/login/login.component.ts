import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../features/services/concretes/auth.service';
import { Router, RouterModule } from '@angular/router';
import { UserForLoginRequest } from '../../../features/models/requests/users/user-for-login-request';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, FormsModule, InputTextModule,ButtonModule,CheckboxModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  email = "";
  password = "";
  selectedValues="";

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {

    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      let loginModel: UserForLoginRequest = Object.assign({}, this.loginForm.value);

      this.authService.login(loginModel).subscribe(response => {
        alert(response.accessToken.token)
        alert(response.accessToken.expirationDate)

        setTimeout(() => {
          window.location.reload();
        }, 500);
        this.router.navigate(["homepage"])
      }, error => {
        // console.error("Giriş işlemi başarısız", error);
        alert(`Hatalı giriş. ${error}`)
      });
    }
  }
}
