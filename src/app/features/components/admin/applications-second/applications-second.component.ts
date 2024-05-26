
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
import { ApplicationGetListResponse } from '../../../models/responses/applications/application-get-list-response';
import { ApplicationService } from '../../../services/concretes/application.service';
import { FormatService } from '../../../services/concretes/format.service';
import { ApplicationStateService } from '../../../services/concretes/application-state.service';
import { ApplicationStateGetListResponse } from '../../../models/responses/application-states/application-state-get-list-response';
import { ApplicationCreateRequest } from '../../../models/requests/applications/application-create-request';
import { CalendarModule } from 'primeng/calendar';
import { InstructorService } from '../../../services/concretes/instructor.service';
import { InstructorGetBasicInfoResponse } from '../../../models/responses/instructors/instructor-get-basic-info-response';
import { ApplicationUpdateRequest } from '../../../models/requests/applications/application-update-request';
import { ApplicationDeleteRequest } from '../../../models/requests/applications/application-delete-request';
import { ListItemsDto } from '../../../../core/models/pagination/list-items-dto';
import { ApplicationGetListDeletedResponse } from '../../../models/responses/applications/application-get-list-deleted-response';
import { ApplicationRestoreRequest } from '../../../models/requests/applications/application-restore-request';
import { ApplicationDeleteRangeRequest } from '../../../models/requests/applications/application-delete-range-request';
import { ApplicationRestoreRangeRequest } from '../../../models/requests/applications/application-restore-range-request';
import { ApplicantService } from '../../../services/concretes/applicant.service';
import { BootcampService } from '../../../services/concretes/bootcamp.service';
import { ApplicantGetBasicInfoResponse } from '../../../models/responses/applicant/applicant-get-basic-info-response';
import { BootcampGetBasicInfoResponse } from '../../../models/responses/bootcamps/bootcamp-get-basic-info-response';


@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [TableModule, DialogModule, RippleModule, ButtonModule, ToastModule, ToolbarModule, ConfirmDialogModule, InputTextModule, InputTextareaModule, CommonModule, FileUploadModule, DropdownModule, TagModule, RadioButtonModule, RatingModule, InputTextModule, FormsModule, InputNumberModule, CalendarModule],
  providers: [ApplicationService, MessageService, ConfirmationService],
  templateUrl: './applications-second.component.html',
  styleUrl: './applications-second.component.scss'
})
export class ApplicationsSecondComponent implements OnInit {
  applicationCreateDialog: boolean = false;
  applicationUpdateDialog: boolean = false;

  //
  applications: ListItemsDto<ApplicationGetListResponse> = {
    index: 0,
    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: []
  };

  deletedApplications: ListItemsDto<ApplicationGetListDeletedResponse> = {
    index: 0,
    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: []
  };

  application!: ApplicationGetListResponse;
  deletedApplication!: ApplicationGetListDeletedResponse;

  applicationCreateRequest: ApplicationCreateRequest = {
    applicantId: '',
    bootcampId: '',
    applicationStateId: ''
  };

  applicationUpdateRequest: ApplicationUpdateRequest = {
    id: '',
    applicantId: '',
    bootcampId: '',
    applicationStateId: ''
  };

  applicationDeleteRequest: ApplicationDeleteRequest = {
    id: '',
    isPermament: false
  };

  applicationDeleteRangeRequest: ApplicationDeleteRangeRequest = {
    ids: [],
    isPermament: false
  };

  applicationRestoreRequest: ApplicationRestoreRequest = {
    id: ''
  };

  applicationRestoreRangeRequest: ApplicationRestoreRangeRequest = {
    ids: []
  };

  selectedApplications!: ApplicationGetListResponse[] | null;
  selectedDeletedApplications!: ApplicationGetListDeletedResponse[] | null;

  //
  applicationStates!: ApplicationStateGetListResponse[];

  selectedApplicationState: ApplicationStateGetListResponse = {
    id: '',
    name: '',
    createdDate: new Date("0001-01-01T01:00:00")
  };

