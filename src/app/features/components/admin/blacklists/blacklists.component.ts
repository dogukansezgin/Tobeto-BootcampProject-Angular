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
import { BlacklistCreateRequest } from "../../../models/requests/blacklists/blacklist-create-request";
import { BlacklistDeleteRangeRequest } from "../../../models/requests/blacklists/blacklist-delete-range-request";
import { BlacklistDeleteRequest } from "../../../models/requests/blacklists/blacklist-delete-request";
import { BlacklistRestoreRangeRequest } from "../../../models/requests/blacklists/blacklist-restore-range-request";
import { BlacklistRestoreRequest } from "../../../models/requests/blacklists/blacklist-restore-request";
import { BlacklistUpdateRequest } from "../../../models/requests/blacklists/blacklist-update-request";
import { BlacklistGetListDeletedResponse } from "../../../models/responses/blacklists/blacklist-get-list-deleted-response";
import { BlacklistGetListResponse } from "../../../models/responses/blacklists/blacklist-get-list-response";
import { BlacklistService } from "../../../services/concretes/blacklist.service";
import { TooltipModule } from 'primeng/tooltip';
import { ApplicantService } from "../../../services/concretes/applicant.service";
import { ApplicantGetBasicInfoResponse } from "../../../models/responses/applicant/applicant-get-basic-info-response";

@Component({
  selector: 'app-blacklists',
  standalone: true,
  imports: [TooltipModule, TableModule, DialogModule, RippleModule, ButtonModule, ToastModule, ToolbarModule, ConfirmDialogModule, InputTextModule, InputTextareaModule, CommonModule, FileUploadModule, DropdownModule, TagModule, RadioButtonModule, RatingModule, InputTextModule, FormsModule, InputNumberModule, CalendarModule],
  providers: [BlacklistService, MessageService, ConfirmationService],
  templateUrl: './blacklists.component.html',
  styleUrl: './blacklists.component.scss'
})
export class BlacklistsComponent implements OnInit {
  blacklistCreateDialog: boolean = false;
  blacklistUpdateDialog: boolean = false;

  //
  blacklists: ListItemsDto<BlacklistGetListResponse> = {
    index: 0,
    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: []
  };

  deletedBlacklists: ListItemsDto<BlacklistGetListDeletedResponse> = {
    index: 0,
    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: []
  };

  blacklist!: BlacklistGetListResponse;
  deletedBlacklist!: BlacklistGetListDeletedResponse;

  blacklistCreateRequest: BlacklistCreateRequest = {
    applicantId: '',
    reason: ''
  };

  blacklistUpdateRequest: BlacklistUpdateRequest = {
    id: '',
    applicantId: '',
    reason: ''
  };

  blacklistDeleteRequest: BlacklistDeleteRequest = {
    id: '',
    isPermament: false
  };

  blacklistDeleteRangeRequest: BlacklistDeleteRangeRequest = {
    ids: [],
    isPermament: false
  };

  blacklistRestoreRequest: BlacklistRestoreRequest = {
    id: ''
  };

  blacklistRestoreRangeRequest: BlacklistRestoreRangeRequest = {
    ids: []
  };

  selectedBlacklists!: BlacklistGetListResponse[] | null;
  selectedDeletedBlacklists!: BlacklistGetListDeletedResponse[] | null;

  //
  applicants!: ApplicantGetBasicInfoResponse[];

  selectedApplicant: ApplicantGetBasicInfoResponse = {
    id: '',
    userName: '',
    email: ''
  };

  //
  submitted: boolean = false;
  submitButton: boolean = false;

  filterValues: string[] = ['', ''];

  readonly PAGE_SIZE = 30;

  constructor(
    private blacklistService: BlacklistService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private applicantService: ApplicantService
  ) { }

  ngOnInit() {
    this.blacklistService.getList({ pageIndex: 0, pageSize: 9999 }).subscribe(response => {
      this.blacklists = response;
      console.log(this.blacklists)
    });

    this.blacklistService.getListDeleted({ pageIndex: 0, pageSize: 9999 }).subscribe(response => {
      this.deletedBlacklists = response;
      console.log(this.deletedBlacklists)
    });

    this.applicantService.getApplicantsBasicInfoList({ pageIndex: 0, pageSize: 9999 }).subscribe(response => {
      this.applicants = response.items;
      console.log(this.applicants)
    });

  }

  openNew() {
    this.blacklistCreateRequest = {
      applicantId: '',
      reason: ''
    };
    this.selectedApplicant = {
      id: '',
      userName: '',
      email: ''
    };

    this.blacklistCreateDialog = true;
    this.submitted = false;
  }

