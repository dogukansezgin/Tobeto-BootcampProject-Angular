import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ApplicantService } from '../../../services/concretes/applicant.service';
import { GetListByJoinApplicantListItemDto } from '../../../models/responses/applicants/get-list-by-join-applicant-list-item-dto';
import { GetListApplicantListItemDto } from '../../../models/responses/applicants/get-list-applicant-list-item-dto';
import { CommonModule } from '@angular/common';
import { ShortDatePipe } from '../../../../shared/pipes/short-date.pipe';

@Component({
  selector: 'app-applicants-first',
  standalone: true,
  imports: [TableModule, HttpClientModule, ButtonModule, RippleModule, TagModule, CommonModule, ShortDatePipe],
  templateUrl: './applicants-first.component.html',
  styleUrl: './applicants-first.component.scss'
})
export class ApplicantsFirstComponent implements OnInit {

  applicantsWithBootcamps: GetListByJoinApplicantListItemDto[] = [];
  allApplicants: GetListApplicantListItemDto[] = [];
  apps: GetListByJoinApplicantListItemDto[] = [];

  dialogVisible: boolean = false;

  readonly PAGE_SIZE = 99;

  constructor(private applicantService: ApplicantService) { }

  ngOnInit(): void {
    // this.applicantService.getList({ pageIndex: 0, pageSize: this.PAGE_SIZE }).subscribe(response => {
    //   this.allApplicants = response.items;

    this.applicantService.getListByJoin({ pageIndex: 0, pageSize: this.PAGE_SIZE }).subscribe(response => {
      this.applicantsWithBootcamps = response.items;

      // this.allApplicants.forEach(item=>{
      //   const exists= this.applicantsWithBootcamps.some(element=>element.applicantId==item.id)
      //   if(!exists){
      //     // console.log("Olmayan id : "+item.id);
      //     const a: GetListByJoinApplicantListItemDto={
      //       id: null,
      //       createdDate: null,
      //       applicantId :item.id,
      //       applicantUserName:item.userName,
      //       bootcampId:null,
      //       bootcampName:null,
      //       applicationStateId:null,
      //       applicationStateName:null
      //     }
      //     this.apps.push(a);

      //   }
      // })

    })

    // })

  }
  calculateBootcampTotal(name:string) {
    let total=0;
    if(this.applicantsWithBootcamps){
      for (let applicant of this.applicantsWithBootcamps) {
        if(applicant.applicantUserName===name){
          total++;
        }
        
      }
    }
    return total;
  }
  
  getSeverity(status: string) {
    switch (status) {
      case 'DEĞERLENDIRME':
        return 'warning';
      case 'ONAYLANDI':
        return 'success';
      case 'RED EDILDI':
        return 'danger';
      default:
        return '';
    }
  }

}
