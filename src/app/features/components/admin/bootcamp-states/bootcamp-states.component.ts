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
import { BootcampStateCreateRequest } from "../../../models/requests/bootcampStates/bootcamp-state-create-request";
import { BootcampStateDeleteRangeRequest } from "../../../models/requests/bootcampStates/bootcamp-state-delete-range-request";
import { BootcampStateDeleteRequest } from "../../../models/requests/bootcampStates/bootcamp-state-delete-request";
import { BootcampStateRestoreRangeRequest } from "../../../models/requests/bootcampStates/bootcamp-state-restore-range-request";
import { BootcampStateRestoreRequest } from "../../../models/requests/bootcampStates/bootcamp-state-restore-request";
import { BootcampStateUpdateRequest } from "../../../models/requests/bootcampStates/bootcamp-state-update-request";
import { BootcampStateGetListDeletedResponse } from "../../../models/responses/bootcamp-states/bootcamp-state-get-list-deleted-response";
import { BootcampStateGetListResponse } from "../../../models/responses/bootcamp-states/bootcamp-state-get-list-response";
import { BootcampStateService } from "../../../services/concretes/bootcamp-state.service";
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-bootcamp-states',
  standalone: true,
  imports: [TooltipModule, TableModule, DialogModule, RippleModule, ButtonModule, ToastModule, ToolbarModule, ConfirmDialogModule, InputTextModule, InputTextareaModule, CommonModule, FileUploadModule, DropdownModule, TagModule, RadioButtonModule, RatingModule, InputTextModule, FormsModule, InputNumberModule, CalendarModule],
  providers: [BootcampStateService, MessageService, ConfirmationService],
  templateUrl: './bootcamp-states.component.html',
  styleUrl: './bootcamp-states.component.scss'
})
export class BootcampStatesComponent implements OnInit {
  bootcampStateCreateDialog: boolean = false;
  bootcampStateUpdateDialog: boolean = false;

  //
  bootcampStates: ListItemsDto<BootcampStateGetListResponse> = {
    index: 0,
    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: []
  };

  deletedBootcampStates: ListItemsDto<BootcampStateGetListDeletedResponse> = {
    index: 0,
    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: []
  };

  bootcampState!: BootcampStateGetListResponse;
  deletedBootcampState!: BootcampStateGetListDeletedResponse;

  bootcampStateCreateRequest: BootcampStateCreateRequest = {
    name: ''
  };

  bootcampStateUpdateRequest: BootcampStateUpdateRequest = {
    id: '',
    name: ''
  };

  bootcampStateDeleteRequest: BootcampStateDeleteRequest = {
    id: '',
    isPermament: false
  };

  bootcampStateDeleteRangeRequest: BootcampStateDeleteRangeRequest = {
    ids: [],
    isPermament: false
  };

  bootcampStateRestoreRequest: BootcampStateRestoreRequest = {
    id: ''
  };

  bootcampStateRestoreRangeRequest: BootcampStateRestoreRangeRequest = {
    ids: []
  };

  selectedBootcampStates!: BootcampStateGetListResponse[] | null;
  selectedDeletedBootcampStates!: BootcampStateGetListDeletedResponse[] | null;

  //
  submitted: boolean = false;
  submitButton: boolean = false;

  filterValues: string[] = ['', ''];

  readonly PAGE_SIZE = 30;

  constructor(
    private bootcampStateService: BootcampStateService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.bootcampStateService.getList({ pageIndex: 0, pageSize: this.PAGE_SIZE }).subscribe(response => {
      this.bootcampStates = response;
      console.log(this.bootcampStates)
    });

    this.bootcampStateService.getListDeleted({ pageIndex: 0, pageSize: this.PAGE_SIZE }).subscribe(response => {
      this.deletedBootcampStates = response;
      console.log(this.deletedBootcampStates)
    });

  }

  openNew() {
    this.bootcampStateCreateRequest = {
      name: ''
    };

    this.bootcampStateCreateDialog = true;
    this.submitted = false;
  }

  openEdit(bootcampState: BootcampStateGetListResponse) {
    this.bootcampState = { ...bootcampState };

    this.bootcampStateUpdateRequest = {
      id: this.bootcampState.id,
      name: this.bootcampState.name
    };

    this.bootcampStateUpdateDialog = true;
    this.submitted = false;
  }

  hideDialog() {
    this.bootcampStateCreateDialog = false;
    this.bootcampStateUpdateDialog = false;
    this.submitted = false;
    this.submitButton = false;
  }

