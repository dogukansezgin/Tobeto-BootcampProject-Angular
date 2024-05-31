import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SharedModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  private hiddenRoutes: string[] = ['/admin', '/Auth','/detail'];

  constructor(private router: Router) {}

  ngOnInit() {

    // Router değişiminde sayfa başına kaydırma.
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    });
    
  }

  isNotOnRestrictedRoutes(): boolean {
    return !this.hiddenRoutes.some(route => this.router.url.includes(route));
  }
}
