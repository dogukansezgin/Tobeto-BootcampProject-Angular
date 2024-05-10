import { Component, OnInit } from '@angular/core';
import { BootcampService } from '../../../services/concretes/bootcamp.service';
import { PageRequest } from '../../../../core/models/pagination/page-request';
import { BootcampListItemDto } from '../../../models/responses/bootcamps/bootcamp-list-item-dto';
import { CommonModule } from '@angular/common';
import { GetBootcampResponse } from '../../../models/responses/bootcamps/get-bootcamp-response';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { Router } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-bootcamp-showcase',
  standalone: true,
  imports: [CommonModule, FormsModule, SharedModule, PaginatorModule],
  templateUrl: './bootcamp-showcase.component.html',
  styleUrl: './bootcamp-showcase.component.scss'
})
export class BootcampShowcaseComponent implements OnInit {

  filterText!: string;

  bootcampList: BootcampListItemDto<GetBootcampResponse> = {
    index: 0,
    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: []
  };
  readonly PAGE_SIZE = 3;

  constructor(private bootcampService: BootcampService, private router: Router) { }

  ngOnInit(): void {
    this.getList({ pageIndex: 0, pageSize: this.PAGE_SIZE })
  }

  getList(pageRequest: PageRequest) {
    this.bootcampService.getList(pageRequest).subscribe((response) => {
      this.bootcampList = response;
    })
  }

  navigateToBootcampDetail(bootcamp: GetBootcampResponse) {
    console.log("Selected bootcamp : ", bootcamp.id, bootcamp.name, bootcamp.instructorUserName)
    this.router.navigate(['/p', bootcamp.id])
  }

  navigateToBootcampsPage() {
    this.router.navigate(['/bootcamps']);
  }

}
