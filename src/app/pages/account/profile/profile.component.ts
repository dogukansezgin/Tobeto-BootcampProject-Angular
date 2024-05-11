import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
declare var feather: any;

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputTextModule, DropdownModule, CalendarModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  profileComponentBackgroundColor: any = "#F6F6F6";
  items: string[] = ["Profilim", "Başvurularım", "Şifre Güncelle"]
  currentItem!: string;
  
  applicantUpdateForm!: FormGroup;
  genders: any[] = [
    { label: 'name', value: 'Kadın' },
    { label: 'name', value: 'Erkek' }
  ];
  date: Date = new Date(1996, 7, 3);
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
  getApplicantInfo(){
    
  }
  updateApplicant(){

  }
}