  openEdit(blacklist: BlacklistGetListResponse) {
    this.blacklist = { ...blacklist };

    this.blacklistUpdateRequest = {
      id: this.blacklist.id,
      applicantId: this.blacklist.applicantId,
      reason: this.blacklist.reason
    };
    this.selectedApplicant = {
      id: this.blacklist.applicantId,
      userName: this.blacklist.applicantUserName,
      email: this.blacklist.applicantEmail
    };

    this.blacklistUpdateDialog = true;
    this.submitted = false;
  }

  hideDialog() {
    this.blacklistCreateDialog = false;
    this.blacklistUpdateDialog = false;
    this.submitted = false;
    this.submitButton = false;
  }

  deleteSelectedBlacklists(isPermament: boolean) {
    this.confirmationService.confirm({
      message: 'Seçilen kara liste kayıtlarını silmek istediğine emin misin?',
      header: 'Toplu Sil',
      rejectLabel: 'İptal',
      acceptLabel: 'Sil',
      defaultFocus: 'reject',
      acceptButtonStyleClass: "delete-accept",
      rejectButtonStyleClass: "delete-reject",
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        if (this.selectedBlacklists || this.selectedDeletedBlacklists) {
          this.blacklistDeleteRangeRequest = {
            ids: [],
            isPermament: isPermament
          };

          if (isPermament) {
            if (this.selectedDeletedBlacklists) {
              this.selectedDeletedBlacklists.forEach(b => {
                if (b.id) {
                  this.blacklistDeleteRangeRequest.ids.push(b.id);
                }
              });
            }
          }
          else {
            if (this.selectedBlacklists) {
              this.selectedBlacklists.forEach(b => {
                if (b.id) {
                  this.blacklistDeleteRangeRequest.ids.push(b.id);
                }
              });
            }
          }

          this.blacklistService.deleteRangeBlacklist(this.blacklistDeleteRangeRequest).subscribe(response => {

            if (!isPermament) {
              this.selectedBlacklists?.forEach(b => {
                this.deletedBlacklist = {
                  id: b.id,

                  applicantId: b.applicantId,
                  applicantUserName: b.applicantUserName,
                  applicantEmail: b.applicantEmail,

                  reason: b.reason,
                  date: b.date,
                  createdDate: b.createdDate,
                  deletedDate: response.deletedDate
                };
                this.deletedBlacklists.items.push(this.deletedBlacklist);
              });

              this.blacklists.items = this.blacklists.items.filter((val) => !this.selectedBlacklists?.includes(val));
              this.messageService.add({ severity: 'warn', summary: 'Uyarı', detail: 'Seçili kara liste kayıtları silindi.', life: 4000 });
            }
            else {
              this.deletedBlacklists.items = this.deletedBlacklists.items.filter((val) => !this.selectedDeletedBlacklists?.includes(val));
              this.messageService.add({ severity: 'error', summary: 'Uyarı', detail: 'Seçili kara liste kayıtları kalıcı olarak silindi.', life: 5000 });
            }

          }, error => {
            this.messageService.add({ severity: 'error', summary: 'Hata', detail: 'Bir hata meydana geldi.', life: 4000 });
          }).add(() => {
            this.selectedBlacklists = [];
            this.selectedDeletedBlacklists = [];
            this.deletedBlacklist = {
              id: '',
              applicantId: '',
              applicantUserName: '',
              applicantEmail: '',
              reason: '',
              date: new Date("0001-01-01T01:00:00"),
              createdDate: new Date("0001-01-01T01:00:00"),
              deletedDate: new Date("0001-01-01T01:00:00")
            };
            this.blacklistDeleteRangeRequest = {
              ids: [],
              isPermament: false
            }
          });
        }
      }
    });
  }

  restoreSelectedBlacklists() {
    this.confirmationService.confirm({
      message: 'Seçilen silinmiş kara liste kayıtlarını geri yüklemek istediğine emin misin?',
      header: 'Toplu Geri Yükle',
      rejectLabel: 'İptal',
      acceptLabel: 'Geri Yükle',
      defaultFocus: 'reject',
      acceptButtonStyleClass: "restore-accept",
      rejectButtonStyleClass: "restore-reject",
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        if (this.selectedDeletedBlacklists) {
          this.blacklistRestoreRangeRequest = {
            ids: []
          }

          this.selectedDeletedBlacklists.forEach(b => {
            if (b.id) {
              this.blacklistRestoreRangeRequest.ids.push(b.id);
            }
          });

          this.blacklistService.restoreRangeBlacklist(this.blacklistRestoreRangeRequest).subscribe(response => {
            this.selectedDeletedBlacklists?.forEach(b => {
              this.blacklist = {
                id: b.id,

                applicantId: b.applicantId,
                applicantUserName: b.applicantUserName,
                applicantEmail: b.applicantEmail,

                reason: b.reason,
                date: b.date,
                createdDate: b.createdDate,
              };
              this.blacklists.items.push(this.blacklist);

            });

            this.deletedBlacklists.items = this.deletedBlacklists.items.filter((val) => !this.selectedDeletedBlacklists?.includes(val));
            this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Seçili kara liste kayıtları geri yüklendi.', life: 4000 });

          }, error => {
            this.messageService.add({ severity: 'error', summary: 'Hata', detail: 'Bir hata meydana geldi.', life: 4000 });
          }).add(() => {
            this.selectedBlacklists = [];
            this.selectedDeletedBlacklists = [];
            this.blacklist = {
              id: '',
              applicantId: '',
              applicantUserName: '',
              applicantEmail: '',
              reason: '',
              date: new Date("0001-01-01T01:00:00"),
              createdDate: new Date("0001-01-01T01:00:00")
            };
            this.blacklistRestoreRangeRequest = {
              ids: []
            }
          });
        }
      }
    });
  }

  deleteBlacklist(blacklist: BlacklistGetListResponse, isPermament: boolean) {
    this.confirmationService.confirm({
      message: 'Seçili kaydı silmek istediğine emin misin?',
      header: 'Sil',
      rejectLabel: 'İptal',
      acceptLabel: 'Sil',
      defaultFocus: 'reject',
      acceptButtonStyleClass: "delete-accept",
      rejectButtonStyleClass: "delete-reject",
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.blacklistDeleteRequest = {
          id: blacklist.id,
          isPermament: isPermament
        }

        this.blacklistService.deleteBlacklist(this.blacklistDeleteRequest).subscribe(response => {

          if (!this.blacklistDeleteRequest.isPermament) {
            this.deletedBlacklist = {
              id: response.id,

              applicantId: blacklist.applicantId,
              applicantUserName: blacklist.applicantUserName,
              applicantEmail: blacklist.applicantEmail,

              reason: blacklist.reason,
              date: blacklist.date,
              createdDate: blacklist.createdDate,
              deletedDate: response.deletedDate
            };

            this.blacklists.items = this.blacklists.items.filter((val) => val.id !== blacklist.id);
            this.deletedBlacklists.items.push(this.deletedBlacklist);
            this.messageService.add({ severity: 'warn', summary: 'Uyarı', detail: 'Bir kara liste kaydı silindi.', life: 4000 });
          }
          else {
            this.deletedBlacklists.items = this.deletedBlacklists.items.filter((val) => val.id !== blacklist.id);
            this.messageService.add({ severity: 'error', summary: 'Uyarı', detail: 'Bir kara liste kaydı kalıcı olarak silindi.', life: 5000 });
          }

        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Hata', detail: 'Bir hata meydana geldi.', life: 4000 });
        }).add(() => {
          this.deletedBlacklist = {
            id: '',
            applicantId: '',
            applicantUserName: '',
            applicantEmail: '',
            reason: '',
            date: new Date("0001-01-01T01:00:00"),
            createdDate: new Date("0001-01-01T01:00:00"),
            deletedDate: new Date("0001-01-01T01:00:00")
          };
          this.blacklistDeleteRequest = {
            id: '',
            isPermament: false
          }

        });
      }
    });
  }

  restoreBlacklist(blacklist: BlacklistGetListDeletedResponse) {
    this.confirmationService.confirm({
      message: 'Seçili kaydı geri yüklemek istediğine emin misin?',
      header: 'Geri Yükle',
      rejectLabel: 'İptal',
      acceptLabel: 'Geri Yükle',
      defaultFocus: 'reject',
      acceptButtonStyleClass: "restore-accept",
      rejectButtonStyleClass: "restore-reject",
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.blacklistRestoreRequest = {
          id: blacklist.id
        }

        this.blacklistService.restoreBlacklist(this.blacklistRestoreRequest).subscribe(response => {

          this.blacklist = {
            id: response.id,

            applicantId: blacklist.applicantId,
            applicantUserName: blacklist.applicantUserName,
            applicantEmail: blacklist.applicantEmail,

            reason: blacklist.reason,
            date: new Date(blacklist.date),
            createdDate: blacklist.createdDate
          };

          this.deletedBlacklists.items = this.deletedBlacklists.items.filter((val) => val.id !== blacklist.id);
          this.blacklists.items.push(this.blacklist);
          this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Bir kara liste kaydı geri yüklendi.', life: 4000 });

        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Hata', detail: 'Bir hata meydana geldi.', life: 4000 });
        }).add(() => {
          this.blacklist = {
            id: '',
            applicantId: '',
            applicantUserName: '',
            applicantEmail: '',
            reason: '',
            date: new Date("0001-01-01T01:00:00"),
            createdDate: new Date("0001-01-01T01:00:00")
          };
          this.blacklistRestoreRequest = {
            id: ''
          };
        });
      }
    });
  }

  createBlacklist() {
    this.submitted = true;
    this.submitButton = true;

    if (!this.selectedApplicant.id) {
      this.submitButton = false;
      return
    }

    this.blacklistCreateRequest.applicantId = this.selectedApplicant.id;

    if (this.validationControl("create")) {

      this.blacklistService.createBlacklist(this.blacklistCreateRequest).subscribe(response => {
        this.hideDialog();

        this.blacklist = {
          id: response.id,

          applicantId: this.selectedApplicant.id,
          applicantUserName: this.selectedApplicant.userName,
          applicantEmail: this.selectedApplicant.email,

          reason: response.reason,
          date: response.date,
          createdDate: response.createdDate
        };

        this.blacklists.items.push(this.blacklist);
        this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Bir kara liste kaydı oluşturuldu.', life: 4000 });

      }, error => {
        this.submitted = false;
        this.submitButton = false;
        console.log("- Bir hata meydana geldi.: ", error)
        this.messageService.add({ severity: 'error', summary: 'Hata', detail: 'Bir hata meydana geldi.', life: 4000 });
      }).add(() => {
        this.blacklists.items = [...this.blacklists.items];
        this.blacklistCreateRequest = {
          applicantId: '',
          reason: ''
        };
        this.blacklist = {
          id: '',
          applicantId: '',
          applicantUserName: '',
          applicantEmail: '',
          reason: '',
          date: new Date("0001-01-01T01:00:00"),
          createdDate: new Date("0001-01-01T01:00:00"),
        };
        this.selectedApplicant = {
          id: '',
          userName: '',
          email: ''
        };

      });
    }
    else {
      this.submitButton = false;
    }
  }

  updateBlacklist() {
    this.submitted = true;
    this.submitButton = true;

    if (!this.selectedApplicant.id) {
      this.submitButton = false;
      return
    }

    this.blacklistUpdateRequest.applicantId = this.selectedApplicant.id;

    if (this.validationControl("update")) {

      this.blacklistService.updateBlacklist(this.blacklistUpdateRequest).subscribe(response => {
        this.hideDialog();

        this.blacklist = {
          id: response.id,

          applicantId: this.selectedApplicant.id,
          applicantUserName: this.selectedApplicant.userName,
          applicantEmail: this.selectedApplicant.email,

          reason: response.reason,
          date: response.date,
          createdDate: this.blacklist.createdDate
        };

        this.blacklists.items[this.findIndexById(this.blacklist.id)] = this.blacklist;
        this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Kara liste kaydı güncellendi.', life: 4000 });

      }, error => {
        this.submitted = false;
        this.submitButton = false;
        console.log("- Bir hata meydana geldi.: ", error)
        this.messageService.add({ severity: 'error', summary: 'Hata', detail: 'Bir hata meydana geldi.', life: 4000 });
      }).add(() => {
        this.blacklists.items = [...this.blacklists.items];
        this.blacklistUpdateRequest = {
          id: '',
          applicantId: '',
          reason: ''
        };
        this.blacklist = {
          id: '',
          applicantId: '',
          applicantUserName: '',
          applicantEmail: '',
          reason: '',
          date: new Date("0001-01-01T01:00:00"),
          createdDate: new Date("0001-01-01T01:00:00")
        };
        this.selectedApplicant = {
          id: '',
          userName: '',
          email: ''
        };

      });
    }
    else {
      this.submitButton = false;
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.blacklists.items.length; i++) {
      if (this.blacklists.items[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
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
          !this.blacklistCreateRequest.applicantId?.trim() ||
          !this.blacklistCreateRequest.reason?.trim()
        ) {
          return false;
        }
        return true;
      case "update":
        if (
          !this.blacklistUpdateRequest.id?.trim() ||
          !this.blacklistUpdateRequest.applicantId?.trim() ||
          !this.blacklistUpdateRequest.reason?.trim()
        ) {
          return false;
        }
        return true;
      default:
        return false;
    }
  }

}