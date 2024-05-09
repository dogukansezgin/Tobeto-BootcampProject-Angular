
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../../features/services/concretes/auth.service';
import { Router } from '@angular/router';
import { TokenService } from '../../../features/services/concretes/token.service';
import { UserService } from '../../../features/services/concretes/user.service';
import { GetUserInfoResponse } from '../../../features/models/responses/users/user/get-user-info-response';
import { BootcampService } from '../../../features/services/concretes/bootcamp.service';
import { BootcampListItemDto } from '../../../features/models/responses/bootcamps/bootcamp-list-item-dto';
import { BootcampSearchItemResponse } from '../../../features/models/responses/bootcamps/bootcamp-search-item-response';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  menuItems!: MenuItem[];
  authItems!: MenuItem[];

  searchText = "";

  userLogged: boolean = false;
  applicantData!: GetUserInfoResponse;

  bootcamps!: BootcampListItemDto<BootcampSearchItemResponse>

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private tokenService: TokenService,
    private bootcampService: BootcampService
  ) { }

  ngOnInit(): void {
    this.setUserLoggedIn();
    this.getMenuItems();
    this.setRoleItems();
    this.getApplicantData();
    this.getBootcamps();
  }

  isNotOnAccountPages(): boolean {
    const url: string = this.router.url;
    if (url.includes('Login') || url.includes('Register')) {
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

      })

    }
  }

  getBootcamps() {
    this.bootcampService.searchAllBootcamps().subscribe(response => {
      this.bootcamps = response;
      console.log(response)
    })
  }

  navigateToBootcampDetail(bootcamp: BootcampSearchItemResponse) {
    this.searchText = "";
    this.router.navigate(['/p', bootcamp.id])
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
          label: "Etkinlikler",
          routerLink: '../../bootcamps',
        },
        {
          label: "Şirketler"
        }
      ]

      this.authItems = [
        {
          label: 'Hesabım',
          icon: 'pi pi-user',
          items: [
            {
              label: 'Merhaba',
            },
            {
              separator: true
            },
            {
              label: 'Dashboard',
            },
            {
              label: 'Profilim',
            },
            {
              label: 'Başvurularım',
            },
            {
              label: 'Ayarlar',
            },
            {
              separator: true
            },
            {
              label: 'Çıkış Yap',
            },
          ]
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
          label: "Şirketler"
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
