import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileComponent } from '../account/profile/profile.component';
declare var feather: any;

@Component({
  selector: 'app-account-page',
  standalone: true,
  imports: [CommonModule,ProfileComponent],
  templateUrl: './account-page.component.html',
  styleUrl: './account-page.component.scss'
})
export class AccountPageComponent implements OnInit{
  profileComponentBackgroundColor: any = "#F6F6F6";
  items: string[] = ["Profilim", "Başvurularım", "Şifre Güncelle"]
  currentItem!: string;

  ngOnInit(): void {
    feather.replace();

  }
  setCurrentItem(item: string) {
    this.currentItem = item;
  }
  getCurrentItemClass(item: string) {
    if (this.currentItem == item) {
      return "list-item list-group-item-action list-group-item active"
    }
    return "list-item list-group-item-action list-group-item"
  }
  setNullCurrentItem() {
    this.currentItem = "";
  }
}
