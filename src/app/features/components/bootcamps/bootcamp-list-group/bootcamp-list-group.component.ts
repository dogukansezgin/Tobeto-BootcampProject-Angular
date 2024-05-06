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
import { DeadLinePipe } from '../../../../shared/pipes/dead-line.pipe';

@Component({
  selector: 'app-bootcamp-list-group',
  standalone: true,
  imports: [CommonModule, FormsModule, SharedModule, PaginatorModule,DeadLinePipe],
  templateUrl: './bootcamp-list-group.component.html',
  styleUrl: './bootcamp-list-group.component.scss'
})
export class BootcampListGroupComponent implements OnInit {

  filterText!: string;

  bootcampList: BootcampListItemDto ={
    index: 0,
    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: []
  };
  readonly PAGE_SIZE = 3;

  constructor(private bootcampService: BootcampService, private router: Router) {}

  ngOnInit(): void {
    this.getList( { pageIndex: 0, pageSize: this.PAGE_SIZE})
  }

  getList(pageRequest: PageRequest){
    this.bootcampService.getList(pageRequest).subscribe((response) =>{
      this.bootcampList = response;
    })
  }

  navigateToBootcampDetail(bootcamp: GetBootcampResponse){
    console.log("Selected bootcamp : ", bootcamp.id, bootcamp.name, bootcamp.instructorUserName)
    this.router.navigate(['/p', bootcamp.id])
  }

  onPageChange(event: any) {
    const pageRequest: PageRequest = {
      pageIndex: event.page,
      pageSize: this.PAGE_SIZE
    };
    this.getList(pageRequest);
  }
  navigateToBootcamps(){
    this.router.navigate(['/bootcamps']);
  }

}
