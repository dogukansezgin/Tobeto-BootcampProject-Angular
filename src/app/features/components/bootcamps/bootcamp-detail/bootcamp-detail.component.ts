import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BootcampGetListResponse } from '../../../models/responses/bootcamps/bootcamp-get-list-response';
import { ApplicationCreateRequest } from '../../../models/requests/applications/application-create-request';
import { CheckApplicationResponse } from '../../../models/responses/applications/check-application-response';
import { BootcampService } from '../../../services/concretes/bootcamp.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from '../../../services/concretes/application.service';
import { ApplicationStateService } from '../../../services/concretes/application-state.service';
import { TokenService } from '../../../services/concretes/token.service';
import { AuthService } from '../../../services/concretes/auth.service';
import { FormatService } from '../../../services/concretes/format.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { BlacklistService } from '../../../services/concretes/blacklist.service';

@Component({
  selector: 'app-bootcamp-detail',
  standalone: true,
  imports: [CommonModule, ToastModule],
  providers: [MessageService],
  templateUrl: './bootcamp-detail.component.html',
  styleUrl: './bootcamp-detail.component.scss'
})
export class BootcampDetailComponent implements OnInit {

  routeBootcampName!: string;
  bootcampId!: string;
  bootcamp: BootcampGetListResponse = {
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
    bootcampStateName: '',

    createdDate: new Date("0001-01-01T01:00:00")
  };
  isBootcampExists: boolean = false;
  bootcampFullName!: string;
  bootcampStartDate: Date= new Date();
  bootcampEndDate: Date = new Date();
  bootcampAfterBracket!: string;

  userId!: string;

  isInitialStateIdValid: boolean = false;
  applicationRequest!: ApplicationCreateRequest;

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

  isBlacklisted: boolean = false;

  constructor(
    private bootcampService: BootcampService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private applicationService: ApplicationService,
    private applicationStateService: ApplicationStateService,
    private tokenService: TokenService,
    private authService: AuthService,
    private formatService: FormatService,
    private messageService: MessageService,
    private blacklistService: BlacklistService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.url.subscribe(params => {
      var parameters = params;

      if (parameters !== null) {
        this.routeBootcampName = parameters[1].toString();
        this.routeBootcampName = this.formatService.convertUrlToName(this.routeBootcampName)

        this.getBootcampByName(this.routeBootcampName);
      } else {
        console.error('Bootcamp ID not found');

      }
    });

    this.userId = this.tokenService.getCurrentUserId();

console.log(this.isBlacklisted)
console.log(this.userId)
    this.checkBlacklist(this.userId);
console.log(this.isBlacklisted)
  }
  
  getBootcampByName(bootcampName: string) {
    this.bootcampService.getByName(this.routeBootcampName).subscribe(response => {
      this.bootcamp = response;
      this.bootcampId = response.id;
      this.bootcampFullName = this.bootcamp.name;
      this.bootcampStartDate = this.bootcamp.startDate;
      this.bootcampEndDate = this.bootcamp.endDate;

      this.isBootcampActive = this.checkBootcampActive();

      this.isBootcampExists = true;

    }, error => {
      this.bootcampInactiveText = "Bootcamp Bulunamadı";

    }).add(() => {
      if (this.authService.isAuthenticated()) {
        if (this.userId != "null" && this.isBootcampExists) {
          this.checkApplication(this.userId, this.bootcampId);

          this.applicationStateService.getByName("Değerlendirme").subscribe(response => {
            this.isInitialStateIdValid = true;


            this.applicationRequest = {
              applicantId: this.userId,
              bootcampId: this.bootcampId,
              applicationStateId: response.id,
            };
          });


        } else {
          console.error('applicantId and bootcampId cannot be null or undefined.');

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

  checkApplication(applicantId: string, bootcampId: string): void {
    this.applicationService.checkApplication(applicantId, bootcampId).subscribe(response => {
      this.applicationInfo = response;
      this.isApplicationAlreadyExist = true;

    }, error => {
      this.isApplicationAlreadyExist = false;

    });
  }

  checkBlacklist(applicantId: string): void {
    this.blacklistService.getByApplicantId(applicantId).subscribe(response => {
      console.log(response)
      
      this.isBlacklisted = true;
    }, error => {
      this.isBlacklisted = false;

    })
    
  }

  // isApplicationButtonDisabled(): boolean {
  //   if (this.isApplicationAlreadyExist || !this.isBootcampActive ||
  //     !this.isBootcampExists || !this.isInitialStateIdValid) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  applyToBootcamp() {
    if (!this.authService.isAuthenticated()) {
      this.messageService.add({ severity: 'warn', summary: 'Uyarı', detail: 'Başvuru yapmak için giriş yapmalısın.', life: 4000 });
      return;

    } else if (this.isApplicationAlreadyExist == true) {
      this.messageService.add({ severity: 'warn', summary: 'Uyarı', detail: 'Halihazırda bir başvurun var.', life: 4000 });
      return;

    } else if (!this.authService.hasRole(["Applicants.User"])) {
      this.messageService.add({ severity: 'warn', summary: 'Uyarı', detail: 'Başvurmak için öğrenci olmalısın.', life: 4000 });
      return;

    } else if (this.isBlacklisted) {
      this.messageService.add({ severity: 'error', summary: 'Hata', detail: 'Destek hattı ile iletişime geçin.', life: 4000 });
      return;

    } else {
      this.isApplicationAlreadyExist = true;

      console.log(this.applicationRequest)

      this.applicationService.createApplication(this.applicationRequest).subscribe(response => {
        this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Başvuru başarıyla yapıldı.', life: 4000 });
        console.log(response);

      }, error => {
        this.messageService.add({ severity: 'error', summary: 'Hata', detail: 'Bir hata oluştu.', life: 4000 });

      });

    }
  }

}
