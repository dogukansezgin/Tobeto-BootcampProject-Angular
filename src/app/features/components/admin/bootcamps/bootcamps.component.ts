
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CommonModule, DatePipe } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { Router } from '@angular/router';
import { BootcampListItemDto } from '../../../models/responses/bootcamps/bootcamp-list-item-dto';
import { GetBootcampResponse } from '../../../models/responses/bootcamps/get-bootcamp-response';
import { BootcampService } from '../../../services/concretes/bootcamp.service';
import { FormatService } from '../../../services/concretes/format.service';
import { BootcampStateService } from '../../../services/concretes/bootcamp-state.service';
import { BootcampStateGetListResponse } from '../../../models/responses/bootcamp-states/bootcamp-state-get-list-response';
import { BootcampCreateRequest } from '../../../models/requests/bootcamps/bootcamp-create-request';
import { CalendarModule } from 'primeng/calendar';
import { InstructorService } from '../../../services/concretes/instructor.service';
import { InstructorGetBasicInfoResponse } from '../../../models/responses/users/instructors/instructor-get-basic-info-response';
import { BootcampUpdateRequest } from '../../../models/requests/bootcamps/bootcamp-update-request';


@Component({
  selector: 'app-bootcamps',
  standalone: true,
  imports: [TableModule, DialogModule, RippleModule, ButtonModule, ToastModule, ToolbarModule, ConfirmDialogModule, InputTextModule, InputTextareaModule, CommonModule, FileUploadModule, DropdownModule, TagModule, RadioButtonModule, RatingModule, InputTextModule, FormsModule, InputNumberModule, CalendarModule, ButtonModule],
  providers: [BootcampService, MessageService, ConfirmationService],
  templateUrl: './bootcamps.component.html',
  styleUrl: './bootcamps.component.scss'
})
export class BootcampsComponent implements OnInit {
  bootcampCreateDialog: boolean = false;
  bootcampUpdateDialog: boolean = false;

  //
  bootcamps: BootcampListItemDto<GetBootcampResponse> = {
    index: 0,
    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: []
  };

  bootcamp!: GetBootcampResponse;

  bootcampCreateRequest: BootcampCreateRequest = {
    name: '',
    instructorId: '',
    bootcampStateId: '',
    startDate: new Date(),
    endDate: new Date(),
  };

  bootcampUpdateRequest: BootcampUpdateRequest = {
    id: '',
    name: '',
    instructorId: '',
    bootcampStateId: '',
    startDate: new Date(),
    endDate: new Date(),
  };

  selectedBootcamp!: GetBootcampResponse[] | null;

  //
  bootcampStates!: BootcampStateGetListResponse[];

  selectedBootcampState: BootcampStateGetListResponse = {
    id: '',
    name: ''
  };

  //
  instructors!: InstructorGetBasicInfoResponse[];

  selectedInstructor: InstructorGetBasicInfoResponse = {
    id: '',
    userName: '',
    companyName: ''
  };

  //
  submitted: boolean = false;

  filterValue: string = '';

  readonly PAGE_SIZE = 30;

  minStartDate!: Date;
  minEndDate!: Date;

  constructor(
    private bootcampService: BootcampService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private formatService: FormatService,
    private bootcampStateService: BootcampStateService,
    private instructorService: InstructorService
  ) { }

  ngOnInit() {
    this.bootcampService.getList({ pageIndex: 0, pageSize: this.PAGE_SIZE }).subscribe(response => {
      this.bootcamps = response;
      console.log(this.bootcamps)
    });

    this.bootcampStateService.getList({ pageIndex: 0, pageSize: 99 }).subscribe(response => {
      this.bootcampStates = response.items;
      console.log(this.bootcampStates)
    });

    this.instructorService.getInstructorsBasicInfoList({ pageIndex: 0, pageSize: 99 }).subscribe(response => {
      this.instructors = response.items;
      console.log(this.instructors)
    });

  }
  
  openNew() {
    this.initializeFormDates();

    this.bootcampCreateRequest = {
      name: '',
      instructorId: '',
      bootcampStateId: '',
      startDate: this.minStartDate,
      endDate: this.minEndDate,
    };
    this.selectedBootcampState = {
      id: '',
      name: ''
    };
    this.selectedInstructor = {
      id: '',
      userName: '',
      companyName: ''
    }

    this.submitted = false;
    this.bootcampCreateDialog = true;
  }

