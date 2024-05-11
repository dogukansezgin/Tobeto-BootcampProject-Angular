import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BootcampService } from '../../../services/concretes/bootcamp.service';
import { GetBootcampResponse } from '../../../models/responses/bootcamps/get-bootcamp-response';
import { ApplicationService } from '../../../services/concretes/application.service';
import { ApplicationPostRequest } from '../../../models/requests/applications/application-post-request';
import { CommonModule } from '@angular/common';
import { CheckApplicationResponse } from '../../../models/responses/applications/check-application-response';
import { TokenService } from '../../../services/concretes/token.service';
import { AuthService } from '../../../services/concretes/auth.service';

@Component({
  selector: 'app-bootcamp-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bootcamp-detail.component.html',
  styleUrl: './bootcamp-detail.component.scss'
})
export class BootcampDetailComponent implements OnInit {

  bootcampId!: string;
  bootcamp: GetBootcampResponse = {
    id: '',
    name: '',
    startDate: new Date("0001-01-01T01:00:00"),
    endDate: new Date("0001-01-01T01:00:00"),

    instructorId: '',
    instructorUserName: '',
    instructorFirstName: '',
    instructorLastName: '',
    instructorCompanyName: '',

    bootcampStateId: '',
    bootcampStateName: ''
  };
  isBootcampExists: boolean = false;
  bootcampFullName!: string;
  bootcampName!: string;
  bootcampAfterBracket!: string;

  userId!: string;

  initialApplicationState: any = "fc031faa-a232-48cf-616b-08dc5a3ae9dc"; // "Beklemede"
  applicationRequest!: ApplicationPostRequest;

  applicationInfo: CheckApplicationResponse = {
    id: '',
    applicantId: '',
    bootcampId: '',
    applicationStateId: '',
    applicationStateName: ''
  };
  isApplicationAlreadyExist: boolean = false;

  isBootcampActive: boolean = false;
  bootcampActiveText: string = "Başvurular Aktif";
  bootcampInactiveText: string = "Başvurular Kapandı";

  constructor(
    private bootcampService: BootcampService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private applicationService: ApplicationService,
    private tokenService: TokenService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.bootcampId = params['bootcampId'];
      this.getBootcampById(this.bootcampId);
    })

    this.userId = this.tokenService.getCurrentUserId();



  }

  getBootcampById(bootcampId: string) {
    this.bootcampService.getById(bootcampId).subscribe(response => {
      this.bootcamp = response;

      this.isBootcampActive = this.checkBootcampActive();
      this.bootcampFullName = this.bootcamp.name;
      this.divideBootcampName();

      this.isBootcampExists = true;

    }, error => {
      this.bootcampInactiveText = "Bootcamp Bulunamadı";

    }).add(() => {
      if (this.authService.isAuthenticated()) {
        if (this.userId != "null" && this.isBootcampExists) {
          this.checkApplication(this.userId, this.bootcampId);

          this.applicationRequest = {
            applicantId: this.userId,
            bootcampId: this.bootcampId,
            applicationStateId: this.initialApplicationState
          };

        } else {
          // console.log(new Error('applicantId and bootcampId cannot be null or undefined.'));

        }
      }
    });
  }

  checkBootcampActive(): boolean {
    const startDate = new Date(this.bootcamp.startDate);
    let todayDate = new Date();
    todayDate.setDate(todayDate.getDate() + 15);

    if (startDate >= todayDate) {
      return true;
    } else {
      return false;
    }
  }

  divideBootcampName() {
    let bracketIndex = this.bootcampFullName.indexOf('(');
    if (bracketIndex !== -1) {
      this.bootcampName = this.bootcampFullName.substring(0, bracketIndex).trim();
      this.bootcampAfterBracket = this.bootcampFullName.substring(bracketIndex + 1, this.bootcampFullName.length - 1).trim();

    } else {
      this.bootcampName = this.bootcampFullName.trim();
    }
  }

  checkApplication(applicantId: string, bootcampId: string): void {
    this.applicationService.checkApplication(applicantId, bootcampId).subscribe(response => {
      this.applicationInfo = response;
      this.isApplicationAlreadyExist = true;

    }, error => {
      this.isApplicationAlreadyExist = false;

    });
  }

  isApplicationButtonDisabled(): boolean {
    if (this.isApplicationAlreadyExist || !this.isBootcampActive || !this.isBootcampExists) {
      return true;
    } else {
      return false;
    }
  }

  applyToBootcamp() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['Account/Login']);
      alert("Başvuru yapmak için giriş yapmalısın.")
      return;

    } else if (this.isApplicationAlreadyExist == true) {
      alert("Halihazırda bir başvurun var.")
      return;

    } else if (!this.authService.hasRole(["Applicants.User"])) {
      alert("Başvuru yapmak için gerekli izne sahip değilsin.")
      return;

    } else {
      this.isApplicationAlreadyExist = true;

      console.log(this.applicationRequest)

      this.applicationService.postApplication(this.applicationRequest).subscribe(response => {
        alert("Başvuru başarıyla yapıldı.");
        console.log(response);

      }, error => {
        alert("Bir hata oluştu.");

      });

    }
  }




}
