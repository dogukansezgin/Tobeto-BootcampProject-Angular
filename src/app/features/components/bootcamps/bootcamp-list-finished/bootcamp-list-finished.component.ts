import { Component, OnInit } from '@angular/core';
import { GetBootcampResponse } from '../../../models/responses/bootcamps/get-bootcamp-response';
import { BootcampService } from '../../../services/concretes/bootcamp.service';
import { Router } from '@angular/router';
import { PageRequest } from '../../../../core/models/pagination/page-request';
import { BootcampListItemDto } from '../../../models/responses/bootcamps/bootcamp-list-item-dto';
import { SharedModule } from '../../../../shared/shared.module';
import { PaginatorModule } from 'primeng/paginator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bootcamp-list-finished',
  standalone: true,
  imports: [SharedModule, PaginatorModule, CommonModule],
  templateUrl: './bootcamp-list-finished.component.html',
  styleUrl: './bootcamp-list-finished.component.scss'
})
export class BootcampListFinishedComponent implements OnInit {

  allFinishedBootcamps: BootcampListItemDto<GetBootcampResponse> = {
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
    this.getAllFinishedBootcamps({ pageIndex: 0, pageSize: this.PAGE_SIZE });
  }

  getAllFinishedBootcamps(pageRequest: PageRequest) {
    this.bootcampService.getListFinished(pageRequest).subscribe((response) => {
      this.allFinishedBootcamps = response;
      this.bootcampCount = response.count;
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
    this.getAllFinishedBootcamps(pageRequest);
  }

}

