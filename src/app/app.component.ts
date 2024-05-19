import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SharedModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  private hiddenRoutes: string[] = ['/admin', '/Account'];

  constructor(private router: Router) {}

  isNotOnRestrictedRoutes(): boolean {
    return !this.hiddenRoutes.some(route => this.router.url.includes(route));
  }
}
