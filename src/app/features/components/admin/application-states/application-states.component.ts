import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MessageService, ConfirmationService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { CalendarModule } from "primeng/calendar";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { DialogModule } from "primeng/dialog";
import { DropdownModule } from "primeng/dropdown";
import { FileUploadModule } from "primeng/fileupload";
import { InputNumberModule } from "primeng/inputnumber";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { RadioButtonModule } from "primeng/radiobutton";
import { RatingModule } from "primeng/rating";
import { RippleModule } from "primeng/ripple";
import { TableModule } from "primeng/table";
import { TagModule } from "primeng/tag";
import { ToastModule } from "primeng/toast";
import { ToolbarModule } from "primeng/toolbar";
import { ListItemsDto } from "../../../../core/models/pagination/list-items-dto";
import { ApplicationStateCreateRequest } from "../../../models/requests/applicationStates/application-state-create-request";
import { ApplicationStateDeleteRangeRequest } from "../../../models/requests/applicationStates/application-state-delete-range-request";
import { ApplicationStateDeleteRequest } from "../../../models/requests/applicationStates/application-state-delete-request";
import { ApplicationStateRestoreRangeRequest } from "../../../models/requests/applicationStates/application-state-restore-range-request";
import { ApplicationStateRestoreRequest } from "../../../models/requests/applicationStates/application-state-restore-request";
import { ApplicationStateUpdateRequest } from "../../../models/requests/applicationStates/application-state-update-request";
import { ApplicationStateGetListDeletedResponse } from "../../../models/responses/application-states/application-state-get-list-deleted-response";
import { ApplicationStateGetListResponse } from "../../../models/responses/application-states/application-state-get-list-response";
import { ApplicationStateService } from "../../../services/concretes/application-state.service";


@Component({
  selector: 'app-application-states',
  standalone: true,
  imports: [TableModule, DialogModule, RippleModule, ButtonModule, ToastModule, ToolbarModule, ConfirmDialogModule, InputTextModule, InputTextareaModule, CommonModule, FileUploadModule, DropdownModule, TagModule, RadioButtonModule, RatingModule, InputTextModule, FormsModule, InputNumberModule, CalendarModule],
  providers: [ApplicationStateService, MessageService, ConfirmationService],
  templateUrl: './application-states.component.html',
  styleUrl: './application-states.component.scss'
})
export class ApplicationStatesComponent implements OnInit {
  applicationStateCreateDialog: boolean = false;
  applicationStateUpdateDialog: boolean = false;

  //
  applicationStates: ListItemsDto<ApplicationStateGetListResponse> = {
    index: 0,
    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: []
  };

  deletedApplicationStates: ListItemsDto<ApplicationStateGetListDeletedResponse> = {
    index: 0,
    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: []
  };

  applicationState!: ApplicationStateGetListResponse;
  deletedApplicationState!: ApplicationStateGetListDeletedResponse;

  applicationStateCreateRequest: ApplicationStateCreateRequest = {
    name: ''
  };

  applicationStateUpdateRequest: ApplicationStateUpdateRequest = {
    id: '',
    name: ''
  };

  applicationStateDeleteRequest: ApplicationStateDeleteRequest = {
    id: '',
    isPermament: false
  };

  applicationStateDeleteRangeRequest: ApplicationStateDeleteRangeRequest = {
    ids: [],
    isPermament: false
  };

  applicationStateRestoreRequest: ApplicationStateRestoreRequest = {
    id: ''
  };

  applicationStateRestoreRangeRequest: ApplicationStateRestoreRangeRequest = {
    ids: []
  };

  selectedApplicationStates!: ApplicationStateGetListResponse[] | null;
  selectedDeletedApplicationStates!: ApplicationStateGetListDeletedResponse[] | null;

  //
  submitted: boolean = false;
  submitButton: boolean = false;

  filterValues: string[] = ['', ''];

  readonly PAGE_SIZE = 30;

  minStartDate!: Date;
  minEndDate!: Date;

  constructor(
    private applicationStateService: ApplicationStateService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.applicationStateService.getList({ pageIndex: 0, pageSize: this.PAGE_SIZE }).subscribe(response => {
      this.applicationStates = response;
      console.log(this.applicationStates)
    });

    this.applicationStateService.getListDeleted({ pageIndex: 0, pageSize: this.PAGE_SIZE }).subscribe(response => {
      this.deletedApplicationStates = response;
      console.log(this.deletedApplicationStates)
    });

  }

  openNew() {

    this.applicationStateCreateRequest = {
      name: ''
    };

    this.applicationStateCreateDialog = true;
    this.submitted = false;
  }

