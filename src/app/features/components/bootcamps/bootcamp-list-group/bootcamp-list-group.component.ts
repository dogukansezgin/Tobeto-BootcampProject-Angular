import { Component, OnInit } from '@angular/core';
import { BootcampService } from '../../../services/concretes/bootcamp.service';
import { PageRequest } from '../../../../core/models/pagination/page-request';
import { BootcampListItemDto } from '../../../models/responses/bootcamps/bootcamp-list-item-dto';
import { CommonModule } from '@angular/common';
import { GetBootcampListResponse } from '../../../models/responses/bootcamps/get-bootcamp-list-response';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-bootcamp-list-group',
  standalone: true,
  imports: [CommonModule, FormsModule, SharedModule],
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
  readonly PAGE_SIZE = 6;

  constructor(private bootcampService: BootcampService) {}

  ngOnInit(): void {
    this.getList( { page: 0, pageSize: this.PAGE_SIZE})
  }

  getList(pageRequest: PageRequest){
    this.bootcampService.getList(pageRequest).subscribe((response) =>{
      this.bootcampList = response;
    })
  }

  setCurrentBootcamp(bootcamp: GetBootcampListResponse){
    console.log("Selected bootcamp : ", bootcamp.id, bootcamp.name)
  }
}
