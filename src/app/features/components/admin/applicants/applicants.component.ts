import { Component, OnInit } from '@angular/core';
import { ApplicantService } from '../../../services/concretes/applicant.service';
import { ListItemsDto } from '../../../../core/models/pagination/list-items-dto';
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
import { ApplicantCreateRequest } from '../../../models/requests/applicants/applicant-create-request';
import { ApplicantDeleteRangeRequest } from '../../../models/requests/applicants/applicant-delete-range-request';
import { ApplicantDeleteRequest } from '../../../models/requests/applicants/applicant-delete-request';
import { ApplicantRestoreRangeRequest } from '../../../models/requests/applicants/applicant-restore-range-request';
import { ApplicantRestoreRequest } from '../../../models/requests/applicants/applicant-restore-request';
import { ApplicantUpdateRequest } from '../../../models/requests/applicants/applicant-update-request';
import { CalendarModule } from 'primeng/calendar';
import { ApplicantGetListDeletedResponse } from '../../../models/responses/applicant/applicant-get-list-deleted-response';
import { ApplicantGetListResponse } from '../../../models/responses/applicant/applicant-get-list-response';

@Component({
  selector: 'app-applicants',
  standalone: true,
  imports: [TableModule, DialogModule, RippleModule, ButtonModule, ToastModule, ToolbarModule, ConfirmDialogModule, InputTextModule, InputTextareaModule, CommonModule, FileUploadModule, DropdownModule, TagModule, RadioButtonModule, RatingModule, InputTextModule, FormsModule, InputNumberModule, CalendarModule],
  providers: [ApplicantService, MessageService, ConfirmationService],
  templateUrl: './applicants.component.html',
  styleUrl: './applicants.component.scss'
})
export class ApplicantsComponent implements OnInit {
  applicantCreateDialog: boolean = false;
  applicantUpdateDialog: boolean = false;

  //
  applicants: ListItemsDto<ApplicantGetListResponse> = {
    index: 0,
    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: []
  };

  deletedApplicants: ListItemsDto<ApplicantGetListDeletedResponse> = {
    index: 0,
    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: []
  };

  applicant!: ApplicantGetListResponse;
  deletedApplicant!: ApplicantGetListDeletedResponse;

