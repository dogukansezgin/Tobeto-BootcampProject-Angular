import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../../services/concretes/application.service';
import { Router } from '@angular/router';
import { PageRequest } from '../../../../core/models/pagination/page-request';
import { ApplicationListItemDto } from '../../../models/responses/applications/application-list-item-dto';
import { AppliedBootcampResponse } from '../../../models/responses/applications/applied-bootcamp-response';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { TokenService } from '../../../services/concretes/token.service';

@Component({
  selector: 'app-applied-bootcamps-list',
  standalone: true,
  imports: [CommonModule, FormsModule, SharedModule],
  templateUrl: './applied-bootcamps-list.component.html',
  styleUrl: './applied-bootcamps-list.component.scss'
})
export class AppliedBootcampsListComponent implements OnInit {

  userId!: string;

  filterText!: string;

  appliedBootcampsList: ApplicationListItemDto ={
    index: 0,
    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: []
  };
  readonly PAGE_SIZE = 6

  constructor(
    private applicationService: ApplicationService, 
    private router: Router,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.userId = this.tokenService.getCurrentUserId();

    this.getAppliedBootcampsList(this.userId, {page: 0, pageSize: this.PAGE_SIZE})
  }

  getAppliedBootcampsList(applicantId: string, pageRequest: PageRequest){
    this.applicationService.appliedBootcamps(applicantId, pageRequest).subscribe(response =>{
      this.appliedBootcampsList = response;
    })
  }

  navigateToBootcampDetail(appliedBootcamp: AppliedBootcampResponse){
    console.log("Selected bootcamp : ", appliedBootcamp.bootcampId, appliedBootcamp.bootcampName, appliedBootcamp.bootcampInstructorUserName)
    this.router.navigate(['/p', appliedBootcamp.bootcampId])
  }

}
