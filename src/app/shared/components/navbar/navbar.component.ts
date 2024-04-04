
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  menuItems!: MenuItem[];
  menuItemStyles: MenuItem = {
      label: "Style",
      style: { 
        'font-size': '115%',
        'margin-left': '40px',
      }
    }
  
  
  userLogged: boolean = false;
  testText: number = 0;

  ngOnInit(): void {
    this.getMenuItems();
  }

  async getMenuItems(){
    if(this.userLogged){
      this.menuItems = [
        {
          label: "Ana Sayfa",
          icon: "pi pi-home",
          routerLink:'homepage',
          style: this.menuItemStyles.style
        },
        {
          label: "Profil",
          icon: "pi pi-user",
          routerLink:'profile',
          style: this.menuItemStyles.style
        },
        {
          label: "Kurslarım",
          icon: "pi pi-book",
          routerLink:'my-bootcamps',
          style: this.menuItemStyles.style
        },
        {
          label: "Çıkış Yap",
          icon: "pi pi-power-off",
          routerLink:'sign-out',
          style: this.menuItemStyles.style
        }
      ]
    }
    else{
      this.menuItems = [
        {
          label: "Ana Sayfa",
          icon: "pi pi-home",
          routerLink:'homepage',
          style: this.menuItemStyles.style
        },
        {
          label: "Giriş Yap",
          icon: "pi pi-sign-in",
          routerLink:'login',
          style: this.menuItemStyles.style
        },
        {
          label: "Kayıt Ol",
          icon: "pi pi-user-plus",
          routerLink:'register',
          style: this.menuItemStyles.style
        }
      ]
    }
  }

}
