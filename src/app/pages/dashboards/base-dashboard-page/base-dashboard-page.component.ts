import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../features/services/concretes/auth.service';

@Component({
  selector: 'app-base-dashboard-page',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './base-dashboard-page.component.html',
  styleUrl: './base-dashboard-page.component.scss'
})
export class BaseDashboardPageComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    debugger
    this.routeByRole();
  }

  routeByRole() {
    alert("çalıştı")
    console.log(this.authService.hasRole(['Admin']))
    console.log(this.authService.hasRole(['Applicants.User']))
    if (this.authService.hasRole(['Admin'])) {
      this.router.navigate(['dashboard/admin']);

    } else if (this.authService.hasRole(['Applicants.User'])) {
      this.router.navigate(['dashboard/user']);

    } else {
      this.router.navigate(['unauthorized']);

    }
  }

}