  deleteSelectedBootcampStates(isPermament: boolean) {
    this.confirmationService.confirm({
      message: 'Seçilen kurs durumlarını silmek istediğine emin misin?',
      header: 'Toplu Sil',
      rejectLabel: 'İptal',
      acceptLabel: 'Sil',
      defaultFocus: 'reject',
      acceptButtonStyleClass: "delete-accept",
      rejectButtonStyleClass: "delete-reject",
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        if (this.selectedBootcampStates || this.selectedDeletedBootcampStates) {
          this.bootcampStateDeleteRangeRequest = {
            ids: [],
            isPermament: isPermament
          };

          if (isPermament) {
            if (this.selectedDeletedBootcampStates) {
              this.selectedDeletedBootcampStates.forEach(b => {
                if (b.id) {
                  this.bootcampStateDeleteRangeRequest.ids.push(b.id);
                }
              });
            }
          }
          else {
            if (this.selectedBootcampStates) {
              this.selectedBootcampStates.forEach(b => {
                if (b.id) {
                  this.bootcampStateDeleteRangeRequest.ids.push(b.id);
                }
              });
            }
          }

          this.bootcampStateService.deleteRangeBootcampState(this.bootcampStateDeleteRangeRequest).subscribe(response => {

            if (!isPermament) {
              this.selectedBootcampStates?.forEach(b => {
                this.deletedBootcampState = {
                  id: b.id,
                  name: b.name,
                  createdDate: b.createdDate,
                  deletedDate: response.deletedDate
                };
                this.deletedBootcampStates.items.push(this.deletedBootcampState);
              });

              this.bootcampStates.items = this.bootcampStates.items.filter((val) => !this.selectedBootcampStates?.includes(val));
              this.messageService.add({ severity: 'warn', summary: 'Uyarı', detail: 'Seçili etkinlik durumları silindi.', life: 4000 });
            }
            else {
              this.deletedBootcampStates.items = this.deletedBootcampStates.items.filter((val) => !this.selectedDeletedBootcampStates?.includes(val));
              this.messageService.add({ severity: 'error', summary: 'Uyarı', detail: 'Seçili etkinlik durumları kalıcı olarak silindi.', life: 5000 });
            }

          }, error => {
            this.messageService.add({ severity: 'error', summary: 'Hata', detail: 'Bir hata meydana geldi.', life: 4000 });
          }).add(() => {
            this.selectedBootcampStates = [];
            this.selectedDeletedBootcampStates = [];
            this.deletedBootcampState = {
              id: '',
              name: '',
              createdDate: new Date("0001-01-01T01:00:00"),
              deletedDate: new Date("0001-01-01T01:00:00")
            };
            this.bootcampStateDeleteRangeRequest = {
              ids: [],
              isPermament: false
            }
          });
        }
      }
    });
  }

  restoreSelectedBootcampStates() {
    this.confirmationService.confirm({
      message: 'Seçilen silinmiş kurs durumlarını geri yüklemek istediğine emin misin?',
      header: 'Toplu Geri Yükle',
      rejectLabel: 'İptal',
      acceptLabel: 'Geri Yükle',
      defaultFocus: 'reject',
      acceptButtonStyleClass: "restore-accept",
      rejectButtonStyleClass: "restore-reject",
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        if (this.selectedDeletedBootcampStates) {
          this.bootcampStateRestoreRangeRequest = {
            ids: []
          }

          this.selectedDeletedBootcampStates.forEach(b => {
            if (b.id) {
              this.bootcampStateRestoreRangeRequest.ids.push(b.id);
            }
          });

          this.bootcampStateService.restoreRangeBootcampState(this.bootcampStateRestoreRangeRequest).subscribe(response => {
            this.selectedDeletedBootcampStates?.forEach(b => {
              this.bootcampState = {
                id: b.id,
                name: b.name,
                createdDate: b.createdDate,
              };
              this.bootcampStates.items.push(this.bootcampState);

            });

            this.deletedBootcampStates.items = this.deletedBootcampStates.items.filter((val) => !this.selectedDeletedBootcampStates?.includes(val));
            this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Seçili etkinlik durumları geri yüklendi.', life: 4000 });

          }, error => {
            this.messageService.add({ severity: 'error', summary: 'Hata', detail: 'Bir hata meydana geldi.', life: 4000 });
          }).add(() => {
            this.selectedBootcampStates = [];
            this.selectedDeletedBootcampStates = [];
            this.bootcampState = {
              id: '',
              name: '',
              createdDate: new Date("0001-01-01T01:00:00")
            };
            this.bootcampStateRestoreRangeRequest = {
              ids: []
            }
          });
        }
      }
    });
  }

  deleteBootcampState(bootcampState: BootcampStateGetListResponse, isPermament: boolean) {
    this.confirmationService.confirm({
      message: '"' + bootcampState.name + '" Adlı kurs durumunu silmek istediğine emin misin?',
      header: 'Sil',
      rejectLabel: 'İptal',
      acceptLabel: 'Sil',
      defaultFocus: 'reject',
      acceptButtonStyleClass: "delete-accept",
      rejectButtonStyleClass: "delete-reject",
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.bootcampStateDeleteRequest = {
          id: bootcampState.id,
          isPermament: isPermament
        }

        this.bootcampStateService.deleteBootcampState(this.bootcampStateDeleteRequest).subscribe(response => {

          if (!this.bootcampStateDeleteRequest.isPermament) {
            this.deletedBootcampState = {
              id: response.id,
              name: bootcampState.name,
              createdDate: bootcampState.createdDate,
              deletedDate: response.deletedDate
            };

            this.bootcampStates.items = this.bootcampStates.items.filter((val) => val.id !== bootcampState.id);
            this.deletedBootcampStates.items.push(this.deletedBootcampState);
            this.messageService.add({ severity: 'warn', summary: 'Uyarı', detail: 'Bir etkinlik durumu silindi.', life: 4000 });
          }
          else {
            this.deletedBootcampStates.items = this.deletedBootcampStates.items.filter((val) => val.id !== bootcampState.id);
            this.messageService.add({ severity: 'error', summary: 'Uyarı', detail: 'Bir etkinlik durumu kalıcı olarak silindi.', life: 5000 });
          }

        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Hata', detail: 'Bir hata meydana geldi.', life: 4000 });
        }).add(() => {
          this.deletedBootcampState = {
            id: '',
            name: '',
            createdDate: new Date("0001-01-01T01:00:00"),
            deletedDate: new Date("0001-01-01T01:00:00")
          };
          this.bootcampStateDeleteRequest = {
            id: '',
            isPermament: false
          }

        });
      }
    });
  }

  restoreBootcampState(bootcampState: BootcampStateGetListDeletedResponse) {
    this.confirmationService.confirm({
      message: '"' + bootcampState.name + '" Adlı silinen kurs durumunu geri yüklemek istediğine emin misin?',
      header: 'Geri Yükle',
      rejectLabel: 'İptal',
      acceptLabel: 'Geri Yükle',
      defaultFocus: 'reject',
      acceptButtonStyleClass: "restore-accept",
      rejectButtonStyleClass: "restore-reject",
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.bootcampStateRestoreRequest = {
          id: bootcampState.id
        }

        this.bootcampStateService.restoreBootcampState(this.bootcampStateRestoreRequest).subscribe(response => {

          this.bootcampState = {
            id: response.id,
            name: response.name,
            createdDate: bootcampState.createdDate
          };

          this.deletedBootcampStates.items = this.deletedBootcampStates.items.filter((val) => val.id !== bootcampState.id);
          this.bootcampStates.items.push(this.bootcampState);
          this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Etkinlik durumu geri yüklendi.', life: 4000 });

        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Hata', detail: 'Bir hata meydana geldi.', life: 4000 });
        }).add(() => {
          this.bootcampState = {
            id: '',
            name: '',
            createdDate: new Date("0001-01-01T01:00:00")
          };
          this.bootcampStateRestoreRequest = {
            id: ''
          };
        });
      }
    });
  }

  createBootcampState() {
    this.submitted = true;
    this.submitButton = true;

    if (this.validationControl("create")) {

      this.bootcampStateService.createBootcampState(this.bootcampStateCreateRequest).subscribe(response => {
        this.hideDialog();

        this.bootcampState = {
          id: response.id,
          name: response.name,
          createdDate: response.createdDate
        };

        this.bootcampStates.items.push(this.bootcampState);
        this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Etkinlik durumu oluşturuldu.', life: 4000 });

      }, error => {
        this.submitted = false;
        this.submitButton = false;
        console.log("- Bir hata meydana geldi.: ", error)
        this.messageService.add({ severity: 'error', summary: 'Hata', detail: 'Bir hata meydana geldi.', life: 4000 });
      }).add(() => {
        this.bootcampStates.items = [...this.bootcampStates.items];
        this.bootcampStateCreateRequest = {
          name: ''
        };
        this.bootcampState = {
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

  updateBootcampState() {
    this.submitted = true;
    this.submitButton = true;

    if (this.validationControl("update")) {

      this.bootcampStateService.updateBootcampState(this.bootcampStateUpdateRequest).subscribe(response => {
        this.hideDialog();

        this.bootcampState = {
          id: response.id,
          name: response.name,
          createdDate: this.bootcampState.createdDate
        };

        this.bootcampStates.items[this.findIndexById(this.bootcampState.id)] = this.bootcampState;
        this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Etkinlik durumu güncellendi.', life: 4000 });

      }, error => {
        this.submitted = false;
        this.submitButton = false;
        console.log("- Bir hata meydana geldi.: ", error)
        this.messageService.add({ severity: 'error', summary: 'Hata', detail: 'Bir hata meydana geldi.', life: 4000 });
      }).add(() => {
        this.bootcampStates.items = [...this.bootcampStates.items];
        this.bootcampStateUpdateRequest = {
          id: '',
          name: ''
        };
        this.bootcampState = {
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
    for (let i = 0; i < this.bootcampStates.items.length; i++) {
      if (this.bootcampStates.items[i].id === id) {
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

  validationControl(requestName: string): boolean {
    switch (requestName) {
      case "create":
        if (
          !this.bootcampStateCreateRequest.name?.trim()
        ) {
          return false;
        }
        return true;
      case "update":
        if (
          !this.bootcampStateUpdateRequest.id?.trim() ||
          !this.bootcampStateUpdateRequest.name?.trim()
        ) {
          return false;
        }
        return true;
      default:
        return false;
    }
  }

}