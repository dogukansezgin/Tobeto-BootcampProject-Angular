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
  bootcampFullName!: string;
  bootcampName!: string;
  bootcampAfterBracket!: string;

  userId!: string;
  
  initialApplicationState: any = "fc031faa-a232-48cf-616b-08dc5a3ae9dc"; // "Beklemede"
  applicationRequest!: ApplicationPostRequest;
  
  applicationInfo!: CheckApplicationResponse;
  isApplicationAlreadyExist: boolean = false;

  isBootcampActive: boolean = true;
  bootcampActiveText: string = "Aktif";
  bootcampInactiveText: string = "Sonlandı";

  constructor(
    private bootcampService: BootcampService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private applicationService: ApplicationService,
    private tokenService: TokenService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      this.bootcampId = params['bootcampId'];
      this.getBootcampById(this.bootcampId);
    })

    this.userId = this.tokenService.getCurrentUserId();

    if (this.authService.isAuthenticated()) {
      this.checkApplication(this.userId, this.bootcampId);
  
      if (this.userId != "null" && this.bootcampId) {
        this.applicationRequest = {
            applicantId: this.userId,
            bootcampId: this.bootcampId,
            applicationStateId: this.initialApplicationState
        };
        
      } else {
  
        throw new Error('applicantId and bootcampId cannot be null or undefined.');
      }
    }

  }
  
  getBootcampById(bootcampId: string){
    this.bootcampService.getById(bootcampId).subscribe(response =>{
      this.bootcamp = response;

      this.isBootcampActive = this.checkBootcampActive();
      this.bootcampFullName = this.bootcamp.name;
      this.divideBootcampName();
   });
  }

  checkBootcampActive(): boolean {
    const endDate = new Date(this.bootcamp.endDate);
    const todayDate = new Date();

    if (endDate >= todayDate){
      return true;
    } else {
      return false;
    }
  }

  divideBootcampName(){
    let bracketIndex = this.bootcampFullName.indexOf('(');
    if (bracketIndex !== -1) {
      this.bootcampName = this.bootcampFullName.substring(0, bracketIndex).trim();
      this.bootcampAfterBracket = this.bootcampFullName.substring(bracketIndex + 1, this.bootcampFullName.length - 1).trim();

    }else{
      this.bootcampName = this.bootcampFullName.trim();
    }
  }

  checkApplication(applicantId: string, bootcampId: string): void{
    this.applicationService.checkApplication(applicantId, bootcampId).subscribe(response =>{
      this.applicationInfo = response;
      this.isApplicationAlreadyExist = true;

    }, error =>{
      this.isApplicationAlreadyExist = false;
      console.log(error)

    });
  }

  isApplicationButtonDisabled(): boolean {
    if(this.isApplicationAlreadyExist || !this.isBootcampActive){
      return true;
    } else {
      return false;
    }
  }

  applyToBootcamp() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['login']);
      alert("Başvuru yapmak için giriş yapmalısın.")
      return;

    } else if (!this.authService.hasRole(["Applicants.User"])) {
      alert("Başvuru yapmak için gerekli izne sahip değilsin.")
      return;

    } else {
      this.isApplicationAlreadyExist = true;
  
      console.log(this.applicationRequest)
  
      this.applicationService.postApplication(this.applicationRequest).subscribe(response =>{
        alert("Başvuru başarıyla yapıldı.");
        console.log(response);
  
      }, error => {
        this.isApplicationAlreadyExist = false;
        alert("Bir hata oluştu.");
        console.log(error);
  
      });

    }
  }



  
}
