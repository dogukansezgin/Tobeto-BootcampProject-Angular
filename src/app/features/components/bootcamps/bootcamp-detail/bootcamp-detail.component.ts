import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BootcampService } from '../../../services/concretes/bootcamp.service';
import { GetBootcampResponse } from '../../../models/responses/bootcamps/get-bootcamp-response';

@Component({
  selector: 'app-bootcamp-detail',
  standalone: true,
  imports: [],
  templateUrl: './bootcamp-detail.component.html',
  styleUrl: './bootcamp-detail.component.scss'
})
export class BootcampDetailComponent implements OnInit {
  
  bootcampId!: string;
  bootcamp: GetBootcampResponse = {
    id: '',
    name: '',
    startDate: '',
    endDate: '',

    instructorId: '',
    instructorUserName: '',
    instructorFirstName: '',
    instructorLastName: '',
    InstructorCompanyName: '',

    bootcampStateId: '',
    bootcampStateName: ''
  };
  bootcampFullName!: string;
  bootcampName!: string;
  bootcampAfterBracket!: string;
  
  constructor(private bootcampService: BootcampService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      this.bootcampId = params['bootcampId'];
      this.getBootcampById(this.bootcampId);
    })

  }
  
  getBootcampById(bootcampId: string){
    this.bootcampService.getById(bootcampId).subscribe(response =>{
      this.bootcamp = response;
      this.bootcampFullName = this.bootcamp.name;
      this.divideBootcampName();
   });
  }

  divideBootcampName(){
    let bracketIndex = this.bootcampFullName.indexOf('(');
    if (bracketIndex !== -1) {
      this.bootcampName = this.bootcampFullName.substring(0, bracketIndex).trim();
      this.bootcampAfterBracket = this.bootcampFullName.substring(bracketIndex + 1, this.bootcampFullName.length - 1).trim();

    }else{
      this.bootcampName = this.bootcampFullName.trim();
    }
  }

  
}