  openEdit(applicationState: ApplicationStateGetListResponse) {
    this.applicationState = { ...applicationState };

    this.applicationStateUpdateRequest = {
      id: this.applicationState.id,
      name: this.applicationState.name
    };

    this.applicationStateUpdateDialog = true;
    this.submitted = false;
  }

  hideDialog() {
    this.applicationStateCreateDialog = false;
    this.applicationStateUpdateDialog = false;
    this.submitted = false;
  }

  deleteSelectedApplicationStates(isPermament: boolean) {
    this.confirmationService.confirm({
      message: 'Seçilen kurs durumlarını silmek istediğine emin misin?',
      header: 'Toplu Sil',
      rejectLabel: 'İptal',
      acceptLabel: 'Sil',
      defaultFocus: 'reject',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log(this.selectedApplicationStates)

        if (this.selectedApplicationStates || this.selectedDeletedApplicationStates) {
          this.applicationStateDeleteRangeRequest = {
            ids: [],
            isPermament: isPermament
          };

          if (isPermament) {
            if (this.selectedDeletedApplicationStates) {
              this.selectedDeletedApplicationStates.forEach(b => {
                if (b.id) {
                  this.applicationStateDeleteRangeRequest.ids.push(b.id);
                }
              });
            }
          }
          else {
            if (this.selectedApplicationStates) {
              this.selectedApplicationStates.forEach(b => {
                if (b.id) {
                  this.applicationStateDeleteRangeRequest.ids.push(b.id);
                }
              });
            }
          }


          this.applicationStateService.deleteRangeApplicationState(this.applicationStateDeleteRangeRequest).subscribe(response => {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'ApplicationStates Deleted', life: 3000 });

            if (!isPermament) {
              this.selectedApplicationStates?.forEach(b => {
                this.deletedApplicationState = {
                  id: b.id,
                  name: b.name,
                  createdDate: b.createdDate,
                  deletedDate: response.deletedDate
                };
                this.deletedApplicationStates.items.push(this.deletedApplicationState);
              });

              this.applicationStates.items = this.applicationStates.items.filter((val) => !this.selectedApplicationStates?.includes(val));
            }
            else {
              this.deletedApplicationStates.items = this.deletedApplicationStates.items.filter((val) => !this.selectedDeletedApplicationStates?.includes(val));
            }


          }).add(() => {
            this.selectedApplicationStates = [];
            this.selectedDeletedApplicationStates = [];
            this.deletedApplicationState = {
              id: '',
              name: '',
              createdDate: new Date("0001-01-01T01:00:00"),
              deletedDate: new Date("0001-01-01T01:00:00")
            };
            this.applicationStateDeleteRangeRequest = {
              ids: [],
              isPermament: false
            }
          });
        }
      }
    });
  }

  restoreSelectedApplicationStates() {
    this.confirmationService.confirm({
      message: 'Seçilen silinmiş kurs durumlarını kurtarmak istediğine emin misin?',
      header: 'Toplu Kurtar',
      rejectLabel: 'İptal',
      acceptLabel: 'Kurtar',
      defaultFocus: 'reject',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        if (this.selectedDeletedApplicationStates) {
          this.applicationStateRestoreRangeRequest = {
            ids: []
          }

          this.selectedDeletedApplicationStates.forEach(b => {
            if (b.id) {
              this.applicationStateRestoreRangeRequest.ids.push(b.id);
            }
          });

          this.applicationStateService.restoreRangeApplicationState(this.applicationStateRestoreRangeRequest).subscribe(response => {
            this.selectedDeletedApplicationStates?.forEach(b => {
              this.applicationState = {
                id: b.id,
                name: b.name,
                createdDate: b.createdDate,
              };
              this.applicationStates.items.push(this.applicationState);

            });

            this.deletedApplicationStates.items = this.deletedApplicationStates.items.filter((val) => !this.selectedDeletedApplicationStates?.includes(val));
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'ApplicationStates Restored', life: 3000 });

          }).add(() => {
            this.selectedApplicationStates = [];
            this.selectedDeletedApplicationStates = [];
            this.applicationState = {
              id: '',
              name: '',
              createdDate: new Date("0001-01-01T01:00:00")
            };
            this.applicationStateRestoreRangeRequest = {
              ids: []
            }
          });
        }
      }
    });
  }

  deleteApplicationState(applicationState: ApplicationStateGetListResponse, isPermament: boolean) {
    console.log(applicationState)
    this.confirmationService.confirm({
      message: '"' + applicationState.name + '" Adlı kurs durumunu silmek istediğine emin misin?',
      header: 'Sil',
      rejectLabel: 'İptal',
      acceptLabel: 'Sil',
      defaultFocus: 'reject',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.applicationStateDeleteRequest = {
          id: applicationState.id,
          isPermament: isPermament
        }

        this.applicationStateService.deleteApplicationState(this.applicationStateDeleteRequest).subscribe(response => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'ApplicationState Deleted', life: 3000 });

          if (!this.applicationStateDeleteRequest.isPermament) {
            this.deletedApplicationState = {
              id: response.id,
              name: applicationState.name,
              createdDate: applicationState.createdDate,
              deletedDate: response.deletedDate
            };

            this.applicationStates.items = this.applicationStates.items.filter((val) => val.id !== applicationState.id);
            this.deletedApplicationStates.items.push(this.deletedApplicationState);

          }
          else {
            this.deletedApplicationStates.items = this.deletedApplicationStates.items.filter((val) => val.id !== applicationState.id);
          }

        }).add(() => {
          this.deletedApplicationState = {
            id: '',
            name: '',
            createdDate: new Date("0001-01-01T01:00:00"),
            deletedDate: new Date("0001-01-01T01:00:00")
          };
          this.applicationStateDeleteRequest = {
            id: '',
            isPermament: false
          }

        });
      }
    });
  }

  restoreApplicationState(applicationState: ApplicationStateGetListDeletedResponse) {
    console.log(applicationState)
    this.confirmationService.confirm({
      message: '"' + applicationState.name + '" Adlı silinen kurs durumunu kurtarmak istediğine emin misin?',
      header: 'Kurtar',
      rejectLabel: 'İptal',
      acceptLabel: 'Kurtar',
      defaultFocus: 'reject',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.applicationStateRestoreRequest = {
          id: applicationState.id
        }

        this.applicationStateService.restoreApplicationState(this.applicationStateRestoreRequest).subscribe(response => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'ApplicationState Restored', life: 3000 });

          this.applicationState = {
            id: response.id,
            name: response.name,
            createdDate: applicationState.createdDate
          };

          this.deletedApplicationStates.items = this.deletedApplicationStates.items.filter((val) => val.id !== applicationState.id);
          this.applicationStates.items.push(this.applicationState);

        }).add(() => {
          this.applicationState = {
            id: '',
            name: '',
            createdDate: new Date("0001-01-01T01:00:00")
          };
          this.applicationStateRestoreRequest = {
            id: ''
          };
        });
      }
    });
  }

  createApplicationState() {
    this.submitted = true;
    this.submitButton = true;

    if (this.validationControl("create")) {

      this.applicationStateService.createApplicationState(this.applicationStateCreateRequest).subscribe(response => {
        this.applicationStateCreateDialog = false;
        this.submitted = false;
        this.submitButton = false;

        this.applicationState = {
          id: response.id,
          name: response.name,
          createdDate: response.createdDate
        };

        this.applicationStates.items.push(this.applicationState);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'ApplicationState Created', life: 3000 });

      }).add(() => {
        this.applicationStates.items = [...this.applicationStates.items];
        this.applicationStateCreateDialog = false;
        this.applicationStateCreateRequest = {
          name: ''
        };
        this.applicationState = {
          id: '',
          name: '',
          createdDate: new Date("0001-01-01T01:00:00"),
        };

      });
    }
    else {
      this.submitButton = false;
    }
  }

  updateApplicationState() {
    this.submitted = true;
    this.submitButton = true;

    if (this.validationControl("update")) {

      this.applicationStateService.updateApplicationState(this.applicationStateUpdateRequest).subscribe(response => {
        this.applicationStateUpdateDialog = false;
        this.submitted = false;
        this.submitButton = false;

        this.applicationState = {
          id: response.id,
          name: response.name,
          createdDate: this.applicationState.createdDate
        };

        this.applicationStates.items[this.findIndexById(this.applicationState.id)] = this.applicationState;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'ApplicationState Updated', life: 3000 });
      }).add(() => {
        this.applicationStates.items = [...this.applicationStates.items];
        this.applicationStateUpdateDialog = false;
        this.applicationStateUpdateRequest = {
          id: '',
          name: ''
        };
        this.applicationState = {
          id: '',
          name: '',
          createdDate: new Date("0001-01-01T01:00:00")
        };

      });
    }
    else {
      this.submitButton = false;
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.applicationStates.items.length; i++) {
      if (this.applicationStates.items[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  getSeverity(status: string) {
    switch (status) {
      case 'DEĞERLENDIRME':
        return 'warning';
      case 'ONAYLANDI':
        return 'success';
      case 'RED EDILDI':
        return 'danger';
      default:
        return '';
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

  validationControl(requestName: string): boolean {
    switch (requestName) {
      case "create":
        if (
          this.applicationStateCreateRequest.name.trim()) {
          return true;
        }
        return false
      case "update":
        if (
          this.applicationStateUpdateRequest.name.trim()) {
          return true;
        }
        return false
      default:
        return false;
    }
  }

}