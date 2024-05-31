
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../../features/services/concretes/auth.service';
import { Router } from '@angular/router';
import { TokenService } from '../../../features/services/concretes/token.service';
import { GetUserInfoResponse } from '../../../features/models/responses/users/get-user-info-response';
import { BootcampService } from '../../../features/services/concretes/bootcamp.service';
import { BootcampSearchItemResponse } from '../../../features/models/responses/bootcamps/bootcamp-search-item-response';
import { FormatService } from '../../../features/services/concretes/format.service';
import { ListItemsDto } from '../../../core/models/pagination/list-items-dto';
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

  bootcamps: ListItemsDto<BootcampSearchItemResponse> = {
    index: 0,
    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: [
      {
        id: '',
        name: '',
        startDate: new Date("0001-01-01T01:00:00"),
        endDate: new Date("0001-01-01T01:00:00"),
      }]
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService,
    private bootcampService: BootcampService,
    private formatService: FormatService
  ) { }

  ngOnInit(): void {
    this.setUserLoggedIn();
    this.getMenuItems();
    this.setRoleItems();
    this.getBootcamps();
  }

  setUserLoggedIn(): boolean {
    return this.userLogged = this.authService.isAuthenticated()
  }

  getBootcamps() {
    this.bootcampService.searchAllBootcamps().subscribe(response => {
      this.bootcamps = response;
    })
  }

  navigateToBootcampDetailPage(bootcamp: BootcampSearchItemResponse) {
    this.searchText = "";
    const formattedName = this.formatService.formatBootcampDetailRoute(bootcamp.name);
    this.router.navigate(['/bootcamp', formattedName]);
  }

  showMore() {
    this.searchText = "";
    this.router.navigate(['bootcamp']);
  }

  menuItemClicked(item: any) {
    if (item.label === 'Çıkış Yap') {
      this.logOut();
    }
    else if (item.label == 'Profilim') {
      this.router.navigate(['Account/Profile/'])
    }
    else if (item.label == 'Başvurularım') {
      this.router.navigate(['Account/Applications/'])
    }
    else if (item.label == 'Yönetim Paneli') {
      this.router.navigate(['admin'])
    }

  }

  logOut() {
    this.authService.logOut();
    this.router.navigate([''])
  }

  async getMenuItems() {
    if (this.userLogged) {

      this.menuItems = [
        {
          label: "Etkinlikler",
          routerLink: '/bootcamp',
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
              styleClass: 'header-text',
              disabled: true
            },
            {
              label: this.tokenService.getCurrentEmailAddress(),
              styleClass: 'subtext',
              disabled: true
            },
            {
              separator: true
            },
            // {
            //   label: 'Dashboard',
            // },
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
          routerLink: '/bootcamp',
        },
        {
          label: "Şirketler"
        }
      ]

    }
  }

  setRoleItems() {
    if (this.authService.hasRole(['Admin'])) {
      this.authItems = [
        {
          label: 'Hesabım',
          icon: 'pi pi-user',
          items: [
            {
              label: 'Merhaba',
              styleClass: 'header-text',
              disabled: true
            },
            {
              label: this.tokenService.getCurrentEmailAddress(),
              styleClass: 'subtext',
              disabled: true
            },
            {
              separator: true
            },
            {
              label: 'Yönetim Paneli',
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

  }


}
