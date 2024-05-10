import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/concretes/auth.service';
import { Router, RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, FormsModule, InputTextModule, ButtonModule, CheckboxModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent implements OnInit {

  registerForm!: FormGroup;
  confirm1 = "";
  confirm2 = "";

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {

    this.registerForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  registerApplicant() {
    if (this.registerForm.valid) {
      let registerModel = Object.assign({}, this.registerForm.value);

      this.authService.registerApplicant(registerModel).subscribe(response => {
        console.log("Kayıta girdi")
        alert("Kayıt Başarılı");
        this.router.navigate(['Account/Login']);
        console.log(response)
      }, error => {
        console.error("Kayıt işlemi başarısız", error);
      });
    }
  }
}