  //
  applicants!: ApplicantGetBasicInfoResponse[];

  selectedApplicant: ApplicantGetBasicInfoResponse = {
    id: '',
    userName: '',
    email: ''
  };

  //
  bootcamps!: BootcampGetBasicInfoResponse[];

  selectedBootcamp: BootcampGetBasicInfoResponse = {
    id: '',
    name: ''
  };

  //
  submitted: boolean = false;
  submitButton: boolean = false;

  filterValues: string[] = ['', ''];

  readonly PAGE_SIZE = 30;

  constructor(
    private applicationService: ApplicationService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private formatService: FormatService,
    private applicationStateService: ApplicationStateService,
    private applicantService: ApplicantService,
    private bootcampService: BootcampService
  ) { }

  ngOnInit() {
    this.applicationService.getList({ pageIndex: 0, pageSize: this.PAGE_SIZE }).subscribe(response => {
      this.applications = response;
      console.log(this.applications)
    });

    this.applicationService.getListDeleted({ pageIndex: 0, pageSize: this.PAGE_SIZE }).subscribe(response => {
      this.deletedApplications = response;
      console.log(this.deletedApplications)
    });

    this.applicationStateService.getList({ pageIndex: 0, pageSize: 99 }).subscribe(response => {
      this.applicationStates = response.items;
      console.log(this.applicationStates)
    });

    this.applicantService.getApplicantsBasicInfoList({ pageIndex: 0, pageSize: 9999 }).subscribe(response => {
      this.applicants = response.items;
      console.log(this.applicants)
    });

    this.bootcampService.getBootcampsBasicInfoList({ pageIndex: 0, pageSize: 9999 }).subscribe(response => {
      this.bootcamps = response.items;
      console.log(this.bootcamps)
    });

  }

  openNew() {

    this.applicationCreateRequest = {
      applicantId: '',
      bootcampId: '',
      applicationStateId: ''
    };
    this.selectedApplicationState = {
      id: '',
      name: '',
      createdDate: new Date("0001-01-01T01:00:00")
    };
    this.selectedApplicant = {
      id: '',
      userName: '',
      email: ''
    };
    this.selectedBootcamp = {
      id: '',
      name: ''
    };

    this.applicationCreateDialog = true;
    this.submitted = false;
  }

  openEdit(application: ApplicationGetListResponse) {
    console.log(application)

    this.application = { ...application };

    this.applicationUpdateRequest = {
      id: this.application.id,
      bootcampId: this.application.bootcampId,
      applicantId: this.application.applicantId,
      applicationStateId: this.application.applicationStateId
    };
    this.selectedApplicationState = {
      id: this.application.applicationStateId,
      name: this.application.applicationStateName,
      createdDate: new Date("0001-01-01T01:00:00")
    };
    this.selectedApplicant = {
      id: this.application.applicantId,
      userName: this.application.applicantUserName,
      email: this.application.applicantEmail
    };
    this.selectedBootcamp = {
      id: this.application.bootcampId,
      name: this.application.bootcampName
    };

    this.applicationUpdateDialog = true;
    this.submitted = false;
  }

  hideDialog() {
    this.applicationCreateDialog = false;
    this.applicationUpdateDialog = false;
    this.submitted = false;
    this.submitButton = false;
  }

