
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
import { BootcampGetListResponse } from '../../../models/responses/bootcamps/bootcamp-get-list-response';
import { BootcampService } from '../../../services/concretes/bootcamp.service';
import { FormatService } from '../../../services/concretes/format.service';
import { BootcampStateService } from '../../../services/concretes/bootcamp-state.service';
import { BootcampStateGetListResponse } from '../../../models/responses/bootcamp-states/bootcamp-state-get-list-response';
import { BootcampCreateRequest } from '../../../models/requests/bootcamps/bootcamp-create-request';
import { CalendarModule } from 'primeng/calendar';
import { InstructorService } from '../../../services/concretes/instructor.service';
import { InstructorGetBasicInfoResponse } from '../../../models/responses/instructors/instructor-get-basic-info-response';
import { BootcampUpdateRequest } from '../../../models/requests/bootcamps/bootcamp-update-request';
import { BootcampDeleteRequest } from '../../../models/requests/bootcamps/bootcamp-delete-request';
import { ListItemsDto } from '../../../../core/models/pagination/list-items-dto';
import { BootcampGetListDeletedResponse } from '../../../models/responses/bootcamps/bootcamp-get-list-deleted-response';
import { BootcampRestoreRequest } from '../../../models/requests/bootcamps/bootcamp-restore-request';
import { BootcampDeleteRangeRequest } from '../../../models/requests/bootcamps/bootcamp-delete-range-request';
import { BootcampRestoreRangeRequest } from '../../../models/requests/bootcamps/bootcamp-restore-range-request';


@Component({
  selector: 'app-bootcamps',
  standalone: true,
  imports: [TableModule, DialogModule, RippleModule, ButtonModule, ToastModule, ToolbarModule, ConfirmDialogModule, InputTextModule, InputTextareaModule, CommonModule, FileUploadModule, DropdownModule, TagModule, RadioButtonModule, RatingModule, InputTextModule, FormsModule, InputNumberModule, CalendarModule],
  providers: [BootcampService, MessageService, ConfirmationService],
  templateUrl: './bootcamps.component.html',
  styleUrl: './bootcamps.component.scss'
})
export class BootcampsComponent implements OnInit {
  bootcampCreateDialog: boolean = false;
  bootcampUpdateDialog: boolean = false;

  //
  bootcamps: ListItemsDto<BootcampGetListResponse> = {
    index: 0,
    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: []
  };

  deletedBootcamps: ListItemsDto<BootcampGetListDeletedResponse> = {
    index: 0,
    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: []
  };

  bootcamp!: BootcampGetListResponse;
  deletedBootcamp!: BootcampGetListDeletedResponse;

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

  bootcampDeleteRequest: BootcampDeleteRequest = {
    id: '',
    isPermament: false
  };

  bootcampDeleteRangeRequest: BootcampDeleteRangeRequest = {
    ids: [],
    isPermament: false
  };

  bootcampRestoreRequest: BootcampRestoreRequest = {
    id: ''
  };

  bootcampRestoreRangeRequest: BootcampRestoreRangeRequest = {
    ids: []
  };

  selectedBootcamps!: BootcampGetListResponse[] | null;
  selectedDeletedBootcamps!: BootcampGetListDeletedResponse[] | null;

  //
  bootcampStates!: BootcampStateGetListResponse[];

  selectedBootcampState: BootcampStateGetListResponse = {
    id: '',
    name: '',
    createdDate: new Date("0001-01-01T01:00:00")
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
  submitButton: boolean = false;

  filterValues: string[] = ['', ''];

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

    this.bootcampService.getListDeleted({ pageIndex: 0, pageSize: this.PAGE_SIZE }).subscribe(response => {
      this.deletedBootcamps = response;
      console.log(this.deletedBootcamps)
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
      name: '',
      createdDate: new Date("0001-01-01T01:00:00")
    };
    this.selectedInstructor = {
      id: '',
      userName: '',
      companyName: ''
    }

    this.bootcampCreateDialog = true;
    this.submitted = false;
  }

  openEdit(bootcamp: BootcampGetListResponse) {
    this.bootcamp = { ...bootcamp };

    this.initializeFormDates();

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
      name: this.bootcamp.bootcampStateName,
      createdDate: new Date("0001-01-01T01:00:00")
    };
    this.selectedInstructor = {
      id: this.bootcamp.instructorId,
      userName: this.bootcamp.instructorUserName,
      companyName: this.bootcamp.instructorCompanyName
    }

    this.bootcampUpdateDialog = true;
    this.submitted = false;
  }

