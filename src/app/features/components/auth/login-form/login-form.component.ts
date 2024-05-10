import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/concretes/auth.service';
import { Router, RouterModule } from '@angular/router';
import { UserForLoginRequest } from '../../../models/requests/users/user-for-login-request';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, FormsModule, InputTextModule, ButtonModule, CheckboxModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent implements OnInit {

  loginForm!: FormGroup;
  remember = "";

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
        this.router.navigate([""])
      }, error => {
        alert(`Hatalı giriş. ${error}`)
      });
    }
    // else if(this.loginForm.get('email')?.errors){

    // }
  }
}