  deleteSelectedBootcamps() {
    this.confirmationService.confirm({
      message: 'Seçilen kursları silmek istediğine emin misin?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.bootcamps.items = this.bootcamps.items.filter((val) => !this.selectedBootcamp?.includes(val));
        this.selectedBootcamp = null;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Bootcamp Deleted', life: 3000 });
      }
    });
  }

  openEdit(bootcamp: GetBootcampResponse) {
    this.bootcamp = { ...bootcamp };
    this.initializeFormDates();
    console.log(bootcamp)
    console.log(this.bootcamp)

    this.bootcampUpdateRequest = {
      id: this.bootcamp.id,
      name: this.bootcamp.name,
      instructorId: this.bootcamp.instructorId,
      bootcampStateId: this.bootcamp.bootcampStateId,
      startDate: new Date(this.bootcamp.startDate),
      endDate: new Date(this.bootcamp.endDate),
    };
    this.selectedBootcampState = {
      id: this.bootcamp.bootcampStateId,
      name: this.bootcamp.bootcampStateName
    };
    this.selectedInstructor = {
      id: this.bootcamp.instructorId,
      userName: this.bootcamp.instructorUserName,
      companyName: this.bootcamp.instructorCompanyName
    }
    
    console.log(this.bootcampUpdateRequest)
    console.log(this.minStartDate)
    console.log(this.minEndDate)
    this.bootcampUpdateDialog = true;
  }

  deleteBootcamp(bootcamp: GetBootcampResponse) {
    this.confirmationService.confirm({
      message: '"' + bootcamp.name + '" Adlı kursu silmek istediğine emin misin?',
      header: 'Onayla',
      rejectLabel: 'İptal',
      acceptLabel: 'Sil',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.bootcamps.items = this.bootcamps.items.filter((val) => val.id !== bootcamp.id);
        this.bootcamp = {
          id: '',
          name: '',
          startDate: new Date("0001-01-01T01:00:00"),
          endDate: new Date("0001-01-01T01:00:00"),

          instructorId: '',
          instructorUserName: '',
          instructorFirstName: '',
          instructorLastName: '',
          instructorCompanyName: '',

          bootcampStateId: '',
          bootcampStateName: '',

          createdDate: new Date("0001-01-01T01:00:00")
        };
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Bootcamp Deleted', life: 3000 });

      }
    });
  }

  hideDialog() {
    this.bootcampCreateDialog = false;
    this.bootcampUpdateDialog = false;
    this.submitted = false;
  }

  createBootcamp() {
    this.submitted = true;
    if (this.bootcampCreateRequest.name?.trim()) {
      if (!this.selectedInstructor.id || !this.selectedBootcampState.id) {
        return console.error("Instructor ve BootcampState seçilmeli!")
      }

      this.bootcampCreateRequest.instructorId = this.selectedInstructor.id;
      this.bootcampCreateRequest.bootcampStateId = this.selectedBootcampState.id;

      this.bootcampService.createBootcamp(this.bootcampCreateRequest).subscribe(response => {
        this.bootcamp = {
          id: response.id,
          name: response.name,
          startDate: response.startDate,
          endDate: response.endDate,

          instructorId: this.selectedInstructor.id,
          instructorUserName: this.selectedInstructor.userName,
          instructorFirstName: '',
          instructorLastName: '',
          instructorCompanyName: this.selectedInstructor.companyName,

          bootcampStateId: this.selectedBootcampState.id,
          bootcampStateName: this.selectedBootcampState.name,

          createdDate: response.createdDate,
        };
        console.log(this.bootcamp)
        console.log(this.bootcampCreateRequest)
        this.bootcamps.items.push(this.bootcamp);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Bootcamp Created', life: 3000 });

      }).add(() => {
        this.bootcamps.items = [...this.bootcamps.items];
        this.bootcampCreateDialog = false;
        this.bootcampCreateRequest = {
          name: '',
          instructorId: '',
          bootcampStateId: '',
          startDate: this.minStartDate,
          endDate: this.minEndDate,
        };
        this.bootcamp = {
          id: '',
          name: '',
          startDate: new Date("0001-01-01T01:00:00"),
          endDate: new Date("0001-01-01T01:00:00"),

          instructorId: '',
          instructorUserName: '',
          instructorFirstName: '',
          instructorLastName: '',
          instructorCompanyName: '',

          bootcampStateId: '',
          bootcampStateName: '',

          createdDate: new Date("0001-01-01T01:00:00"),
        };
        this.selectedBootcampState = {
          id: '',
          name: ''
        }
        this.selectedInstructor = {
          id: '',
          userName: '',
          companyName: ''
        }

      });
    }
  }

  updateBootcamp() {
    this.submitted = true;
    console.log(this.bootcamp)
    if (this.bootcamp.name?.trim()) {
      if (!this.selectedInstructor.id || !this.selectedBootcampState.id) {
        return console.error("Instructor ve BootcampState seçilmeli!")
      }

      this.bootcampUpdateRequest.instructorId = this.selectedInstructor.id;
      this.bootcampUpdateRequest.bootcampStateId = this.selectedBootcampState.id;

      this.bootcampService.updateBootcamp(this.bootcampUpdateRequest).subscribe(response => {
        this.bootcamp = {
          id: response.id,
          name: response.name,
          startDate: response.startDate,
          endDate: response.endDate,

          instructorId: this.selectedInstructor.id,
          instructorUserName: this.selectedInstructor.userName,
          instructorFirstName: '',
          instructorLastName: '',
          instructorCompanyName: this.selectedInstructor.companyName,

          bootcampStateId: this.selectedBootcampState.id,
          bootcampStateName: this.selectedBootcampState.name,

          createdDate: this.bootcamp.createdDate,
        };
        console.log(this.bootcamp)
        console.log(this.bootcampUpdateRequest)
        this.bootcamps.items[this.findIndexById(this.bootcamp.id)] = this.bootcamp;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Bootcamp Updated', life: 3000 });
      }).add(() => {
        this.bootcamps.items = [...this.bootcamps.items];
        this.bootcampUpdateDialog = false;
        this.bootcampUpdateRequest = {
          id: '',
          name: '',
          instructorId: '',
          bootcampStateId: '',
          startDate: this.minStartDate,
          endDate: this.minEndDate,
        };
        this.bootcamp = {
          id: '',
          name: '',
          startDate: new Date("0001-01-01T01:00:00"),
          endDate: new Date("0001-01-01T01:00:00"),
  
          instructorId: '',
          instructorUserName: '',
          instructorFirstName: '',
          instructorLastName: '',
          instructorCompanyName: '',
  
          bootcampStateId: '',
          bootcampStateName: '',
  
          createdDate: new Date("0001-01-01T01:00:00"),
        };
        this.selectedBootcampState = {
          id: '',
          name: ''
        }
        this.selectedInstructor = {
          id: '',
          userName: '',
          companyName: ''
        }

      });
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.bootcamps.items.length; i++) {
      if (this.bootcamps.items[i].id === id) {
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
      case 'ACTIVE':
        return 'success';
      case 'INACTIVE':
        return 'warning';
      case 'CANCELLED':
        return 'danger';
      default:
        return '';
    }
  }

  filterTable(event: Event, dt: any): void {
    if (event.target instanceof HTMLInputElement) {
      this.filterValue = event.target.value;
      dt.filterGlobal(this.filterValue, 'contains');
    }
  }

  navigateToBootcampDetailPage(bootcamp: GetBootcampResponse) {
    const formattedName = this.formatService.formatBootcampDetailRoute(bootcamp.name);
    this.router.navigate(['/bootcamp', formattedName]);
  }

  onStartDateSelectCreate() {
    var newMinEndDate = new Date(this.bootcampCreateRequest.startDate.getFullYear(), this.bootcampCreateRequest.startDate.getMonth(), this.bootcampCreateRequest.startDate.getDate() + 7);
    this.minEndDate = newMinEndDate;
    this.bootcampCreateRequest.endDate = this.minEndDate
  }

  onStartDateSelectUpdate() {
    var newMinEndDate = new Date(this.bootcampUpdateRequest.startDate.getFullYear(), this.bootcampUpdateRequest.startDate.getMonth(), this.bootcampUpdateRequest.startDate.getDate() + 7);
    this.minEndDate = newMinEndDate;
    this.bootcampUpdateRequest.endDate = this.minEndDate
  }

  initializeFormDates() {
    this.minStartDate = new Date();
    this.minEndDate = new Date(this.minStartDate.getFullYear(), this.minStartDate.getMonth(), this.minStartDate.getDate() + 7);
  }

}