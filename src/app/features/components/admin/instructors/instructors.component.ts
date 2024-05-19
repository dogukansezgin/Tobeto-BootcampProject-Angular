import { Component, OnInit } from '@angular/core';
import { InstructorService } from '../../../services/concretes/instructor.service';
import { ListItemsDto } from '../../../../core/models/pagination/list-items-dto';
import { InstructorGetListResponse } from '../../../models/responses/users/instructors/instructor-get-list-response';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instructors',
  standalone: true,
  imports: [TableModule, DialogModule, RippleModule, ButtonModule, ToastModule, ToolbarModule, ConfirmDialogModule, InputTextModule, InputTextareaModule, CommonModule, FileUploadModule, DropdownModule, TagModule, RadioButtonModule, RatingModule, InputTextModule, FormsModule, InputNumberModule],
  providers: [InstructorService, MessageService, ConfirmationService],
  templateUrl: './instructors.component.html',
  styleUrl: './instructors.component.scss'
})
export class InstructorsComponent implements OnInit {

  instructorDialog: boolean = false;

  instructors: ListItemsDto<InstructorGetListResponse> = {
    index: 0,
    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: []
  }

  instructor: InstructorGetListResponse = {
    id: '',
    email: '',
    userName: '',
    firstName: '',
    lastName: '',
    dateOfBirth: new Date("0001-01-01T01:00:00"),
    nationalIdentity: '',
    companyName: ''
  }

  selectedInstructor!: InstructorGetListResponse[] | null;

  submitted: boolean = false;

  filterValue: string = '';

  readonly PAGE_SIZE = 30;

  constructor(
    private instructorService: InstructorService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
    // private formatService: FormatService
  ) { }

  ngOnInit(): void {
    this.instructorService.getInstructorsList({ pageIndex: 0, pageSize: this.PAGE_SIZE }).subscribe(response => {
      this.instructors = response;

    })

  }

  openNew() {
    this.instructor = {
      id: '',
      email: '',
      userName: '',
      firstName: '',
      lastName: '',
      dateOfBirth: new Date("0001-01-01T01:00:00"),
      nationalIdentity: '',
      companyName: ''
    };
    this.submitted = false;
    this.instructorDialog = true;
  }

  deleteSelectedInstructors() {
    this.confirmationService.confirm({
      message: 'Seçilen kursları silmek istediğine emin misin?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.instructors.items = this.instructors.items.filter((val) => !this.selectedInstructor?.includes(val));
        this.selectedInstructor = null;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Instructor Deleted', life: 3000 });
      }
    });
  }

  editInstructor(instructor: InstructorGetListResponse) {
    this.instructor = { ...instructor };
    this.instructorDialog = true;
  }

  deleteInstructor(instructor: InstructorGetListResponse) {
    this.confirmationService.confirm({
      message: '"' + instructor.userName + '" Adlı eğitmeni silmek istediğine emin misin?',
      header: 'Onayla',
      rejectLabel: 'İptal',
      acceptLabel: 'Sil',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.instructors.items = this.instructors.items.filter((val) => val.id !== instructor.id);
        this.instructor = {
          id: '',
          email: '',
          userName: '',
          firstName: '',
          lastName: '',
          dateOfBirth: new Date("0001-01-01T01:00:00"),
          nationalIdentity: '',
          companyName: ''
        };
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Instructor Deleted', life: 3000 });

      }
    });
  }

  hideDialog() {
    this.instructorDialog = false;
    this.submitted = false;
  }

  saveInstructor() {
    this.submitted = true;
    this.instructor.userName = `${this.instructor.firstName} ${this.instructor.lastName}`
    if (this.instructor.userName?.trim()) {
      if (this.instructor.id) {
        this.instructors.items[this.findIndexById(this.instructor.id)] = this.instructor;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Instructor Updated', life: 3000 });
      } else {
        this.instructor.id = this.createId();
        this.instructors.items.push(this.instructor);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Instructor Created', life: 3000 });
      }

      this.instructors.items = [...this.instructors.items];
      this.instructorDialog = false;
      this.instructor = {
        id: '',
        email: '',
        userName: '',
        firstName: '',
        lastName: '',
        dateOfBirth: new Date("0001-01-01T01:00:00"),
        nationalIdentity: '',
        companyName: ''
      };
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.instructors.items.length; i++) {
      if (this.instructors.items[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'İSTANBUL':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
    }
    return "asd";
  }

  filterTable(event: Event, dt: any): void {
    if (event.target instanceof HTMLInputElement) {
      this.filterValue = event.target.value;
      dt.filterGlobal(this.filterValue, 'contains');
    }
  }


}
