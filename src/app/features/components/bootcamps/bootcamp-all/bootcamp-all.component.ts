import { Component, OnInit } from '@angular/core';
import { GetBootcampResponse } from '../../../models/responses/bootcamps/get-bootcamp-response';
import { BootcampService } from '../../../services/concretes/bootcamp.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DeadLinePipe } from '../../../../shared/pipes/dead-line.pipe';

@Component({
  selector: 'app-bootcamp-all',
  standalone: true,
  imports: [CommonModule, DeadLinePipe],
  templateUrl: './bootcamp-all.component.html',
  styleUrl: './bootcamp-all.component.scss'
})
export class BootcampAllComponent implements OnInit {
  allBootcamps!: GetBootcampResponse[];

  constructor(private bootcampService: BootcampService, private router: Router) { }

  ngOnInit(): void {
    this.getListUnfinished();
  }

  getListUnfinished() {
    this.bootcampService.getListUnfinished().subscribe((response) => {
      this.allBootcamps = response.items;
    })
  }

  navigateToBootcampDetail(bootcamp: GetBootcampResponse) {
    console.log("Selected bootcamp : ", bootcamp.id, bootcamp.name, bootcamp.instructorUserName)
    this.router.navigate(['/p', bootcamp.id])
  }
}
