import { Component } from '@angular/core';
import { LoginFormComponent } from '../../../features/components/auth/login-form/login-form.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginFormComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

}
