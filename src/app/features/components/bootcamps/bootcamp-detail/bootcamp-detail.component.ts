import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BootcampService } from '../../../services/concretes/bootcamp.service';
import { GetBootcampResponse } from '../../../models/responses/bootcamps/get-bootcamp-response';
import { ApplicationService } from '../../../services/concretes/application.service';
import { ApplicationPostRequest } from '../../../models/requests/applications/application-post-request';
import { CommonModule } from '@angular/common';
import { CheckApplicationResponse } from '../../../models/responses/applications/check-application-response';
import { TokenService } from '../../../services/concretes/token.service';

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
    startDate: '',
    endDate: '',

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
  
  initialApplicationState: any = "fc031faa-a232-48cf-616b-08dc5a3ae9dc"; // "Pending"
  applicationRequest!: ApplicationPostRequest;
  
  applicationInfo!: CheckApplicationResponse;
  isApplied: boolean = false;

  isApplicationButtonActive: boolean = true;

  constructor(
    private bootcampService: BootcampService,
    private activatedRoute: ActivatedRoute,
    private applicationService: ApplicationService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      this.bootcampId = params['bootcampId'];
      this.getBootcampById(this.bootcampId);
    })

    this.userId = this.tokenService.getCurrentUserId();

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
  
  getBootcampById(bootcampId: string){
    this.bootcampService.getById(bootcampId).subscribe(response =>{
      this.bootcamp = response;
      this.bootcampFullName = this.bootcamp.name;
      this.divideBootcampName();
   });
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
      this.isApplied = true;
      this.isApplicationButtonActive = false;

    }, error =>{
      this.isApplied = false;
      console.log(error)

    });
  }

  hasPermission(): boolean{
    const userRoles = this.tokenService.getUserRoles();
    return userRoles.includes("Applicants.User");
  }

  applyToBootcamp() {
    if (this.userId == "null") {
      alert("Başvuru yapmak için giriş yapmalısın.")
      return;
    }
    else {
      this.isApplied = true;
      this.isApplicationButtonActive = false;

      console.log(this.applicationRequest)
  
      this.applicationService.postApplication(this.applicationRequest).subscribe(response =>{
        alert("Başvuru başarıyla yapıldı.");
        console.log(response);

      }, error => {
        this.isApplied = false;
        this.isApplicationButtonActive = true;
        alert("Bir hata oluştu.");
        console.log(error);

      });

    }
  }



  
}
