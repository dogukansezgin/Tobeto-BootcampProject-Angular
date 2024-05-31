import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ApplicationService } from '../../../services/concretes/application.service';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ApplicationStateService } from '../../../services/concretes/application-state.service';
import { ListItemsDto } from '../../../../core/models/pagination/list-items-dto';
import { TokenService } from '../../../services/concretes/token.service';
import { ApplicationGetListByInstructorByStateResponse } from '../../../models/responses/applications/application-get-list-by-instructor-by-state-response';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { ApplicationUpdateRequest } from '../../../models/requests/applications/application-update-request';
import { ApplicationGetListByInstructorResponse } from '../../../models/responses/applications/application-get-list-by-instructor-response';
import { ApplicationUpdateRangeRequest } from '../../../models/requests/applications/application-update-range-request';
import { ApplicationStateGetByNameResponse } from '../../../models/responses/application-states/application-state-get-by-name-response';

@Component({
  selector: 'app-instructor-applications',
  standalone: true,
  imports: [TooltipModule, CommonModule, FormsModule, ToastModule, ToolbarModule, ButtonModule, TableModule, TagModule, InputTextModule, ConfirmDialogModule, RippleModule],
  providers: [ApplicationService, MessageService, ConfirmationService],
  templateUrl: './instructor-applications.component.html',
  styleUrl: './instructor-applications.component.scss'
})
export class InstructorApplicationsComponent implements OnInit {
  // This component lists applications related to the logged-in instructor.

  applicationsToReview: ListItemsDto<ApplicationGetListByInstructorByStateResponse> = {
    index: 0,
    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: []
  };

  applicationsReviewed: ListItemsDto<ApplicationGetListByInstructorResponse> = {
    index: 0,
    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: []
  };

  applicationToReview!: ApplicationGetListByInstructorByStateResponse;
  applicationReviewed!: ApplicationGetListByInstructorResponse;

  applicationUpdateRequest: ApplicationUpdateRequest = {
    id: '',
    applicantId: '',
    bootcampId: '',
    applicationStateId: ''
  };

  applicationUpdateRangeRequest: ApplicationUpdateRangeRequest = {
    applications: []
  };

  selectedApplicationsToReview!: ApplicationGetListByInstructorByStateResponse[] | null;
  selectedApplicationsReviewed!: ApplicationGetListByInstructorResponse[] | null;

  //
  acceptApplicationState!: ApplicationStateGetByNameResponse;
  rejectApplicationState!: ApplicationStateGetByNameResponse;

  //
  submitted: boolean = false;

  filterValues: string[] = ['', ''];

  readonly PAGE_SIZE = 30;

  constructor(
    private applicationService: ApplicationService,
    private applicationStateService: ApplicationStateService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.applicationService.getListByInstructorByState({ pageIndex: 0, pageSize: this.PAGE_SIZE }, this.tokenService.getCurrentUserId()).subscribe(response => {
      this.applicationsToReview = response;
      console.log(this.applicationsToReview)
    });

    this.applicationService.getListByInstructor({ pageIndex: 0, pageSize: this.PAGE_SIZE }, this.tokenService.getCurrentUserId()).subscribe(response => {
      this.applicationsReviewed = response;
      console.log(this.applicationsReviewed)
    });

    this.applicationStateService.getByName("Onaylandı").subscribe(response => {
      this.acceptApplicationState = response
      console.log(this.acceptApplicationState)
    });

    this.applicationStateService.getByName("Red Edildi").subscribe(response => {
      this.rejectApplicationState = response
      console.log(this.rejectApplicationState)
    });

  }

