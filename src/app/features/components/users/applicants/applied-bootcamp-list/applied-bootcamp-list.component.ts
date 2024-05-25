import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationService } from '../../../../services/concretes/application.service';
import { TokenService } from '../../../../services/concretes/token.service';
import { PageRequest } from '../../../../../core/models/pagination/page-request';
import { AppliedBootcampResponse } from '../../../../models/responses/applications/applied-bootcamp-response';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../../shared/shared.module';
import { FormatService } from '../../../../services/concretes/format.service';
import { ListItemsDto } from '../../../../../core/models/pagination/list-items-dto';

@Component({
  selector: 'app-applied-bootcamp-list',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './applied-bootcamp-list.component.html',
  styleUrl: './applied-bootcamp-list.component.scss'
})
export class AppliedBootcampListComponent implements OnInit {

  userId!: string;

  appliedBootcampsList: ListItemsDto<AppliedBootcampResponse> = {
    index: 0,
    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: []
  };
  readonly PAGE_SIZE = 30

  constructor(
    private applicationService: ApplicationService,
    private router: Router,
    private tokenService: TokenService,
    private formatService: FormatService
  ) { }

  ngOnInit(): void {
    this.userId = this.tokenService.getCurrentUserId();

    this.getAppliedBootcampList(this.userId, { pageIndex: 0, pageSize: this.PAGE_SIZE });
  }

  getAppliedBootcampList(applicantId: string, pageRequest: PageRequest) {
    this.applicationService.appliedBootcamps(applicantId, pageRequest).subscribe(response => {
      this.appliedBootcampsList = response;

    })
  }

  navigateToBootcampDetailPage(appliedBootcamp: AppliedBootcampResponse) {
    const formattedName = this.formatService.formatBootcampDetailRoute(appliedBootcamp.bootcampName);
    this.router.navigate(['/bootcamp', formattedName]);

  }

  navigateToBootcampsPage() {
    this.router.navigate(['bootcamp']);

  }
}
