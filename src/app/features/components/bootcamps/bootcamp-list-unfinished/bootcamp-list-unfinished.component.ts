import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { PaginatorModule } from 'primeng/paginator';
import { Router } from '@angular/router';
import { PageRequest } from '../../../../core/models/pagination/page-request';
import { BootcampListItemDto } from '../../../models/responses/bootcamps/bootcamp-list-item-dto';
import { GetBootcampResponse } from '../../../models/responses/bootcamps/get-bootcamp-response';
import { BootcampService } from '../../../services/concretes/bootcamp.service';
import { CommonModule } from '@angular/common';
import { FormatService } from '../../../services/concretes/format.service';

@Component({
  selector: 'app-bootcamp-list-unfinished',
  standalone: true,
  imports: [SharedModule, PaginatorModule, CommonModule],
  templateUrl: './bootcamp-list-unfinished.component.html',
  styleUrl: './bootcamp-list-unfinished.component.scss'
})
export class BootcampListUnfinishedComponent implements OnInit {

  allUnfinishedBootcamps: BootcampListItemDto<GetBootcampResponse> = {
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
    this.getAllUnfinishedBootcamps({ pageIndex: 0, pageSize: this.PAGE_SIZE });
  }

  getAllUnfinishedBootcamps(pageRequest: PageRequest) {
    this.bootcampService.getListUnfinished(pageRequest).subscribe((response) => {
      this.allUnfinishedBootcamps = response;
    })
  }

  navigateToBootcampDetailPage(bootcamp: GetBootcampResponse) {
    const formattedName = this.formatService.formatBootcampDetailRoute(bootcamp.name);
    this.router.navigate(['/bootcamp', formattedName]);

  }

  onPageChange(event: any) {
    const pageRequest: PageRequest = {
      pageIndex: event.page,
      pageSize: this.PAGE_SIZE
    };
    this.getAllUnfinishedBootcamps(pageRequest);
  }

}