  rejectSelectedApplications() {
    this.confirmationService.confirm({
      message: 'Seçilen başvuru kayıtlarını reddetmek istediğine emin misin?',
      header: 'Başvuru Talebi Toplu Red',
      rejectLabel: 'İptal',
      acceptLabel: 'Reddet',
      defaultFocus: 'reject',
      acceptButtonStyleClass: "delete-accept",
      rejectButtonStyleClass: "delete-reject",
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (this.selectedApplicationsToReview) {
          this.applicationUpdateRangeRequest = {
            applications: []
          }

          this.selectedApplicationsToReview.forEach(b => {
            if (b.id) {
              this.applicationUpdateRequest = {
                id: b.id,
                applicantId: b.applicantId,
                bootcampId: b.bootcampId,
                applicationStateId: this.rejectApplicationState.id
              }

              this.applicationUpdateRangeRequest.applications.push(this.applicationUpdateRequest);
            }
          });

          this.applicationService.updateRangeApplication(this.applicationUpdateRangeRequest).subscribe(response => {
            this.selectedApplicationsToReview?.forEach(b => {
              this.applicationReviewed = {
                id: b.id,

                applicantId: b.applicantId,
                applicantUserName: b.applicantUserName,
                applicantEmail: b.applicantEmail,

                bootcampId: b.bootcampId,
                bootcampName: b.bootcampName,
                bootcampInstructorId: b.bootcampInstructorId,
                bootcampInstructorUserName: b.bootcampInstructorUserName,

                applicationStateId: this.rejectApplicationState.id,
                applicationStateName: this.rejectApplicationState.name,

                createdDate: b.createdDate,
              };

              this.applicationsReviewed.items.push(this.applicationReviewed);
            });

            this.applicationsToReview.items = this.applicationsToReview.items.filter((val) => !this.selectedApplicationsToReview?.includes(val));
            this.messageService.add({ severity: 'warn', summary: 'Başarılı', detail: 'Seçili başvuru kayıtları geri yüklendi.', life: 4000 });

          }, error => {
            this.messageService.add({ severity: 'error', summary: 'Hata', detail: 'Bir hata meydana geldi.', life: 4000 });
          }).add(() => {
            this.selectedApplicationsToReview = [];
            this.applicationReviewed = {
              id: '',

              applicantId: '',
              applicantUserName: '',
              applicantEmail: '',

              bootcampId: '',
              bootcampName: '',
              bootcampInstructorId: '',
              bootcampInstructorUserName: '',

              applicationStateId: '',
              applicationStateName: '',

              createdDate: new Date("0001-01-01T01:00:00")
            };
            this.applicationUpdateRequest = {
              id: '',
              applicantId: '',
              applicationStateId: '',
              bootcampId: ''
            };

          });
        }
      }
    });
  }

  acceptSelectedApplications() {
    this.confirmationService.confirm({
      message: 'Seçilen başvuru taleplerini onaylamak istediğine emin misin?',
      header: 'Başvuru Talebi Toplu Onay',
      rejectLabel: 'İptal',
      acceptLabel: 'Onayla',
      defaultFocus: 'reject',
      acceptButtonStyleClass: "restore-accept",
      rejectButtonStyleClass: "restore-reject",
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (this.selectedApplicationsToReview) {
          this.applicationUpdateRangeRequest = {
            applications: []
          }

          this.selectedApplicationsToReview.forEach(b => {
            if (b.id) {
              this.applicationUpdateRequest = {
                id: b.id,
                applicantId: b.applicantId,
                bootcampId: b.bootcampId,
                applicationStateId: this.acceptApplicationState.id
              }

              this.applicationUpdateRangeRequest.applications.push(this.applicationUpdateRequest);
            }
          });

          this.applicationService.updateRangeApplication(this.applicationUpdateRangeRequest).subscribe(response => {
            this.selectedApplicationsToReview?.forEach(b => {
              this.applicationReviewed = {
                id: b.id,

                applicantId: b.applicantId,
                applicantUserName: b.applicantUserName,
                applicantEmail: b.applicantEmail,

                bootcampId: b.bootcampId,
                bootcampName: b.bootcampName,
                bootcampInstructorId: b.bootcampInstructorId,
                bootcampInstructorUserName: b.bootcampInstructorUserName,

                applicationStateId: this.acceptApplicationState.id,
                applicationStateName: this.acceptApplicationState.name,

                createdDate: b.createdDate,
              };
              this.applicationsReviewed.items.push(this.applicationReviewed);
            });

            this.applicationsToReview.items = this.applicationsToReview.items.filter((val) => !this.selectedApplicationsToReview?.includes(val));
            this.messageService.add({ severity: 'warn', summary: 'Başarılı', detail: 'Seçili başvuru kayıtları geri yüklendi.', life: 4000 });

          }, error => {
            this.messageService.add({ severity: 'error', summary: 'Hata', detail: 'Bir hata meydana geldi.', life: 4000 });
          }).add(() => {
            this.selectedApplicationsToReview = [];
            this.applicationReviewed = {
              id: '',

              applicantId: '',
              applicantUserName: '',
              applicantEmail: '',

              bootcampId: '',
              bootcampName: '',
              bootcampInstructorId: '',
              bootcampInstructorUserName: '',

              applicationStateId: '',
              applicationStateName: '',

              createdDate: new Date("0001-01-01T01:00:00")
            };
            this.applicationUpdateRequest = {
              id: '',
              applicantId: '',
              applicationStateId: '',
              bootcampId: ''
            };

          });
        }
      }
    });
  }

  rejectApplication(application: ApplicationGetListByInstructorByStateResponse) {
    this.confirmationService.confirm({
      message: 'Seçilen başvuruyu reddetmek istediğine emin misin?',
      header: 'Başvuru Talebi Red',
      rejectLabel: 'İptal',
      acceptLabel: 'Reddet',
      defaultFocus: 'reject',
      acceptButtonStyleClass: "delete-accept",
      rejectButtonStyleClass: "delete-reject",
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.applicationUpdateRequest = {
          id: application.id,
          applicantId: application.applicantId,
          bootcampId: application.bootcampId,
          applicationStateId: this.rejectApplicationState.id,
        };

        if (this.validationControl("update")) {
          this.applicationService.updateApplication(this.applicationUpdateRequest).subscribe(response => {

            this.applicationReviewed = {
              id: application.id,

              applicantId: application.applicantId,
              applicantUserName: application.applicantUserName,
              applicantEmail: application.applicantEmail,

              bootcampId: application.bootcampId,
              bootcampName: application.bootcampName,
              bootcampInstructorId: application.bootcampInstructorId,
              bootcampInstructorUserName: application.bootcampInstructorUserName,

              applicationStateId: this.rejectApplicationState.id,
              applicationStateName: this.rejectApplicationState.name,

              createdDate: application.createdDate,
            };

            this.applicationsToReview.items = this.applicationsToReview.items.filter((val) => val.id !== application.id);
            this.applicationsReviewed.items.push(this.applicationReviewed);
            this.messageService.add({ severity: 'warn', summary: 'Başarılı', detail: 'Seçili başvuru kayıtları geri yüklendi.', life: 4000 });

          }, error => {
            this.messageService.add({ severity: 'error', summary: 'Hata', detail: 'Bir hata meydana geldi.', life: 4000 });
          }).add(() => {
            this.applicationReviewed = {
              id: '',

              applicantId: '',
              applicantUserName: '',
              applicantEmail: '',

              bootcampId: '',
              bootcampName: '',
              bootcampInstructorId: '',
              bootcampInstructorUserName: '',

              applicationStateId: '',
              applicationStateName: '',

              createdDate: new Date("0001-01-01T01:00:00")
            };
            this.applicationUpdateRequest = {
              id: '',
              applicantId: '',
              applicationStateId: '',
              bootcampId: ''
            }

          });
        }
      }
    });
  }

  acceptApplication(application: ApplicationGetListByInstructorByStateResponse) {
    this.confirmationService.confirm({
      message: 'Seçilen başvuruyu onaylamak istediğine emin misin?',
      header: 'Başvuru Talebi Onay',
      rejectLabel: 'İptal',
      acceptLabel: 'Onayla',
      defaultFocus: 'reject',
      acceptButtonStyleClass: "restore-accept",
      rejectButtonStyleClass: "restore-reject",
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.applicationUpdateRequest = {
          id: application.id,
          applicantId: application.applicantId,
          bootcampId: application.bootcampId,
          applicationStateId: this.acceptApplicationState.id,
        };

        if (this.validationControl("update")) {
          this.applicationService.updateApplication(this.applicationUpdateRequest).subscribe(response => {

            this.applicationReviewed = {
              id: application.id,

              applicantId: application.applicantId,
              applicantUserName: application.applicantUserName,
              applicantEmail: application.applicantEmail,

              bootcampId: application.bootcampId,
              bootcampName: application.bootcampName,
              bootcampInstructorId: application.bootcampInstructorId,
              bootcampInstructorUserName: application.bootcampInstructorUserName,

              applicationStateId: this.acceptApplicationState.id,
              applicationStateName: this.acceptApplicationState.name,

              createdDate: application.createdDate,
            };

            this.applicationsToReview.items = this.applicationsToReview.items.filter((val) => val.id !== application.id);
            this.applicationsReviewed.items.push(this.applicationReviewed);
            this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Bir başvuru onaylandı.', life: 4000 });

          }, error => {
            this.messageService.add({ severity: 'error', summary: 'Hata', detail: 'Bir hata meydana geldi.', life: 4000 });
          }).add(() => {
            this.applicationReviewed = {
              id: '',

              applicantId: '',
              applicantUserName: '',
              applicantEmail: '',

              bootcampId: '',
              bootcampName: '',
              bootcampInstructorId: '',
              bootcampInstructorUserName: '',

              applicationStateId: '',
              applicationStateName: '',

              createdDate: new Date("0001-01-01T01:00:00")
            };
            this.applicationUpdateRequest = {
              id: '',
              applicantId: '',
              applicationStateId: '',
              bootcampId: ''
            }

          });
        }
      }
    });
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