  deleteSelectedApplications(isPermament: boolean) {
    this.confirmationService.confirm({
      message: 'Seçilen kursları silmek istediğine emin misin?',
      header: 'Toplu Sil',
      rejectLabel: 'İptal',
      acceptLabel: 'Sil',
      defaultFocus: 'reject',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log(this.selectedApplications)

        if (this.selectedApplications || this.selectedDeletedApplications) {
          this.applicationDeleteRangeRequest = {
            ids: [],
            isPermament: isPermament
          };

          if (isPermament) {
            if (this.selectedDeletedApplications) {
              this.selectedDeletedApplications.forEach(b => {
                if (b.id) {
                  this.applicationDeleteRangeRequest.ids.push(b.id);
                }
              });
            }
          }
          else {
            if (this.selectedApplications) {
              this.selectedApplications.forEach(b => {
                if (b.id) {
                  this.applicationDeleteRangeRequest.ids.push(b.id);
                }
              });
            }
          }


          this.applicationService.deleteRangeApplication(this.applicationDeleteRangeRequest).subscribe(response => {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Applications Deleted', life: 3000 });

            if (!isPermament) {
              this.selectedApplications?.forEach(b => {
                this.deletedApplication = {
                  id: b.id,

                  applicantId: b.applicantId,
                  applicantUserName: b.applicantUserName,
                  applicantEmail: b.applicantEmail,
              
                  bootcampId: b.bootcampId,
                  bootcampName: b.bootcampName,

                  applicationStateId: b.applicationStateId,
                  applicationStateName: b.applicationStateName,

                  createdDate: b.createdDate,
                  deletedDate: response.deletedDate,
                };
                this.deletedApplications.items.push(this.deletedApplication);
              });

              this.applications.items = this.applications.items.filter((val) => !this.selectedApplications?.includes(val));
            }
            else {
              this.deletedApplications.items = this.deletedApplications.items.filter((val) => !this.selectedDeletedApplications?.includes(val));
            }


          }).add(() => {
            this.selectedApplications = [];
            this.selectedDeletedApplications = [];
            this.deletedApplication = {
              id: '',

              applicantId: '',
              applicantUserName: '',
              applicantEmail: '',
          
              bootcampId: '',
              bootcampName: '',

              applicationStateId: '',
              applicationStateName: '',

              createdDate: new Date("0001-01-01T01:00:00"),
              deletedDate: new Date("0001-01-01T01:00:00")
            };
            this.applicationDeleteRangeRequest = {
              ids: [],
              isPermament: false
            }
          });
        }
      }
    });
  }

  restoreSelectedApplications() {
    this.confirmationService.confirm({
      message: 'Seçilen silinmiş kursları kurtarmak istediğine emin misin?',
      header: 'Toplu Kurtar',
      rejectLabel: 'İptal',
      acceptLabel: 'Kurtar',
      defaultFocus: 'reject',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        if (this.selectedDeletedApplications) {
          this.applicationRestoreRangeRequest = {
            ids: []
          }

          this.selectedDeletedApplications.forEach(b => {
            if (b.id) {
              this.applicationRestoreRangeRequest.ids.push(b.id);
            }
          });

          this.applicationService.restoreRangeApplication(this.applicationRestoreRangeRequest).subscribe(response => {
            this.selectedDeletedApplications?.forEach(b => {
              this.application = {
                id: b.id,

                applicantId: b.applicantId,
                applicantUserName: b.applicantUserName,
                applicantEmail: b.applicantEmail,
            
                bootcampId: b.bootcampId,
                bootcampName: b.bootcampName,

                applicationStateId: b.applicationStateId,
                applicationStateName: b.applicationStateName,

                createdDate: b.createdDate,
              };
              this.applications.items.push(this.application);

            });

            this.deletedApplications.items = this.deletedApplications.items.filter((val) => !this.selectedDeletedApplications?.includes(val));
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Applications Restored', life: 3000 });

          }).add(() => {
            this.selectedApplications = [];
            this.selectedDeletedApplications = [];
            this.application = {
              id: '',

              applicantId: '',
              applicantUserName: '',
              applicantEmail: '',
          
              bootcampId: '',
              bootcampName: '',

              applicationStateId: '',
              applicationStateName: '',

              createdDate: new Date("0001-01-01T01:00:00")
            };
            this.applicationRestoreRangeRequest = {
              ids: []
            }
          });
        }
      }
    });
  }

  deleteApplication(application: ApplicationGetListResponse, isPermament: boolean) {
    console.log(application)
    this.confirmationService.confirm({
      message: 'Adlı kursu silmek istediğine emin misin?',
      header: 'Sil',
      rejectLabel: 'İptal',
      acceptLabel: 'Sil',
      defaultFocus: 'reject',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.applicationDeleteRequest = {
          id: application.id,
          isPermament: isPermament
        }

        this.applicationService.deleteApplication(this.applicationDeleteRequest).subscribe(response => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Application Deleted', life: 3000 });

          if (!this.applicationDeleteRequest.isPermament) {
            this.deletedApplication = {
              id: response.id,

              applicantId: application.applicantId,
              applicantUserName: application.applicantUserName,
              applicantEmail: application.applicantEmail,
          
              bootcampId: application.bootcampId,
              bootcampName: application.bootcampName,

              applicationStateId: application.applicationStateId,
              applicationStateName: application.applicationStateName,

              createdDate: application.createdDate,
              deletedDate: response.deletedDate,
            };

            this.applications.items = this.applications.items.filter((val) => val.id !== application.id);
            this.deletedApplications.items.push(this.deletedApplication);

          }
          else {
            this.deletedApplications.items = this.deletedApplications.items.filter((val) => val.id !== application.id);
          }

        }).add(() => {
          this.deletedApplication = {
            id: '',

            applicantId: '',
            applicantUserName: '',
            applicantEmail: '',
        
            bootcampId: '',
            bootcampName: '',

            applicationStateId: '',
            applicationStateName: '',

            createdDate: new Date("0001-01-01T01:00:00"),
            deletedDate: new Date("0001-01-01T01:00:00")
          };
          this.applicationDeleteRequest = {
            id: '',
            isPermament: false
          }

        });
      }
    });
  }

  restoreApplication(application: ApplicationGetListDeletedResponse) {
    console.log(application)
    this.confirmationService.confirm({
      message: 'Adlı silinen kursu kurtarmak istediğine emin misin?',
      header: 'Kurtar',
      rejectLabel: 'İptal',
      acceptLabel: 'Kurtar',
      defaultFocus: 'reject',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.applicationRestoreRequest = {
          id: application.id
        }

        this.applicationService.restoreApplication(this.applicationRestoreRequest).subscribe(response => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Application Restored', life: 3000 });

          this.application = {
            id: response.id,

            applicantId: application.applicantId,
            applicantUserName: application.applicantUserName,
            applicantEmail: application.applicantEmail,
        
            bootcampId: application.bootcampId,
            bootcampName: application.bootcampName,

            applicationStateId: application.applicationStateId,
            applicationStateName: application.applicationStateName,

            createdDate: application.createdDate
          };

          this.deletedApplications.items = this.deletedApplications.items.filter((val) => val.id !== application.id);
          this.applications.items.push(this.application);

        }).add(() => {
          this.application = {
            id: '',

            applicantId: '',
            applicantUserName: '',
            applicantEmail: '',
        
            bootcampId: '',
            bootcampName: '',

            applicationStateId: '',
            applicationStateName: '',

            createdDate: new Date("0001-01-01T01:00:00")
          };
          this.applicationRestoreRequest = {
            id: ''
          };
        });
      }
    });
  }

  createApplication() {
    this.submitted = true;
    this.submitButton = true;
    
    if (!this.selectedApplicant.id || !this.selectedApplicationState.id || !this.selectedBootcamp.id) {
      this.submitButton = false;
      return
    }

    this.applicationCreateRequest.applicantId = this.selectedApplicant.id;
    this.applicationCreateRequest.applicationStateId = this.selectedApplicationState.id;
    this.applicationCreateRequest.bootcampId = this.selectedBootcamp.id;

    if (this.validationControl("create")) {

      this.applicationService.createApplication(this.applicationCreateRequest).subscribe(response => {
        this.hideDialog();

        this.application = {
          id: response.id,

          applicantId: this.selectedApplicant.id,
          applicantUserName: this.selectedApplicant.userName,
          applicantEmail: this.selectedApplicant.email,
      
          bootcampId: this.selectedBootcamp.id,
          bootcampName: this.selectedBootcamp.name,

          applicationStateId: this.selectedApplicationState.id,
          applicationStateName: this.selectedApplicationState.name,

          createdDate: response.createdDate,
        };

        this.applications.items.push(this.application);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Application Created', life: 3000 });

      }, error => {
        this.submitButton = false;
        console.log("bir hata oluştu.")
      }).add(() => {
        this.applications.items = [...this.applications.items];
        this.applicationCreateDialog = false;
        this.applicationCreateRequest = {
          applicantId: '',
          bootcampId: '',
          applicationStateId: ''
        };
        this.application = {
          id: '',

          applicantId: '',
          applicantUserName: '',
          applicantEmail: '',
      
          bootcampId: '',
          bootcampName: '',

          applicationStateId: '',
          applicationStateName: '',

          createdDate: new Date("0001-01-01T01:00:00"),
        };
        this.selectedApplicationState = {
          id: '',
          name: '',
          createdDate: new Date("0001-01-01T01:00:00")
        };
        this.selectedApplicant = {
          id: '',
          userName: '',
          email: ''
        };
        this.selectedBootcamp = {
          id: '',
          name: ''
        };

      });
    }
    else {
      this.submitButton = false;
    }
  }

  updateApplication() {
    this.submitted = true;
    this.submitButton = true;

    if (!this.selectedApplicant.id || !this.selectedApplicationState.id || !this.selectedBootcamp.id) {
      this.submitButton = false;
      return
    }

    this.applicationUpdateRequest.applicantId = this.selectedApplicant.id;
    this.applicationUpdateRequest.applicationStateId = this.selectedApplicationState.id;
    this.applicationUpdateRequest.bootcampId = this.selectedBootcamp.id;

    if (this.validationControl("update")) {

      this.applicationService.updateApplication(this.applicationUpdateRequest).subscribe(response => {
        this.hideDialog();

        this.application = {
          id: response.id,

          applicantId: this.selectedApplicant.id,
          applicantUserName: this.selectedApplicant.userName,
          applicantEmail: this.selectedApplicant.email,
      
          bootcampId: this.selectedBootcamp.id,
          bootcampName: this.selectedBootcamp.name,

          applicationStateId: this.selectedApplicationState.id,
          applicationStateName: this.selectedApplicationState.name,

          createdDate: this.application.createdDate,
        };

        this.applications.items[this.findIndexById(this.application.id)] = this.application;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Application Updated', life: 3000 });
      }, error => {
        this.submitButton = false;
        console.log("bir hata oluştu.")
      }).add(() => {
        this.applications.items = [...this.applications.items];
        this.applicationUpdateDialog = false;
        this.applicationUpdateRequest = {
          id: '',
          applicantId: '',
          bootcampId: '',
          applicationStateId: ''
        };
        this.application = {
          id: '',

          applicantId: '',
          applicantUserName: '',
          applicantEmail: '',
      
          bootcampId: '',
          bootcampName: '',

          applicationStateId: '',
          applicationStateName: '',

          createdDate: new Date("0001-01-01T01:00:00")
        };
        this.selectedApplicationState = {
          id: '',
          name: '',
          createdDate: new Date("0001-01-01T01:00:00")
        };
        this.selectedApplicant = {
          id: '',
          userName: '',
          email: ''
        };
        this.selectedBootcamp = {
          id: '',
          name: ''
        };

      });
    }
    else {
      this.submitButton = false;
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.applications.items.length; i++) {
      if (this.applications.items[i].id === id) {
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
          !this.applicationCreateRequest.applicantId?.trim() ||
          !this.applicationCreateRequest.applicationStateId?.trim() ||
          !this.applicationCreateRequest.bootcampId?.trim()
        ) {
          return false;
        }
        return true;
      case "update":
        if (
          !this.applicationUpdateRequest.id?.trim() ||
          !this.applicationUpdateRequest.applicantId?.trim() ||
          !this.applicationUpdateRequest.applicationStateId?.trim() ||
          !this.applicationUpdateRequest.bootcampId?.trim()
        ) {
          return false;
        }
        return true;
      default:
        return false;
    }
  }

}