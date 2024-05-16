import { Component } from '@angular/core';
import { SidebarComponent } from '../../features/components/admin/sidebar/sidebar.component';
import { NavbarComponent } from '../../features/components/admin/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [SidebarComponent, NavbarComponent, RouterOutlet],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss'
})
export class AdminPageComponent {

}
