import { Component, OnInit } from '@angular/core';
import { InstructorService } from '../../../services/concretes/instructor.service';
import { ListItemsDto } from '../../../../core/models/pagination/list-items-dto';
import { InstructorGetListResponse } from '../../../models/responses/instructors/instructor-get-list-response';
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
import { InstructorCreateRequest } from '../../../models/requests/instructors/instructor-create-request';
import { InstructorDeleteRangeRequest } from '../../../models/requests/instructors/instructor-delete-range-request';
import { InstructorDeleteRequest } from '../../../models/requests/instructors/instructor-delete-request';
import { InstructorRestoreRangeRequest } from '../../../models/requests/instructors/instructor-restore-range-request';
import { InstructorRestoreRequest } from '../../../models/requests/instructors/instructor-restore-request';
import { InstructorUpdateRequest } from '../../../models/requests/instructors/instructor-update-request';
import { InstructorGetListDeletedResponse } from '../../../models/responses/instructors/instructor-get-list-deleted-response';
import { CalendarModule } from 'primeng/calendar';
import { KeyFilterModule } from 'primeng/keyfilter';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-instructors',
  standalone: true,
  imports: [TooltipModule, KeyFilterModule, TableModule, DialogModule, RippleModule, ButtonModule, ToastModule, ToolbarModule, ConfirmDialogModule, InputTextModule, InputTextareaModule, CommonModule, FileUploadModule, DropdownModule, TagModule, RadioButtonModule, RatingModule, InputTextModule, FormsModule, InputNumberModule, CalendarModule],
  providers: [InstructorService, MessageService, ConfirmationService],
  templateUrl: './instructors.component.html',
  styleUrl: './instructors.component.scss'
})
export class InstructorsComponent implements OnInit {
  instructorCreateDialog: boolean = false;
  instructorUpdateDialog: boolean = false;

  //
  instructors: ListItemsDto<InstructorGetListResponse> = {
    index: 0,
    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: []
  };

  deletedInstructors: ListItemsDto<InstructorGetListDeletedResponse> = {
    index: 0,
    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: []
  };

  instructor!: InstructorGetListResponse;
  deletedInstructor!: InstructorGetListDeletedResponse;

