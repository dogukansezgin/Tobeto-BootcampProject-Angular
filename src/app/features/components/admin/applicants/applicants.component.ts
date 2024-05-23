import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ApplicantService } from '../../../services/concretes/applicant.service';
import { GetListResponse } from '../../../models/responses/applicants/get-list-response';
import { GetListApplicantListItemDto } from '../../../models/responses/applicants/get-list-applicant-list-item-dto';

@Component({
  selector: 'app-applicants',
  standalone: true,
  imports: [TableModule, HttpClientModule, ButtonModule, RippleModule, TagModule],
  templateUrl: './applicants.component.html',
  styleUrl: './applicants.component.scss'
})
export class ApplicantsComponent implements OnInit {

  applicants: GetListResponse<GetListApplicantListItemDto> = {
    index: 0,
    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: []
  }

  readonly PAGE_SIZE = 30;

  constructor(private applicantService: ApplicantService) { }

  ngOnInit(): void {
    this.applicantService.getList({ pageIndex: 0, pageSize: this.PAGE_SIZE }).subscribe(response => {
      this.applicants = response;
      console.log(this.applicants);
    })
  }
  // calculateCustomerTotal(name: string) {
  //   let total = 0;

  //   if (this.customers) {
  //     for (let customer of this.customers) {
  //       if (customer.representative?.name === name) {
  //         total++;
  //       }
  //     }
  //   }

  //   return total;
  // }
  // getSeverity(status: string) {
  //   switch (status) {
  //     case 'unqualified':
  //       return 'danger';

  //     case 'qualified':
  //       return 'success';

  //     case 'new':
  //       return 'info';

  //     case 'negotiation':
  //       return 'warning';

  //     case 'renewal':
  //       return null;
  //   }
  // }

}
