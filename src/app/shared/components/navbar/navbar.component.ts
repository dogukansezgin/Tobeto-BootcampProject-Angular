
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../../features/services/concretes/auth.service';
import { Router } from '@angular/router';
import { TokenService } from '../../../features/services/concretes/token.service';
import { UserService } from '../../../features/services/concretes/user.service';
import { GetUserInfoResponse } from '../../../features/models/responses/users/user/get-user-info-response';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  menuItems!: MenuItem[];
  authItems!: MenuItem[];
  unAuthItems!: MenuItem[];

  userLogged: boolean = false;
  applicantData!: GetUserInfoResponse;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.setUserLoggedIn();
    this.getMenuItems();
    this.setRoleItems();
    this.getApplicantData();
  }

  isNotOnAccountPages(): boolean {
    const url: string = this.router.url;
    if (url.includes('Account')) {
      return false;
    } else {
      return true;
    }
  }

  setUserLoggedIn(): boolean {
    return this.userLogged = this.authService.isAuthenticated()
  }

  getApplicantData() {
    if (this.userLogged) {
      this.userService.getUserInfo(this.tokenService.getCurrentUserId()).subscribe(response => {
        this.applicantData = response;

        this.authItems.unshift(
          {
            label: this.applicantData.userName,
            icon: "pi pi-user",
            routerLink: 'dashboard',
          })
      })

    }
  }

  menuItemClicked(item: any) {
    if (item.label === 'Çıkış Yap') {
      this.logOut();
    }

  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['homepage'])
  }

  async getMenuItems() {
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
        }
      ]

      this.authItems = [
        {
          label: "Çıkış Yap",
          icon: "pi pi-power-off",
          command: () => {
            this.logOut();
          }
        }
      ]

    }
    else {

      this.menuItems = [
        {
          label: "Ana Sayfa",
          icon: "pi pi-home",
          routerLink: 'homepage',
        }
      ]

      this.unAuthItems = [
        {
          label: "Giriş Yap",
          icon: "pi pi-sign-in",
          routerLink: 'Account/Login',
        },
        {
          label: "Kayıt Ol",
          icon: "pi pi-user-plus",
          routerLink: 'Account/Register',
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

  }


}
