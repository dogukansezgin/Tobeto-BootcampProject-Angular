import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { SharedModule } from "../../../../../shared/shared.module";
import { FormsModule } from "@angular/forms";
import { ApplicationListItemDto } from "../../../../models/responses/applications/application-list-item-dto";
import { ApplicationService } from "../../../../services/concretes/application.service";
import { TokenService } from "../../../../services/concretes/token.service";
import { Router } from "@angular/router";
import { PageRequest } from "../../../../../core/models/pagination/page-request";
import { AppliedBootcampResponse } from "../../../../models/responses/applications/applied-bootcamp-response";
import { PaginatorModule } from "primeng/paginator";


@Component({
  selector: 'app-applicant-applied-bootcamp-list-group',
  standalone: true,
  imports: [CommonModule, FormsModule, SharedModule, PaginatorModule],
  templateUrl: './applicant-applied-bootcamp-list-group.component.html',
  styleUrl: './applicant-applied-bootcamp-list-group.component.scss'
})
export class ApplicantAppliedBootcampListGroupComponent implements OnInit {

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

    this.getAppliedBootcampsList(this.userId, {pageIndex: 0, pageSize: this.PAGE_SIZE})
  }

  getAppliedBootcampsList(applicantId: string, pageRequest: PageRequest){
    this.applicationService.appliedBootcamps(applicantId, pageRequest).subscribe(response =>{
      this.appliedBootcampsList = response;
      console.log(response)
    })
  }

  navigateToBootcampDetail(appliedBootcamp: AppliedBootcampResponse){
    console.log("Selected bootcamp : ", appliedBootcamp.bootcampId, appliedBootcamp.bootcampName, appliedBootcamp.bootcampInstructorUserName)
    this.router.navigate(['/p', appliedBootcamp.bootcampId])
  }

  onPageChange(event: any) {
    const pageRequest: PageRequest = {
      pageIndex: event.page,
      pageSize: this.PAGE_SIZE
    };
    this.getAppliedBootcampsList(this.userId, pageRequest);
  }

}
