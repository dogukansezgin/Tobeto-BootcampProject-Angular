import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { GetListResponse } from '../../../models/responses/applications/get-list-response';
import { GetListApplicationListItemDto } from '../../../models/responses/applications/get-list-application-list-item-dto';
import { ApplicationService } from '../../../services/concretes/application.service';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { UpdateApplicationRequest } from '../../../models/requests/applications/update-application-request';
import { DeleteApplicationsRequest } from '../../../models/requests/applications/delete-applicantions-request';
import { ApplicationStateService } from '../../../services/concretes/application-state.service';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [ToastModule, ToolbarModule, ButtonModule, TableModule, TagModule, InputTextModule, ConfirmDialogModule, RippleModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.scss'
})
export class ApplicationsComponent implements OnInit {

  applicationDialog: boolean = false;

  applications: GetListResponse<GetListApplicationListItemDto> = {
    index: 0,
    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: []
  };

  application!: GetListApplicationListItemDto;
  applicationRequest!: UpdateApplicationRequest;

  // selectedAcceptApplications!: GetListApplicationListItemDto[] | null;
  // selectedRejectApplications!: GetListApplicationListItemDto[] | null;
  selectedApplications !: GetListApplicationListItemDto[] | null;

  selectedAppCount: number | undefined = 0;

  deleteApplicationsRequest: DeleteApplicationsRequest = {
    ids: []
  }

  applicationStateIdValue!: string;

  submitted: boolean = false;

  filterValue: string = '';

  readonly PAGE_SIZE = 30;

  constructor(private applicationStateService: ApplicationStateService, private applicationService: ApplicationService, private messageService: MessageService, private confirmationService: ConfirmationService) { }
  ngOnInit(): void {
    this.applicationService.getList({ pageIndex: 0, pageSize: this.PAGE_SIZE }).subscribe(response => {
      this.applications = response;
    })
  }
  rejectSelectedApplications() {
    this.confirmationService.confirm({
      message: 'Seçilen başvuruları reddetmek istediğine emin misin?',
      header: 'Red Edilme',
      rejectLabel: 'Hayır',
      acceptLabel: 'Evet',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log('Seçilen başvuruların sayısı : ' + this.selectedApplications?.length);
        if (this.selectedApplications) {
          this.selectedApplications.forEach(a => {
            this.deleteApplicationsRequest.ids.push(a.id);
          });
          if (this.deleteApplicationsRequest.ids) {
            this.applicationService.deleteSelectedApplications(this.deleteApplicationsRequest).subscribe(response => {
              this.applications.items = this.applications.items.filter((val) => !this.selectedApplications?.includes(val));
              this.selectedAppCount = this.selectedApplications?.length;
              this.selectedApplications = null;
              this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: this.selectedAppCount + ' Başvuru Reddedildi', life: 3000 });
            })
          }
        }
      }
    })
  }
  acceptSelectedApplications() {
    this.confirmationService.confirm({

    })
  }
  filterTable(event: Event, dt: any): void {
    if (event.target instanceof HTMLInputElement) {
      this.filterValue = event.target.value;
      dt.filterGlobal(this.filterValue, 'contains');
    }
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
    return "info";
  }
  rejectApplication(application: GetListApplicationListItemDto) {
    this.confirmationService.confirm({
      message: 'Başvuruyu reddetmek istediğinine emin misin?',
      header: 'Onay',
      rejectLabel: 'Hayır',
      acceptLabel: 'Evet',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.applicationService.deleteApplication(application.id).subscribe(response => {
          this.applications.items = this.applications.items.filter((val) => val.id !== application.id);
          this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Başvuru Silindi', life: 3000 });
        })
      }
    });
  }
  acceptApplication(application: GetListApplicationListItemDto) {
    this.confirmationService.confirm({
      message: 'Başvuruyu onaylamak istediğine emin misin?',
      header: 'Onay',
      rejectLabel: 'Hayır',
      acceptLabel: 'Evet',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.applicationStateService.getByName('Onay').subscribe(response => {
          const obj = {
            id: application.id,
            applicantId: application.applicantId,
            bootcampId: application.bootcampId,
            applicationStateId: response.id
          };          
          this.applicationService.updateApplication(obj).subscribe(response => {
            console.log(response);
            this.applications.items = this.applications.items.filter((val) => val.id !== application.id);
            this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Başvuru Onaylandı', life: 3000 });
          }, error => {
            console.log(error);
          })
        })
      }
    })
  }

}