  instructorCreateRequest: InstructorCreateRequest = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    dateOfBirth: undefined,
    nationalIdentity: '',
    companyName: '',
  };

  instructorUpdateRequest: InstructorUpdateRequest = {
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    dateOfBirth: undefined,
    nationalIdentity: '',
    companyName: '',
  };

  instructorDeleteRequest: InstructorDeleteRequest = {
    id: '',
    isPermament: false
  };

  instructorDeleteRangeRequest: InstructorDeleteRangeRequest = {
    ids: [],
    isPermament: false
  };

  instructorRestoreRequest: InstructorRestoreRequest = {
    id: ''
  };

  instructorRestoreRangeRequest: InstructorRestoreRangeRequest = {
    ids: []
  };

  selectedInstructors!: InstructorGetListResponse[] | null;
  selectedDeletedInstructors!: InstructorGetListDeletedResponse[] | null;

  //
  submitted: boolean = false;
  submitButton: boolean = false;

  filterValues: string[] = ['', '']

  readonly PAGE_SIZE = 30;

  maxDate!: Date;
  minDate!: Date;

  constructor(
    private instructorService: InstructorService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.instructorService.getInstructorsList({ pageIndex: 0, pageSize: this.PAGE_SIZE }).subscribe(response => {
      this.instructors = response;
      console.log(this.instructors)
    });

    this.instructorService.getInstructorsListDeleted({ pageIndex: 0, pageSize: this.PAGE_SIZE }).subscribe(response => {
      this.deletedInstructors = response;
      console.log(this.deletedInstructors)
    });

    this.maxDate = new Date();
    this.minDate = new Date(this.maxDate.getFullYear() - 100, this.maxDate.getMonth(), this.maxDate.getDate());

  }

  openNew() {
    this.instructorCreateRequest = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      dateOfBirth: undefined,
      nationalIdentity: '',
      companyName: '',
    };

    this.instructorCreateDialog = true;
    this.submitted = false;
  }

  openEdit(instructor: InstructorGetListResponse) {
    this.instructor = { ...instructor };

    this.instructorUpdateRequest = {
      id: this.instructor.id,
      email: this.instructor.email,
      firstName: this.instructor.firstName,
      lastName: this.instructor.lastName,
      nationalIdentity: '',
      companyName: this.instructor.companyName
    };

    if(instructor.nationalIdentity) {
      if (instructor.nationalIdentity != null) {
        this.instructorUpdateRequest.nationalIdentity = instructor.nationalIdentity;
      }
    }
    if (instructor.dateOfBirth) {
      if (new Date(instructor.dateOfBirth).getFullYear() != 1 && instructor.dateOfBirth != null) {
        this.instructorUpdateRequest.dateOfBirth = new Date(instructor.dateOfBirth);
      }
    }

    this.instructorUpdateDialog = true;
    this.submitted = false;
  }

  hideDialog() {
    this.instructorCreateDialog = false;
    this.instructorUpdateDialog = false;
    this.submitted = false;
    this.submitButton = false;
  }

  deleteSelectedInstructors(isPermament: boolean) {
    this.confirmationService.confirm({
      message: 'Seçilen eğitmenleri silmek istediğine emin misin?',
      header: 'Toplu Sil',
      rejectLabel: 'İptal',
      acceptLabel: 'Sil',
      defaultFocus: 'reject',
      acceptButtonStyleClass: "delete-accept",
      rejectButtonStyleClass: "delete-reject",
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        if (this.selectedInstructors || this.selectedDeletedInstructors) {
          this.instructorDeleteRangeRequest = {
            ids: [],
            isPermament: isPermament
          };

          if (isPermament) {
            if (this.selectedDeletedInstructors) {
              this.selectedDeletedInstructors.forEach(i => {
                if (i.id) {
                  this.instructorDeleteRangeRequest.ids.push(i.id);
                }
              });
            }
          }
          else {
            if (this.selectedInstructors) {
              this.selectedInstructors.forEach(i => {
                if (i.id) {
                  this.instructorDeleteRangeRequest.ids.push(i.id);
                }
              });
            }
          }

          this.instructorService.deleteRangeInstructor(this.instructorDeleteRangeRequest).subscribe(response => {
            
            if (!isPermament) {
              this.selectedInstructors?.forEach(i => {
                this.deletedInstructor = {
                  id: i.id,
                  email: i.email,
                  userName: i.userName,
                  firstName: i.firstName,
                  lastName: i.lastName,
                  dateOfBirth: i.dateOfBirth,
                  nationalIdentity: i.nationalIdentity,
                  companyName: i.companyName,

                  createdDate: i.createdDate,
                  deletedDate: response.deletedDate,
                };
                this.deletedInstructors.items.push(this.deletedInstructor);
              });

              this.instructors.items = this.instructors.items.filter((val) => !this.selectedInstructors?.includes(val));
              this.messageService.add({ severity: 'warn', summary: 'Uyarı', detail: 'Seçili eğitmenler silindi.', life: 4000 });
            }
            else {
              this.deletedInstructors.items = this.deletedInstructors.items.filter((val) => !this.selectedDeletedInstructors?.includes(val));
              this.messageService.add({ severity: 'error', summary: 'Uyarı', detail: 'Seçili eğitmenler kalıcı olarak silindi.', life: 5000 });
            }

          }, error => {
            this.messageService.add({ severity: 'error', summary: 'Hata', detail: 'Bir hata meydana geldi.', life: 4000 });
          }).add(() => {
            this.selectedInstructors = [];
            this.selectedDeletedInstructors = [];
            this.deletedInstructor = {
              id: '',
              email: '',
              userName: '',
              firstName: '',
              lastName: '',
              dateOfBirth: new Date("0001-01-01T01:00:00"),
              nationalIdentity: '',
              companyName: '',

              createdDate: new Date("0001-01-01T01:00:00"),
              deletedDate: new Date("0001-01-01T01:00:00")
            };
            this.instructorDeleteRangeRequest = {
              ids: [],
              isPermament: false
            }
          });
        }
      }
    });
  }

  restoreSelectedInstructors() {
    this.confirmationService.confirm({
      message: 'Seçilen silinmiş eğitmenleri geri yüklemek istediğine emin misin?',
      header: 'Toplu Geri Yükle',
      rejectLabel: 'İptal',
      acceptLabel: 'Geri Yükle',
      defaultFocus: 'reject',
      acceptButtonStyleClass: "restore-accept",
      rejectButtonStyleClass: "restore-reject",
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        if (this.selectedDeletedInstructors) {
          this.instructorRestoreRangeRequest = {
            ids: []
          }

          this.selectedDeletedInstructors.forEach(i => {
            if (i.id) {
              this.instructorRestoreRangeRequest.ids.push(i.id);
            }
          });

          this.instructorService.restoreRangeInstructor(this.instructorRestoreRangeRequest).subscribe(response => {
            this.selectedDeletedInstructors?.forEach(i => {
              this.instructor = {
                id: i.id,
                email: i.email,
                userName: i.userName,
                firstName: i.firstName,
                lastName: i.lastName,
                dateOfBirth: i.dateOfBirth,
                nationalIdentity: i.nationalIdentity,
                companyName: i.companyName,

                createdDate: i.createdDate,
              };
              this.instructors.items.push(this.instructor);

            });

            this.deletedInstructors.items = this.deletedInstructors.items.filter((val) => !this.selectedDeletedInstructors?.includes(val));
            this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Seçili eğitmenler geri yüklendi.', life: 4000 });

          }, error => {
            this.messageService.add({ severity: 'error', summary: 'Hata', detail: 'Bir hata meydana geldi.', life: 4000 });
          }).add(() => {
            this.selectedInstructors = [];
            this.selectedDeletedInstructors = [];
            this.instructor = {
              id: '',
              email: '',
              userName: '',
              firstName: '',
              lastName: '',
              dateOfBirth: new Date("0001-01-01T01:00:00"),
              nationalIdentity: '',
              companyName: '',

              createdDate: new Date("0001-01-01T01:00:00")
            };
            this.instructorRestoreRangeRequest = {
              ids: []
            }
          });
        }
      }
    });
  }

  deleteInstructor(instructor: InstructorGetListResponse, isPermament: boolean) {
    this.confirmationService.confirm({
      message: '"' + instructor.userName + '" Adlı eğitmeni silmek istediğine emin misin?',
      header: 'Sil',
      rejectLabel: 'İptal',
      acceptLabel: 'Sil',
      defaultFocus: 'reject',
      acceptButtonStyleClass: "delete-accept",
      rejectButtonStyleClass: "delete-reject",
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.instructorDeleteRequest = {
          id: instructor.id,
          isPermament: isPermament
        }

        this.instructorService.deleteInstructor(this.instructorDeleteRequest).subscribe(response => {

          if (!this.instructorDeleteRequest.isPermament) {
            this.deletedInstructor = {
              id: response.id,
              email: instructor.email,
              userName: instructor.userName,
              firstName: instructor.firstName,
              lastName: instructor.lastName,
              dateOfBirth: instructor.dateOfBirth,
              nationalIdentity: instructor.nationalIdentity,
              companyName: instructor.companyName,

              createdDate: instructor.createdDate,
              deletedDate: response.deletedDate,
            };

            this.instructors.items = this.instructors.items.filter((val) => val.id !== instructor.id);
            this.deletedInstructors.items.push(this.deletedInstructor);
            this.messageService.add({ severity: 'warn', summary: 'Uyarı', detail: 'Bir eğitmen silindi.', life: 4000 });
          }
          else {
            this.deletedInstructors.items = this.deletedInstructors.items.filter((val) => val.id !== instructor.id);
            this.messageService.add({ severity: 'error', summary: 'Uyarı', detail: 'Bir eğitmen kalıcı olarak silindi.', life: 5000 });
          }

        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Hata', detail: 'Bir hata meydana geldi.', life: 4000 });
        }).add(() => {
          this.deletedInstructor = {
            id: '',
            email: '',
            userName: '',
            firstName: '',
            lastName: '',
            dateOfBirth: new Date("0001-01-01T01:00:00"),
            nationalIdentity: '',
            companyName: '',

            createdDate: new Date("0001-01-01T01:00:00"),
            deletedDate: new Date("0001-01-01T01:00:00")
          };
          this.instructorDeleteRequest = {
            id: '',
            isPermament: false
          }

        });
      }
    });
  }

  restoreInstructor(instructor: InstructorGetListDeletedResponse) {
    this.confirmationService.confirm({
      message: '"' + instructor.userName + '" Adlı silinen eğitmeni geri yüklemek istediğine emin misin?',
      header: 'Geri Yükle',
      rejectLabel: 'İptal',
      acceptLabel: 'Geri Yükle',
      defaultFocus: 'reject',
      acceptButtonStyleClass: "restore-accept",
      rejectButtonStyleClass: "restore-reject",
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.instructorRestoreRequest = {
          id: instructor.id
        }

        this.instructorService.restoreInstructor(this.instructorRestoreRequest).subscribe(response => {

          this.instructor = {
            id: response.id,
            email: instructor.email,
            userName: response.userName,
            firstName: instructor.firstName,
            lastName: instructor.lastName,
            dateOfBirth: instructor.dateOfBirth,
            nationalIdentity: instructor.nationalIdentity,
            companyName: instructor.companyName,

            createdDate: instructor.createdDate
          };

          this.deletedInstructors.items = this.deletedInstructors.items.filter((val) => val.id !== instructor.id);
          this.instructors.items.push(this.instructor);
          this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Bir eğitmen geri yüklendi.', life: 4000 });

        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Hata', detail: 'Bir hata meydana geldi.', life: 4000 });
        }).add(() => {
          this.instructor = {
            id: '',
            email: '',
            userName: '',
            firstName: '',
            lastName: '',
            dateOfBirth: new Date("0001-01-01T01:00:00"),
            nationalIdentity: '',
            companyName: '',

            createdDate: new Date("0001-01-01T01:00:00")
          };
          this.instructorRestoreRequest = {
            id: ''
          };
        });
      }
    });
  }

  createInstructor() {
    this.submitted = true;
    this.submitButton = true;

    if (this.validationControl("create")) {

      this.instructorService.createInstructor(this.instructorCreateRequest).subscribe(response => {
        this.hideDialog();

        this.instructor = {
          id: response.id,
          email: response.email,
          userName: response.userName,
          firstName: response.firstName,
          lastName: response.lastName,
          dateOfBirth: response.dateOfBirth,
          nationalIdentity: response.nationalIdentity,
          companyName: response.companyName,

          createdDate: response.createdDate,
        };

        this.instructors.items.push(this.instructor);
        this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Eğitmen oluşturuldu.', life: 4000 });

      }, error => {
        this.submitted = false;
        this.submitButton = false;
        console.log("- Bir hata meydana geldi.: ", error)
        this.messageService.add({ severity: 'error', summary: 'Hata', detail: 'Bir hata meydana geldi.', life: 4000 });
      }).add(() => {
        this.instructors.items = [...this.instructors.items];
        this.instructorCreateRequest = {
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          dateOfBirth: undefined,
          nationalIdentity: '',
          companyName: '',
        };
        this.instructor = {
          id: '',
          email: '',
          userName: '',
          firstName: '',
          lastName: '',
          dateOfBirth: new Date("0001-01-01T01:00:00"),
          nationalIdentity: '',
          companyName: '',

          createdDate: new Date("0001-01-01T01:00:00"),
        };

      });
    }
    else {
      this.submitButton = false;
    }
  }

  updateInstructor() {
    this.submitted = true;
    this.submitButton = true;

    if (this.validationControl("update")) {

      this.instructorService.updateInstructor(this.instructorUpdateRequest).subscribe(response => {
        this.hideDialog();

        this.instructor = {
          id: response.id,
          email: response.email,
          userName: response.userName,
          firstName: response.firstName,
          lastName: response.lastName,
          dateOfBirth: response.dateOfBirth,
          nationalIdentity: response.nationalIdentity,
          companyName: response.companyName,

          createdDate: this.instructor.createdDate,
        };

        this.instructors.items[this.findIndexById(this.instructor.id)] = this.instructor;
        this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Eğitmen bilgileri güncellendi.', life: 4000 });

      }, error => {
        this.submitted = false;
        this.submitButton = false;
        console.log("- Bir hata meydana geldi.: ", error)
        this.messageService.add({ severity: 'error', summary: 'Hata', detail: 'Bir hata meydana geldi.', life: 4000 });
      }).add(() => {
        this.instructors.items = [...this.instructors.items];
        this.instructorUpdateRequest = {
          id: '',
          email: '',
          firstName: '',
          lastName: '',
          dateOfBirth: new Date("0001-01-01T01:00:00"),
          nationalIdentity: undefined,
          companyName: '',
        };
        this.instructor = {
          id: '',
          email: '',
          userName: '',
          firstName: '',
          lastName: '',
          dateOfBirth: new Date("0001-01-01T01:00:00"),
          nationalIdentity: '',
          companyName: '',

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
    for (let i = 0; i < this.instructors.items.length; i++) {
      if (this.instructors.items[i].id === id) {
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
          !this.instructorCreateRequest.firstName?.trim() ||
          !this.instructorCreateRequest.lastName?.trim() ||
          !this.beValidEmail(this.instructorCreateRequest.email) ||
          !this.strongPassword(this.instructorCreateRequest.password) ||
          !this.instructorCreateRequest.companyName?.trim()
        ) {
          return false;
        }
        else {
          if (!(this.instructorCreateRequest.nationalIdentity?.length == 0 || this.instructorCreateRequest.nationalIdentity?.length == 11)) {
            return false;
          }
          else {
            this.instructorCreateRequest.nationalIdentity = this.instructorCreateRequest.nationalIdentity.length == 0 ? undefined : this.instructorCreateRequest.nationalIdentity;
            return true;
          }
        }
      case "update":
        if (
          !this.instructorUpdateRequest.id?.trim() ||
          !this.instructorUpdateRequest.firstName?.trim() ||
          !this.instructorUpdateRequest.lastName?.trim() ||
          !this.beValidEmail(this.instructorUpdateRequest.email) ||
          !this.instructorUpdateRequest.companyName?.trim()
        ) {
          return false;
        }
        else {
          if (!(this.instructorUpdateRequest.nationalIdentity?.length == 0 || this.instructorUpdateRequest.nationalIdentity?.length == 11)) {
            return false;
          }
          else {
            this.instructorUpdateRequest.nationalIdentity = this.instructorUpdateRequest.nationalIdentity.length == 0 ? undefined : this.instructorUpdateRequest.nationalIdentity;
            return true;
          }
        }
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
  onInputNationalId(event: Event, requestName: string) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    if (requestName == "create") {
      this.instructorCreateRequest.nationalIdentity = value;
    }
    if (requestName == "update") {
      this.instructorUpdateRequest.nationalIdentity = value;
    }
  }

}
