
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../../features/services/concretes/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  menuItems!: MenuItem[];
  filterText = "";

  userLogged: boolean = false;


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.setUserLoggedIn();
    this.getMenuItems();
    this.setRoleItems();
  }


  setUserLoggedIn(): boolean {
    return this.userLogged = this.authService.isAuthenticated()
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['homepage'])
  }

  async getMenuItems() {
    console.log(this.userLogged)
    if (this.userLogged) {
      this.menuItems = [
        {
          label: "Ana Sayfa",
          icon: "pi pi-home",
          routerLink: 'homepage',
        },
        {
          label: "Profil",
          icon: "pi pi-user",
          routerLink: 'profile',
        },
        {
          label: "Kurslarım",
          icon: "pi pi-book",
          routerLink: 'applied-bootcamps',
        },
        {
          label: "Çıkış Yap",
          icon: "pi pi-power-off",
          command: () => {
            this.logOut()
          }
        }
      ]
    }
    else {
      this.menuItems = [
        {
          label: "Etkinlikler",
          routerLink: '../../bootcamps',
        },
        {
          label:"Şirketler"
        }
      ]
    }
  }

  setRoleItems() {
    if (this.authService.hasRole(['Admin'])) {
      this.menuItems.push(
        {
          label: "Yönetim Paneli",
          icon: "pi pi-wrench",
          routerLink: 'dashboard/admin',
        })
    }
    else if (this.authService.hasRole(['Applicants.User'])) {
      this.menuItems.splice(2, 0,
        {
          label: "Ayarlar",
          icon: "pi pi-cog",
          routerLink: 'dashboard/user',
        })
    }
  }


}
