import { Component, OnInit } from '@angular/core';
import { GetBootcampResponse } from '../../../models/responses/bootcamps/get-bootcamp-response';
import { BootcampService } from '../../../services/concretes/bootcamp.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DeadLinePipe } from '../../../../shared/pipes/dead-line.pipe';
import { PageRequest } from '../../../../core/models/pagination/page-request';
import { PaginatorModule } from 'primeng/paginator';
import { BootcampListItemDto } from '../../../models/responses/bootcamps/bootcamp-list-item-dto';

@Component({
  selector: 'app-bootcamp-all',
  standalone: true,
  imports: [CommonModule, DeadLinePipe,PaginatorModule],
  templateUrl: './bootcamp-all.component.html',
  styleUrl: './bootcamp-all.component.scss'
})
export class BootcampAllComponent implements OnInit {
  allBootcamps!: GetBootcampResponse[];
  allFinishedBootcamps!: GetBootcampResponse[];
  allBootcampResponse!: BootcampListItemDto<GetBootcampResponse>;
  bootcampCount!:number;
  readonly PAGE_SIZE = 6;

  constructor(private bootcampService: BootcampService, private router: Router) { }

  ngOnInit(): void {
    this.getListUnfinished();
    this.getListFinished({pageIndex:0,pageSize:this.PAGE_SIZE});
  }

  getListUnfinished() {
    this.bootcampService.getListUnfinished().subscribe((response) => {
      this.allBootcamps = response.items;
    })
  }
  getListFinished(pageRequest: PageRequest) {
    this.bootcampService.getListFinished(pageRequest).subscribe((response) => {
      this.allBootcampResponse = response;   
      this.allFinishedBootcamps=this.allBootcampResponse.items;
      this.bootcampCount=response.count;
    })
  }
  navigateToBootcampDetail(bootcamp: GetBootcampResponse) {
    console.log("Selected bootcamp : ", bootcamp.id, bootcamp.name, bootcamp.instructorUserName)
    this.router.navigate(['/p', bootcamp.id])
  }
  onPageChange(event:any){
    const pageRequest: PageRequest = {
      pageIndex: event.page,
      pageSize: this.PAGE_SIZE
    };
    this.getListFinished(pageRequest);
  }
}
