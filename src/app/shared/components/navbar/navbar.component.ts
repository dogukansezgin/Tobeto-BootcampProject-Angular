
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../../features/services/concretes/auth.service';
import { Router } from '@angular/router';

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


  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.setUserLoggedIn();
    this.getMenuItems();
  }


  setUserLoggedIn(): boolean{
    return this.userLogged = this.authService.isAuthenticated()
  }

  logOut(){
    this.authService.logOut();
    this.router.navigate(['homepage'])
  }

  async getMenuItems(){
    console.log(this.userLogged)
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
          routerLink:'applied-bootcamps',
          style: this.menuItemStyles.style
        },
        {
          label: "Çıkış Yap",
          icon: "pi pi-power-off",
          style: this.menuItemStyles.style,
          command:() =>{
            this.logOut()
          }
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
