import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BootcampService } from '../../../services/concretes/bootcamp.service';
import { GetBootcampResponse } from '../../../models/responses/bootcamps/get-bootcamp-response';
import { ApplicationService } from '../../../services/concretes/application.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from '../../../services/concretes/local-storage.service';
import { ApplicationPostRequest } from '../../../models/requests/applications/application-post-request';
import { CommonModule } from '@angular/common';
import { CheckApplicationResponse } from '../../../models/responses/applications/check-application-response';

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

  jwtHelper:JwtHelperService = new JwtHelperService;
  token: any;
  userId!: string;
  
  initialApplicationState: any = "fc031faa-a232-48cf-616b-08dc5a3ae9dc"; // "Pending"
  applicationRequest!: ApplicationPostRequest;
  
  isApplied: boolean = false;
  applicationInfo!: CheckApplicationResponse;

  constructor(
    private bootcampService: BootcampService,
    private activatedRoute: ActivatedRoute,
    private localStorage: LocalStorageService,
    private applicationService: ApplicationService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      this.bootcampId = params['bootcampId'];
      this.getBootcampById(this.bootcampId);
    })

    this.userId = this.getCurrentUserId();
    console.log(this.userId)

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
    console.log(this.applicationRequest)
  
    console.log(this.userId)
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

  // decode token
  getDecodedToken(){
    try{
      this.token = this.localStorage.getToken();
      return this.jwtHelper.decodeToken(this.token)
    }
    catch(error){
      return error;
    }
  }
  // set userId from decoded token
  getCurrentUserId(): string{
    try{
      var decoded = this.getDecodedToken();
      var propUserId = Object.keys(decoded).filter(x=>x.endsWith("/nameidentifier"))[0]
      return this.userId = decoded[propUserId]

    }
    catch(error){
      console.log(error);
      return "null"
    }
  }

  checkApplication(applicantId: string, bootcampId: string): void{
    this.applicationService.checkApplication(applicantId, bootcampId).subscribe(response =>{
      this.applicationInfo = response;
      this.isApplied = true;

    }, error =>{
      this.isApplied = false;
      console.log(error)

    });
  }

  applyToBootcamp() {
    if(this.userId == "null"){
      alert("Başvuru yapmak için giriş yapmalısın.")
      return;
    }
    else{
      this.isApplied = true;
  
      console.log(this.applicationRequest)
  
      this.applicationService.postApplication(this.applicationRequest).subscribe(response =>{
        alert("Başvuru başarıyla yapıldı.");
        console.log(response);
      }, error => {
        alert("Bir hata oluştu.");
        this.isApplied = false;
        console.log(error);
      });
    }

  }

}
