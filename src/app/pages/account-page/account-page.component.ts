import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { GetApplicantResponse } from '../../features/models/responses/applicant/get-applicant-response';
import { ApplicantService } from '../../features/services/concretes/applicant.service';
import { TokenService } from '../../features/services/concretes/token.service';
import { filter } from 'rxjs';
import { AuthService } from '../../features/services/concretes/auth.service';
declare var feather: any;

@Component({
  selector: 'app-account-page',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet],
  templateUrl: './account-page.component.html',
  styleUrl: './account-page.component.scss'
})
export class AccountPageComponent implements OnInit {

  items: string[] = ["Profilim", "Başvurularım", "Şifre Güncelle"]
  currentItem!: string;
  applicantData!: GetApplicantResponse;
  applicantEmail!: string;
  url!: string;

  isProfileButtonActive!: boolean;
  isApplicationButtonActive!: boolean;

  constructor(
    private applicantService: ApplicantService,
    private tokenService: TokenService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.setUrl();
    this.setCurrentItem();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.setUrl();
      this.setCurrentItem();
    });


    feather.replace();
    this.getApplicantData(this.tokenService.getCurrentUserId());
  }

  menuItemClicked(item: string) {
    this.setUrl(); // URL'i güncelleyin

    this.setCurrentItem(); // Aktif menü öğesini güncelleyin


    if (item === 'Profile') {
      this.router.navigate(['Account/Profile']);
    } else if (item === 'Applications') {
      this.router.navigate(['Account/Applications']);
    } else if (item === 'Şifre Güncelle') {
      // Şifre güncelleme sayfasına yönlendirme
    }
  }

  setCurrentItem() {
    if (this.url.includes('Profile')) {
      this.isApplicationButtonActive = false;
      this.isProfileButtonActive = true;
    } else if (this.url.includes('Applications')) {
      this.isProfileButtonActive = false;
      this.isApplicationButtonActive = true;
    }
  }
  logOut() {
    this.authService.logOut();
    this.router.navigate([''])
  }

  setUrl() {
    const currentRouteSnapshot: ActivatedRouteSnapshot = this.router.routerState.snapshot.root;
    const urlTree = this.router.createUrlTree(currentRouteSnapshot.url);
    this.url = this.router.serializeUrl(urlTree);
  }

  getCurrentItemClass(item: string) {
    if (this.currentItem == item) {
      return "list-item list-group-item-action list-group-item active"
    }
    return "list-item list-group-item-action list-group-item"
  }
  setNullCurrentItem() {
    this.currentItem = "";
    this.logOut();
  }
  getApplicantData(applicantId: string) {
    this.applicantService.getApplicant(applicantId).subscribe(response => {
      this.applicantData = response;
      this.applicantEmail = response.email;
    })
  }

}
