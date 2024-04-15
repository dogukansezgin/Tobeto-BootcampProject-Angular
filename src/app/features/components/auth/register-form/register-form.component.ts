import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/concretes/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {}
  
  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(){

    this.registerForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
      nationalIdentity: ["", Validators.required],
      dateOfBirth: ["", Validators.required],
      about: [""]
    });
  }

  registerApplicant(){
    if(this.registerForm.valid){
      let registerModel = Object.assign({},this.registerForm.value);
      registerModel.userName = `${registerModel.firstName} ${registerModel.lastName}`
      
      this.authService.registerApplicant(registerModel).subscribe(response => {
        alert("Kayıt Başarılı");
        this.router.navigate(['login']);
        console.log(response)
      }, error => {
        console.error("Kayıt işlemi başarısız", error);
      });

    }
  }


}