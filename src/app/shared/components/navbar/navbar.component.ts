
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  menuItems!: MenuItem[];
  userLogged: boolean = true;

  ngOnInit(): void {
    this.getMenuItems();
  }

  async getMenuItems(){
    if(this.userLogged){
      this.menuItems = [
        {
          label: "Ana Sayfa",
          icon: "pi pi-home",
          routerLink:'homepage'
        },
        {
          label: "Profil",
          icon: "pi pi-user",
          routerLink:'profile'
        },
        {
          label: "Kurslarım",
          icon: "pi pi-book",
          routerLink:'rented-car'
        },
        {
          label: "Çıkış Yap",
          id: 'asd',
          icon: "pi pi-power-off",
          routerLink:'sign-out'
        }
      ]
    }
    else{
      this.menuItems = [
        {
          label: "Ana Sayfa",
          icon: "pi pi-home",
          routerLink:'homepage'
        },
        {
          label: "Giriş Yap",
          icon: "pi pi-sign-in",
          routerLink:'login'
        },
        {
          label: "Kayıt Ol",
          icon: "pi pi-user-plus",
          routerLink:'register'
        }
      ]
    }
  }

}
