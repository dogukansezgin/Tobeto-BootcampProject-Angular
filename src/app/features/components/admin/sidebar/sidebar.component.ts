import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/concretes/auth.service';
import { CommonModule } from '@angular/common';
declare var feather:any;

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  encapsulation:ViewEncapsulation.None
})
export class SidebarComponent implements OnInit{

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    feather.replace();
  }

  CheckRoles(roles: string[]): boolean {
    feather.replace();
    return this.authService.hasRole(roles);
  }
  
}
