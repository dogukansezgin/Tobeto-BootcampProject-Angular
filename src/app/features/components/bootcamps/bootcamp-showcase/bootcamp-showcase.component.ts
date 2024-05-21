import { Component, OnInit } from '@angular/core';
import { BootcampService } from '../../../services/concretes/bootcamp.service';
import { PageRequest } from '../../../../core/models/pagination/page-request';
import { CommonModule } from '@angular/common';
import { BootcampGetListResponse } from '../../../models/responses/bootcamps/bootcamp-get-list-response';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { Router } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator';
import { FormatService } from '../../../services/concretes/format.service';
import { ListItemsDto } from '../../../../core/models/pagination/list-items-dto';

@Component({
  selector: 'app-bootcamp-showcase',
  standalone: true,
  imports: [CommonModule, FormsModule, SharedModule, PaginatorModule],
  templateUrl: './bootcamp-showcase.component.html',
  styleUrl: './bootcamp-showcase.component.scss'
})
export class BootcampShowcaseComponent implements OnInit {

  filterText!: string;

  bootcampList: ListItemsDto<BootcampGetListResponse> = {
    index: 0,
    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: []
  };
  readonly PAGE_SIZE = 3;

  constructor(private bootcampService: BootcampService, private router: Router, private formatService: FormatService) { }

  ngOnInit(): void {
    this.getBootcampShowcaseList({ pageIndex: 0, pageSize: this.PAGE_SIZE })
  }

  getBootcampShowcaseList(pageRequest: PageRequest) {
    this.bootcampService.getListUnfinished(pageRequest).subscribe((response) => {
      this.bootcampList = response;
    })
  }

  navigateToBootcampDetailPage(bootcamp: BootcampGetListResponse) {
    const formattedName = this.formatService.formatBootcampDetailRoute(bootcamp.name);
    this.router.navigate(['/bootcamp', formattedName]);

  }

  navigateToBootcampsPage() {
    this.router.navigate(['/bootcamp']);
  }

}
