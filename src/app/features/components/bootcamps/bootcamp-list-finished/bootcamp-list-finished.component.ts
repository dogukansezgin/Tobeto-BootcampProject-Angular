import { Component, OnInit } from '@angular/core';
import { BootcampGetListResponse } from '../../../models/responses/bootcamps/bootcamp-get-list-response';
import { BootcampService } from '../../../services/concretes/bootcamp.service';
import { Router } from '@angular/router';
import { PageRequest } from '../../../../core/models/pagination/page-request';
import { SharedModule } from '../../../../shared/shared.module';
import { PaginatorModule } from 'primeng/paginator';
import { CommonModule } from '@angular/common';
import { FormatService } from '../../../services/concretes/format.service';
import { ListItemsDto } from '../../../../core/models/pagination/list-items-dto';
import { BootcampGetListImageResponse } from '../../../models/responses/bootcamps/bootcamp-get-list-image-response';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-bootcamp-list-finished',
  standalone: true,
  imports: [SharedModule, PaginatorModule, CommonModule,CardModule],
  templateUrl: './bootcamp-list-finished.component.html',
  styleUrl: './bootcamp-list-finished.component.scss'
})
export class BootcampListFinishedComponent implements OnInit {

  allFinishedBootcamps: ListItemsDto<BootcampGetListImageResponse> = {
    index: 0,
    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: []
  };
  bootcampCount!: number;
  readonly PAGE_SIZE = 6;

  constructor(private bootcampService: BootcampService, private router: Router, private formatService: FormatService) { }

  ngOnInit(): void {
    this.getAllFinishedBootcamps({ pageIndex: 0, pageSize: this.PAGE_SIZE });
  }

  getAllFinishedBootcamps(pageRequest: PageRequest) {
    this.bootcampService.getListFinished(pageRequest).subscribe((response) => {
      this.allFinishedBootcamps = response;
      this.bootcampCount = response.count;
      console.log(response)

    })
  }

  navigateToBootcampDetailPage(bootcamp: BootcampGetListResponse) {
    const formattedName = this.formatService.formatBootcampDetailRoute(bootcamp.name);
    this.router.navigate(['/bootcamp', formattedName]);

  }

  onPageChange(event: any) {
    const pageRequest: PageRequest = {
      pageIndex: event.page,
      pageSize: this.PAGE_SIZE
    };
    this.getAllFinishedBootcamps(pageRequest);
  }

}

