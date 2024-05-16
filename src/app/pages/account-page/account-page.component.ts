import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileComponent } from '../account/profile/profile.component';
import { GetApplicantResponse } from '../../features/models/responses/users/applicant/get-applicant-response';
import { ApplicantService } from '../../features/services/concretes/applicant.service';
import { TokenService } from '../../features/services/concretes/token.service';
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
  applicantData!:GetApplicantResponse;
  applicantEmail!:string;

  constructor(private applicantService: ApplicantService, private tokenService: TokenService){}

  ngOnInit(): void {
    feather.replace();
    this.getApplicantData(this.tokenService.getCurrentUserId());
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
  getApplicantData(applicantId: string) {
    this.applicantService.getApplicant(applicantId).subscribe(response => {
      this.applicantData = response;
      this.applicantEmail=response.email;
    })
  }
}
