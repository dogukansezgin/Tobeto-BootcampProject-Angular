import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TabMenuModule } from 'primeng/tabmenu'
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, TabMenuModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  items!: MenuItem[];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Ön Yazı',
        // icon:'pi pi-question-circle',
        command: () => {
          this.router.navigate(['Account/Profile/CoverLetter']);
        }
      },
      {
        label: 'Kişisel Bilgiler',
        // icon:'pi pi-user-edit',
        command: () => {
          this.router.navigate(['Account/Profile/Personal']);
        }
      }
    ];
  }

}
