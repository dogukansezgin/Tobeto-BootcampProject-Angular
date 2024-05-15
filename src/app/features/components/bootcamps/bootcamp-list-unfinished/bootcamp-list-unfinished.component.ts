import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { PaginatorModule } from 'primeng/paginator';
import { Router } from '@angular/router';
import { PageRequest } from '../../../../core/models/pagination/page-request';
import { BootcampListItemDto } from '../../../models/responses/bootcamps/bootcamp-list-item-dto';
import { GetBootcampResponse } from '../../../models/responses/bootcamps/get-bootcamp-response';
import { BootcampService } from '../../../services/concretes/bootcamp.service';
import { CommonModule } from '@angular/common';

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

  constructor(private bootcampService: BootcampService, private router: Router) { }

  ngOnInit(): void {
    this.getAllUnfinishedBootcamps({ pageIndex: 0, pageSize: this.PAGE_SIZE });
  }

  getAllUnfinishedBootcamps(pageRequest: PageRequest) {
    this.bootcampService.getListUnfinished(pageRequest).subscribe((response) => {
      this.allUnfinishedBootcamps = response;
    })
  }

  navigateToBootcampDetail(bootcamp: GetBootcampResponse) {
    console.log("Selected bootcamp : ", bootcamp.id, bootcamp.name, bootcamp.instructorUserName)
    this.router.navigate(['/p', bootcamp.id])
  }

  onPageChange(event: any) {
    const pageRequest: PageRequest = {
      pageIndex: event.page,
      pageSize: this.PAGE_SIZE
    };
    this.getAllUnfinishedBootcamps(pageRequest);
  }

}