  hideDialog() {
    this.bootcampCreateDialog = false;
    this.bootcampUpdateDialog = false;
    this.submitted = false;
    this.submitButton = false;
  }

  deleteSelectedBootcamps(isPermament: boolean) {
    this.confirmationService.confirm({
      message: 'Seçilen kursları silmek istediğine emin misin?',
      header: 'Toplu Sil',
      rejectLabel: 'İptal',
      acceptLabel: 'Sil',
      defaultFocus: 'reject',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log(this.selectedBootcamps)

        if (this.selectedBootcamps || this.selectedDeletedBootcamps) {
          this.bootcampDeleteRangeRequest = {
            ids: [],
            isPermament: isPermament
          };

          if (isPermament) {
            if (this.selectedDeletedBootcamps) {
              this.selectedDeletedBootcamps.forEach(b => {
                if (b.id) {
                  this.bootcampDeleteRangeRequest.ids.push(b.id);
                }
              });
            }
          }
          else {
            if (this.selectedBootcamps) {
              this.selectedBootcamps.forEach(b => {
                if (b.id) {
                  this.bootcampDeleteRangeRequest.ids.push(b.id);
                }
              });
            }
          }


          this.bootcampService.deleteRangeBootcamp(this.bootcampDeleteRangeRequest).subscribe(response => {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Bootcamps Deleted', life: 3000 });

            if (!isPermament) {
              this.selectedBootcamps?.forEach(b => {
                this.deletedBootcamp = {
                  id: b.id,
                  name: b.name,
                  startDate: b.startDate,
                  endDate: b.endDate,

                  instructorId: b.instructorId,
                  instructorUserName: b.instructorUserName,
                  instructorFirstName: b.instructorFirstName,
                  instructorLastName: b.instructorLastName,
                  instructorCompanyName: b.instructorCompanyName,

                  bootcampStateId: b.bootcampStateId,
                  bootcampStateName: b.bootcampStateName,

                  createdDate: b.createdDate,
                  deletedDate: response.deletedDate,
                };
                this.deletedBootcamps.items.push(this.deletedBootcamp);
              });

              this.bootcamps.items = this.bootcamps.items.filter((val) => !this.selectedBootcamps?.includes(val));
            }
            else {
              this.deletedBootcamps.items = this.deletedBootcamps.items.filter((val) => !this.selectedDeletedBootcamps?.includes(val));
            }


          }).add(() => {
            this.selectedBootcamps = [];
            this.selectedDeletedBootcamps = [];
            this.deletedBootcamp = {
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
              deletedDate: new Date("0001-01-01T01:00:00")
            };
            this.bootcampDeleteRangeRequest = {
              ids: [],
              isPermament: false
            }
          });
        }
      }
    });
  }

  restoreSelectedBootcamps() {
    this.confirmationService.confirm({
      message: 'Seçilen silinmiş kursları kurtarmak istediğine emin misin?',
      header: 'Toplu Kurtar',
      rejectLabel: 'İptal',
      acceptLabel: 'Kurtar',
      defaultFocus: 'reject',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        if (this.selectedDeletedBootcamps) {
          this.bootcampRestoreRangeRequest = {
            ids: []
          }

          this.selectedDeletedBootcamps.forEach(b => {
            if (b.id) {
              this.bootcampRestoreRangeRequest.ids.push(b.id);
            }
          });

          this.bootcampService.restoreRangeBootcamp(this.bootcampRestoreRangeRequest).subscribe(response => {
            this.selectedDeletedBootcamps?.forEach(b => {
              this.bootcamp = {
                id: b.id,
                name: b.name,
                startDate: b.startDate,
                endDate: b.endDate,

                instructorId: b.instructorId,
                instructorUserName: b.instructorUserName,
                instructorFirstName: b.instructorFirstName,
                instructorLastName: b.instructorLastName,
                instructorCompanyName: b.instructorCompanyName,

                bootcampStateId: b.bootcampStateId,
                bootcampStateName: b.bootcampStateName,

                createdDate: b.createdDate,
              };
              this.bootcamps.items.push(this.bootcamp);

            });

            this.deletedBootcamps.items = this.deletedBootcamps.items.filter((val) => !this.selectedDeletedBootcamps?.includes(val));
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Bootcamps Restored', life: 3000 });

          }).add(() => {
            this.selectedBootcamps = [];
            this.selectedDeletedBootcamps = [];
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
            this.bootcampRestoreRangeRequest = {
              ids: []
            }
          });
        }
      }
    });
  }

  deleteBootcamp(bootcamp: BootcampGetListResponse, isPermament: boolean) {
    console.log(bootcamp)
    this.confirmationService.confirm({
      message: '"' + bootcamp.name + '" Adlı kursu silmek istediğine emin misin?',
      header: 'Sil',
      rejectLabel: 'İptal',
      acceptLabel: 'Sil',
      defaultFocus: 'reject',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.bootcampDeleteRequest = {
          id: bootcamp.id,
          isPermament: isPermament
        }

        this.bootcampService.deleteBootcamp(this.bootcampDeleteRequest).subscribe(response => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Bootcamp Deleted', life: 3000 });

          if (!this.bootcampDeleteRequest.isPermament) {
            this.deletedBootcamp = {
              id: response.id,
              name: bootcamp.name,
              startDate: bootcamp.startDate,
              endDate: bootcamp.endDate,

              instructorId: bootcamp.instructorId,
              instructorUserName: bootcamp.instructorUserName,
              instructorFirstName: bootcamp.instructorFirstName,
              instructorLastName: bootcamp.instructorLastName,
              instructorCompanyName: bootcamp.instructorCompanyName,

              bootcampStateId: bootcamp.bootcampStateId,
              bootcampStateName: bootcamp.bootcampStateName,

              createdDate: bootcamp.createdDate,
              deletedDate: response.deletedDate,
            };

            this.bootcamps.items = this.bootcamps.items.filter((val) => val.id !== bootcamp.id);
            this.deletedBootcamps.items.push(this.deletedBootcamp);

          }
          else {
            this.deletedBootcamps.items = this.deletedBootcamps.items.filter((val) => val.id !== bootcamp.id);
          }

        }).add(() => {
          this.deletedBootcamp = {
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
            deletedDate: new Date("0001-01-01T01:00:00")
          };
          this.bootcampDeleteRequest = {
            id: '',
            isPermament: false
          }

        });
      }
    });
  }

  restoreBootcamp(bootcamp: BootcampGetListDeletedResponse) {
    console.log(bootcamp)
    this.confirmationService.confirm({
      message: '"' + bootcamp.name + '" Adlı silinen kursu kurtarmak istediğine emin misin?',
      header: 'Kurtar',
      rejectLabel: 'İptal',
      acceptLabel: 'Kurtar',
      defaultFocus: 'reject',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.bootcampRestoreRequest = {
          id: bootcamp.id
        }

        this.bootcampService.restoreBootcamp(this.bootcampRestoreRequest).subscribe(response => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Bootcamp Restored', life: 3000 });

          this.bootcamp = {
            id: response.id,
            name: response.name,
            startDate: bootcamp.startDate,
            endDate: bootcamp.endDate,

            instructorId: bootcamp.instructorId,
            instructorUserName: bootcamp.instructorUserName,
            instructorFirstName: bootcamp.instructorFirstName,
            instructorLastName: bootcamp.instructorLastName,
            instructorCompanyName: bootcamp.instructorCompanyName,

            bootcampStateId: bootcamp.bootcampStateId,
            bootcampStateName: bootcamp.bootcampStateName,

            createdDate: bootcamp.createdDate
          };

          this.deletedBootcamps.items = this.deletedBootcamps.items.filter((val) => val.id !== bootcamp.id);
          this.bootcamps.items.push(this.bootcamp);

        }).add(() => {
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
          this.bootcampRestoreRequest = {
            id: ''
          };
        });
      }
    });
  }

  createBootcamp() {
    this.submitted = true;
    this.submitButton = true;

    if (!this.selectedInstructor.id || !this.selectedBootcampState.id) {
      this.submitButton = false;
      return
    }

    this.bootcampCreateRequest.instructorId = this.selectedInstructor.id;
    this.bootcampCreateRequest.bootcampStateId = this.selectedBootcampState.id;

    if (this.validationControl("create")) {

      this.bootcampService.createBootcamp(this.bootcampCreateRequest).subscribe(response => {
        this.hideDialog();

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

        this.bootcamps.items.push(this.bootcamp);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Bootcamp Created', life: 3000 });

      }, error => {
        this.submitButton = false;
        console.log("bir hata oluştu.")
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
          name: '',
          createdDate: new Date("0001-01-01T01:00:00")
        }
        this.selectedInstructor = {
          id: '',
          userName: '',
          companyName: ''
        }

      });
    }
    else {
      this.submitButton = false;
    }
  }

  updateBootcamp() {
    this.submitted = true;
    this.submitButton = true;

    if (!this.selectedInstructor.id || !this.selectedBootcampState.id) {
      this.submitButton = false;
      return
    }

    this.bootcampUpdateRequest.instructorId = this.selectedInstructor.id;
    this.bootcampUpdateRequest.bootcampStateId = this.selectedBootcampState.id;

    if (this.validationControl("update")) {

      this.bootcampService.updateBootcamp(this.bootcampUpdateRequest).subscribe(response => {
        this.hideDialog();

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

        this.bootcamps.items[this.findIndexById(this.bootcamp.id)] = this.bootcamp;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Bootcamp Updated', life: 3000 });
      }, error => {
        this.submitButton = false;
        console.log("bir hata oluştu.")
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

          createdDate: new Date("0001-01-01T01:00:00")
        };
        this.selectedBootcampState = {
          id: '',
          name: '',
          createdDate: new Date("0001-01-01T01:00:00")
        }
        this.selectedInstructor = {
          id: '',
          userName: '',
          companyName: ''
        }

      });
    }
    else {
      this.submitButton = false;
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

  getSeverity(status: string) {
    switch (status) {
      case 'PLANLANDI':
        return 'info';
      case 'DEVAM EDIYOR':
        return 'warning';
      case 'TAMAMLANDI':
        return 'success';
      case 'İPTAL EDILDI':
        return 'danger';
      default:
        return 'info';
    }
  }

  filterTable(event: Event, dt: any, index: number): void {
    if (event.target instanceof HTMLInputElement) {
      this.filterValues[index] = event.target.value;
      dt.filterGlobal(this.filterValues[index], 'contains');
    }
  }

  clearFilter(dt: any, index: number) {
    dt.clear();
    this.filterValues[index] = ''
  }

  navigateToBootcampDetailPage(bootcamp: BootcampGetListResponse) {
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

  validationControl(requestName: string): boolean {
    switch (requestName) {
      case "create":
        if (
          !this.bootcampCreateRequest.name?.trim() ||
          !this.bootcampCreateRequest.instructorId?.trim() ||
          !this.bootcampCreateRequest.bootcampStateId?.trim() ||
          !this.bootcampCreateRequest.startDate ||
          !this.bootcampCreateRequest.endDate
        ) {
          return false;
        }
        return true;
      case "update":
        if (
          !this.bootcampUpdateRequest.id?.trim() ||
          !this.bootcampUpdateRequest.name?.trim() ||
          !this.bootcampUpdateRequest.instructorId?.trim() ||
          !this.bootcampUpdateRequest.bootcampStateId?.trim() ||
          !this.bootcampUpdateRequest.startDate ||
          !this.bootcampUpdateRequest.endDate
        ) {
          return false;
        }
        return true;
      default:
        return false;
    }
  }

}