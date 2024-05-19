
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
import { CommonModule } from '@angular/common';
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


@Component({
  selector: 'app-bootcamps',
  standalone: true,
  imports: [TableModule, DialogModule, RippleModule, ButtonModule, ToastModule, ToolbarModule, ConfirmDialogModule, InputTextModule, InputTextareaModule, CommonModule, FileUploadModule, DropdownModule, TagModule, RadioButtonModule, RatingModule, InputTextModule, FormsModule, InputNumberModule],
  providers: [BootcampService, MessageService, ConfirmationService],
  templateUrl: './bootcamps.component.html',
  styleUrl: './bootcamps.component.scss'
})
export class BootcampsComponent implements OnInit {
  bootcampDialog: boolean = false;

  bootcamps: BootcampListItemDto<GetBootcampResponse> = {
    index: 0,
    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: []
  };;

  bootcamp!: GetBootcampResponse;

  selectedBootcamp!: GetBootcampResponse[] | null;

  submitted: boolean = false;

  filterValue: string = '';

  readonly PAGE_SIZE = 30;

  constructor(
    private bootcampService: BootcampService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    // private formatService: FormatService
  ) { }

  ngOnInit() {
    this.bootcampService.getList({ pageIndex: 0, pageSize: this.PAGE_SIZE }).subscribe(response => {
      this.bootcamps = response;
    })

  }

  openNew() {
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
    this.submitted = false;
    this.bootcampDialog = true;
  }

  deleteSelectedProducts() {
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

  editProduct(bootcamp: GetBootcampResponse) {
    this.bootcamp = { ...bootcamp };
    this.bootcampDialog = true;
  }

  deleteProduct(bootcamp: GetBootcampResponse) {
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
    this.bootcampDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    if (this.bootcamp.name?.trim()) {
      if (this.bootcamp.id) {
        this.bootcamps.items[this.findIndexById(this.bootcamp.id)] = this.bootcamp;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Bootcamp Updated', life: 3000 });
      } else {
        this.bootcamp.id = this.createId();
        // this.bootcamp.image = 'product-placeholder.svg';
        this.bootcamps.items.push(this.bootcamp);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Bootcamp Created', life: 3000 });
      }

      this.bootcamps.items = [...this.bootcamps.items];
      this.bootcampDialog = false;
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
      case 'INSTOCK':
        return 'success';
      case 'İSTANBUL':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
    }
    return "asd";
  }

  filterTable(event: Event, dt: any): void {
    if (event.target instanceof HTMLInputElement) {
      this.filterValue = event.target.value;
      dt.filterGlobal(this.filterValue, 'contains');
    }
  }

  navigateToBootcampDetailPage(bootcamp: GetBootcampResponse) {
    // const formattedName = this.formatService.formatBootcampDetailRoute(bootcamp.name);
    // this.router.navigate(['/bootcamp', formattedName]);

  }
}