  applicantCreateRequest: ApplicantCreateRequest = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    dateOfBirth: new Date("0001-01-01T01:00:00"),
    nationalIdentity: '',
    about: '',
  };

  applicantUpdateRequest: ApplicantUpdateRequest = {
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    dateOfBirth: new Date("0001-01-01T01:00:00"),
    nationalIdentity: '',
    about: '',
  };

  applicantDeleteRequest: ApplicantDeleteRequest = {
    id: '',
    isPermament: false
  };

  applicantDeleteRangeRequest: ApplicantDeleteRangeRequest = {
    ids: [],
    isPermament: false
  };

  applicantRestoreRequest: ApplicantRestoreRequest = {
    id: ''
  };

  applicantRestoreRangeRequest: ApplicantRestoreRangeRequest = {
    ids: []
  };

  selectedApplicants!: ApplicantGetListResponse[] | null;
  selectedDeletedApplicants!: ApplicantGetListDeletedResponse[] | null;

  //
  submitted: boolean = false;
  submitButton: boolean = false;

  filterValues: string[] = ['', '']

  readonly PAGE_SIZE = 30;

  maxDate!: Date;
  minDate!: Date;

  constructor(
    private applicantService: ApplicantService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.applicantService.getApplicantsList({ pageIndex: 0, pageSize: this.PAGE_SIZE }).subscribe(response => {
      this.applicants = response;
      console.log(this.applicants)
    });

    this.applicantService.getApplicantsListDeleted({ pageIndex: 0, pageSize: this.PAGE_SIZE }).subscribe(response => {
      this.deletedApplicants = response;
      console.log(this.deletedApplicants)
    });

    this.maxDate = new Date();
    this.minDate = new Date(this.maxDate.getFullYear() - 100, this.maxDate.getMonth(), this.maxDate.getDate());

  }

  openNew() {

    this.applicantCreateRequest = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      dateOfBirth: new Date(this.maxDate.getFullYear() - 30, this.maxDate.getMonth(), this.maxDate.getDate()),
      nationalIdentity: '',
      about: '',
    };

    this.applicantCreateDialog = true;
    this.submitted = false;
  }

  openEdit(applicant: ApplicantGetListResponse) {
    this.applicant = { ...applicant };

    this.applicantUpdateRequest = {
      id: this.applicant.id,
      email: this.applicant.email,
      firstName: this.applicant.firstName,
      lastName: this.applicant.lastName
    };

    if(applicant.nationalIdentity) {
      if (applicant.dateOfBirth != null) {
        this.applicantUpdateRequest.nationalIdentity = applicant.nationalIdentity;
      }
    }
    if (applicant.dateOfBirth) {
      if (new Date(applicant.dateOfBirth).getFullYear() != 1 && applicant.dateOfBirth != null) {
        this.applicantUpdateRequest.dateOfBirth = new Date(applicant.dateOfBirth);
      }
    }
    if (applicant.about) {
      if (applicant.about != null) {
        this.applicantUpdateRequest.about = applicant.about;
      }
    }

    this.applicantUpdateDialog = true;
    this.submitted = false;
  }

  hideDialog() {
    this.applicantCreateDialog = false;
    this.applicantUpdateDialog = false;
    this.submitted = false;
    this.submitButton = false;
  }

  deleteSelectedApplicants(isPermament: boolean) {
    this.confirmationService.confirm({
      message: 'Seçilen öğrenciyi silmek istediğine emin misin?',
      header: 'Toplu Sil',
      rejectLabel: 'İptal',
      acceptLabel: 'Sil',
      defaultFocus: 'reject',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log(this.selectedApplicants)

        if (this.selectedApplicants || this.selectedDeletedApplicants) {
          this.applicantDeleteRangeRequest = {
            ids: [],
            isPermament: isPermament
          };

          if (isPermament) {
            if (this.selectedDeletedApplicants) {
              this.selectedDeletedApplicants.forEach(i => {
                if (i.id) {
                  this.applicantDeleteRangeRequest.ids.push(i.id);
                }
              });
            }
          }
          else {
            if (this.selectedApplicants) {
              this.selectedApplicants.forEach(i => {
                if (i.id) {
                  this.applicantDeleteRangeRequest.ids.push(i.id);
                }
              });
            }
          }


          this.applicantService.deleteRangeApplicant(this.applicantDeleteRangeRequest).subscribe(response => {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Applicants Deleted', life: 3000 });

            if (!isPermament) {
              this.selectedApplicants?.forEach(i => {
                this.deletedApplicant = {
                  id: i.id,
                  email: i.email,
                  userName: i.userName,
                  firstName: i.firstName,
                  lastName: i.lastName,
                  dateOfBirth: i.dateOfBirth,
                  nationalIdentity: i.nationalIdentity,
                  about: i.about,

                  createdDate: i.createdDate,
                  deletedDate: response.deletedDate,
                };
                this.deletedApplicants.items.push(this.deletedApplicant);
              });

              this.applicants.items = this.applicants.items.filter((val) => !this.selectedApplicants?.includes(val));
            }
            else {
              this.deletedApplicants.items = this.deletedApplicants.items.filter((val) => !this.selectedDeletedApplicants?.includes(val));
            }


          }).add(() => {
            this.selectedApplicants = [];
            this.selectedDeletedApplicants = [];
            this.deletedApplicant = {
              id: '',
              email: '',
              userName: '',
              firstName: '',
              lastName: '',
              dateOfBirth: new Date("0001-01-01T01:00:00"),
              nationalIdentity: '',
              about: '',

              createdDate: new Date("0001-01-01T01:00:00"),
              deletedDate: new Date("0001-01-01T01:00:00")
            };
            this.applicantDeleteRangeRequest = {
              ids: [],
              isPermament: false
            }
          });
        }
      }
    });
  }

  restoreSelectedApplicants() {
    this.confirmationService.confirm({
      message: 'Seçilen silinmiş öğrencileri kurtarmak istediğine emin misin?',
      header: 'Toplu Kurtar',
      rejectLabel: 'İptal',
      acceptLabel: 'Kurtar',
      defaultFocus: 'reject',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        if (this.selectedDeletedApplicants) {
          this.applicantRestoreRangeRequest = {
            ids: []
          }

          this.selectedDeletedApplicants.forEach(i => {
            if (i.id) {
              this.applicantRestoreRangeRequest.ids.push(i.id);
            }
          });

          this.applicantService.restoreRangeApplicant(this.applicantRestoreRangeRequest).subscribe(response => {
            this.selectedDeletedApplicants?.forEach(i => {
              this.applicant = {
                id: i.id,
                email: i.email,
                userName: i.userName,
                firstName: i.firstName,
                lastName: i.lastName,
                dateOfBirth: i.dateOfBirth,
                nationalIdentity: i.nationalIdentity,
                about: i.about,

                createdDate: i.createdDate,
              };
              this.applicants.items.push(this.applicant);

            });

            this.deletedApplicants.items = this.deletedApplicants.items.filter((val) => !this.selectedDeletedApplicants?.includes(val));
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Applicants Restored', life: 3000 });

          }).add(() => {
            this.selectedApplicants = [];
            this.selectedDeletedApplicants = [];
            this.applicant = {
              id: '',
              email: '',
              userName: '',
              firstName: '',
              lastName: '',
              dateOfBirth: new Date("0001-01-01T01:00:00"),
              nationalIdentity: '',
              about: '',

              createdDate: new Date("0001-01-01T01:00:00")
            };
            this.applicantRestoreRangeRequest = {
              ids: []
            }
          });
        }
      }
    });
  }

  deleteApplicant(applicant: ApplicantGetListResponse, isPermament: boolean) {
    console.log(applicant)
    this.confirmationService.confirm({
      message: '"' + applicant.userName + '" Adlı öğrenciyi silmek istediğine emin misin?',
      header: 'Sil',
      rejectLabel: 'İptal',
      acceptLabel: 'Sil',
      defaultFocus: 'reject',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.applicantDeleteRequest = {
          id: applicant.id,
          isPermament: isPermament
        }

        this.applicantService.deleteApplicant(this.applicantDeleteRequest).subscribe(response => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Applicant Deleted', life: 3000 });

          if (!this.applicantDeleteRequest.isPermament) {
            this.deletedApplicant = {
              id: response.id,
              email: applicant.email,
              userName: applicant.userName,
              firstName: applicant.firstName,
              lastName: applicant.lastName,
              dateOfBirth: applicant.dateOfBirth,
              nationalIdentity: applicant.nationalIdentity,
              about: applicant.about,

              createdDate: applicant.createdDate,
              deletedDate: response.deletedDate,
            };

            this.applicants.items = this.applicants.items.filter((val) => val.id !== applicant.id);
            this.deletedApplicants.items.push(this.deletedApplicant);

          }
          else {
            this.deletedApplicants.items = this.deletedApplicants.items.filter((val) => val.id !== applicant.id);
          }

        }).add(() => {
          this.deletedApplicant = {
            id: '',
            email: '',
            userName: '',
            firstName: '',
            lastName: '',
            dateOfBirth: new Date("0001-01-01T01:00:00"),
            nationalIdentity: '',
            about: '',

            createdDate: new Date("0001-01-01T01:00:00"),
            deletedDate: new Date("0001-01-01T01:00:00")
          };
          this.applicantDeleteRequest = {
            id: '',
            isPermament: false
          }

        });
      }
    });
  }

  restoreApplicant(applicant: ApplicantGetListDeletedResponse) {
    console.log(applicant)
    this.confirmationService.confirm({
      message: '"' + applicant.userName + '" Adlı silinen öğrenciyi kurtarmak istediğine emin misin?',
      header: 'Kurtar',
      rejectLabel: 'İptal',
      acceptLabel: 'Kurtar',
      defaultFocus: 'reject',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.applicantRestoreRequest = {
          id: applicant.id
        }

        this.applicantService.restoreApplicant(this.applicantRestoreRequest).subscribe(response => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Applicant Restored', life: 3000 });

          this.applicant = {
            id: response.id,
            email: applicant.email,
            userName: response.userName,
            firstName: applicant.firstName,
            lastName: applicant.lastName,
            dateOfBirth: applicant.dateOfBirth,
            nationalIdentity: applicant.nationalIdentity,
            about: applicant.about,

            createdDate: applicant.createdDate
          };

          this.deletedApplicants.items = this.deletedApplicants.items.filter((val) => val.id !== applicant.id);
          this.applicants.items.push(this.applicant);

        }).add(() => {
          this.applicant = {
            id: '',
            email: '',
            userName: '',
            firstName: '',
            lastName: '',
            dateOfBirth: new Date("0001-01-01T01:00:00"),
            nationalIdentity: '',
            about: '',

            createdDate: new Date("0001-01-01T01:00:00")
          };
          this.applicantRestoreRequest = {
            id: ''
          };
        });
      }
    });
  }

  createApplicant() {
    console.log(this.applicantCreateRequest)
    this.submitted = true;
    this.submitButton = true;

    if (this.validationControl("create")) {

      this.applicantService.createApplicant(this.applicantCreateRequest).subscribe(response => {
        this.hideDialog();

        this.applicant = {
          id: response.id,
          email: response.email,
          userName: response.userName,
          firstName: response.firstName,
          lastName: response.lastName,
          dateOfBirth: response.dateOfBirth,
          nationalIdentity: response.nationalIdentity,
          about: response.about,

          createdDate: response.createdDate,
        };

        this.applicants.items.push(this.applicant);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Applicant Created', life: 3000 });

      }, error => {
        this.submitButton = false;
        console.log("bir hata oluştu.")
      }).add(() => {
        this.applicants.items = [...this.applicants.items];
        this.applicantCreateDialog = false;
        this.applicantCreateRequest = {
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          dateOfBirth: new Date("0001-01-01T01:00:00"),
          nationalIdentity: '',
          about: '',
        };
        this.applicant = {
          id: '',
          email: '',
          userName: '',
          firstName: '',
          lastName: '',
          dateOfBirth: new Date("0001-01-01T01:00:00"),
          nationalIdentity: '',
          about: '',

          createdDate: new Date("0001-01-01T01:00:00"),
        };

      });
    }
    else {
      this.submitButton = false;
    }
  }

  updateApplicant() {
    this.submitted = true;
    this.submitButton = true;

    if (this.validationControl("update")) {

      this.applicantService.updateApplicant(this.applicantUpdateRequest).subscribe(response => {
        this.hideDialog();

        this.applicant = {
          id: response.id,
          email: response.email,
          userName: response.userName,
          firstName: response.firstName,
          lastName: response.lastName,
          dateOfBirth: response.dateOfBirth,
          nationalIdentity: response.nationalIdentity,
          about: response.about,

          createdDate: this.applicant.createdDate,
        };

        this.applicants.items[this.findIndexById(this.applicant.id)] = this.applicant;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Applicant Updated', life: 3000 });
      }, error => {
        this.submitButton = false;
        console.log("bir hata oluştu.")
      }).add(() => {
        this.applicants.items = [...this.applicants.items];
        this.applicantUpdateDialog = false;
        this.applicantUpdateRequest = {
          id: '',
          email: '',
          firstName: '',
          lastName: '',
          dateOfBirth: new Date("0001-01-01T01:00:00"),
          nationalIdentity: undefined,
          about: undefined,
        };
        this.applicant = {
          id: '',
          email: '',
          userName: '',
          firstName: '',
          lastName: '',
          dateOfBirth: new Date("0001-01-01T01:00:00"),
          nationalIdentity: '',
          about: '',

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
    for (let i = 0; i < this.applicants.items.length; i++) {
      if (this.applicants.items[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  // getSeverity(status: string) {
  //   switch (status) {
  //     case 'ACTIVE':
  //       return 'success';
  //     case 'INACTIVE':
  //       return 'warning';
  //     case 'CANCELLED':
  //       return 'danger';
  //     default:
  //       return '';
  //   }
  // }

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
          !this.applicantCreateRequest.firstName?.trim() ||
          !this.applicantCreateRequest.lastName?.trim() ||
          !this.beValidEmail(this.applicantCreateRequest.email) ||
          !this.strongPassword(this.applicantCreateRequest.password)
        ) {
          if (this.applicantCreateRequest.nationalIdentity) {
            if (!(this.applicantCreateRequest.nationalIdentity.length == 0 || this.applicantCreateRequest.nationalIdentity.length == 11)) {
              return false;
            }
            else {
              return true;
            }
          }
          return false;
        }
        return true;
      case "update":
        if (
          !this.applicantUpdateRequest.id?.trim() ||
          !this.applicantUpdateRequest.firstName?.trim() ||
          !this.applicantUpdateRequest.lastName?.trim() ||
          !this.beValidEmail(this.applicantUpdateRequest.email)
        ) {
          if (this.applicantUpdateRequest.nationalIdentity) {
            if (!(this.applicantUpdateRequest.nationalIdentity.length == 0 || this.applicantUpdateRequest.nationalIdentity.length == 11)) {
              return false;
            }
            else {
              return true;
            }
          }
          return false;
        }
        return true;
      default:
        return false;
    }
  }

  strongPassword(value: string): boolean {
    const strongPasswordRegex: RegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    return strongPasswordRegex.test(value); // Asdasd12!
  }
  beValidEmail(email: string): boolean {
    const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      return false;
    }

    if ((email.match(/@/g) || []).length !== 1) {
      return false;
    }

    const validDomains: string[] = ["gmail.com", "hotmail.com"];
    const emailDomain: string = email.split('@').pop() || '';

    return validDomains.includes(emailDomain);
  }
  
}
