import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../services/concretes/employee.service';
import { ListItemsDto } from '../../../../core/models/pagination/list-items-dto';
import { EmployeeGetListResponse } from '../../../models/responses/employees/employee-get-list-response';
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
import { EmployeeCreateRequest } from '../../../models/requests/employees/employee-create-request';
import { EmployeeDeleteRangeRequest } from '../../../models/requests/employees/employee-delete-range-request';
import { EmployeeDeleteRequest } from '../../../models/requests/employees/employee-delete-request';
import { EmployeeRestoreRangeRequest } from '../../../models/requests/employees/employee-restore-range-request';
import { EmployeeRestoreRequest } from '../../../models/requests/employees/employee-restore-request';
import { EmployeeUpdateRequest } from '../../../models/requests/employees/employee-update-request';
import { EmployeeGetListDeletedResponse } from '../../../models/responses/employees/employee-get-list-deleted-response';
import { CalendarModule } from 'primeng/calendar';
import { KeyFilterModule } from 'primeng/keyfilter';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [TooltipModule, KeyFilterModule, TableModule, DialogModule, RippleModule, ButtonModule, ToastModule, ToolbarModule, ConfirmDialogModule, InputTextModule, InputTextareaModule, CommonModule, FileUploadModule, DropdownModule, TagModule, RadioButtonModule, RatingModule, InputTextModule, FormsModule, InputNumberModule, CalendarModule],
  providers: [EmployeeService, MessageService, ConfirmationService],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent implements OnInit {
  employeeCreateDialog: boolean = false;
  employeeUpdateDialog: boolean = false;

  //
  employees: ListItemsDto<EmployeeGetListResponse> = {
    index: 0,
    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: []
  };

  deletedEmployees: ListItemsDto<EmployeeGetListDeletedResponse> = {
    index: 0,
    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: []
  };

  employee!: EmployeeGetListResponse;
  deletedEmployee!: EmployeeGetListDeletedResponse;

  employeeCreateRequest: EmployeeCreateRequest = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    dateOfBirth: undefined,
    nationalIdentity: '',
    position: '',
  };

  employeeUpdateRequest: EmployeeUpdateRequest = {
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    dateOfBirth: undefined,
    nationalIdentity: '',
    position: '',
  };

  employeeDeleteRequest: EmployeeDeleteRequest = {
    id: '',
    isPermament: false
  };

  employeeDeleteRangeRequest: EmployeeDeleteRangeRequest = {
    ids: [],
    isPermament: false
  };

  employeeRestoreRequest: EmployeeRestoreRequest = {
    id: ''
  };

  employeeRestoreRangeRequest: EmployeeRestoreRangeRequest = {
    ids: []
  };

  selectedEmployees!: EmployeeGetListResponse[] | null;
  selectedDeletedEmployees!: EmployeeGetListDeletedResponse[] | null;

  //
  submitted: boolean = false;
  submitButton: boolean = false;


  filterValues: string[] = ['', '']

  readonly PAGE_SIZE = 30;

  maxDate!: Date;
  minDate!: Date;

  constructor(
    private employeeService: EmployeeService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.employeeService.getEmployeesList({ pageIndex: 0, pageSize: this.PAGE_SIZE }).subscribe(response => {
      this.employees = response;
      console.log(this.employees)
    });

    this.employeeService.getEmployeesListDeleted({ pageIndex: 0, pageSize: this.PAGE_SIZE }).subscribe(response => {
      this.deletedEmployees = response;
      console.log(this.deletedEmployees)
    });

    this.maxDate = new Date();
    this.minDate = new Date(this.maxDate.getFullYear() - 100, this.maxDate.getMonth(), this.maxDate.getDate());

  }

  openNew() {
    this.employeeCreateRequest = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      dateOfBirth: undefined,
      nationalIdentity: '',
      position: '',
    };

    this.employeeCreateDialog = true;
    this.submitted = false;
  }

  openEdit(employee: EmployeeGetListResponse) {
    this.employee = { ...employee };

    this.employeeUpdateRequest = {
      id: this.employee.id,
      email: this.employee.email,
      firstName: this.employee.firstName,
      lastName: this.employee.lastName,
      nationalIdentity: '',
      position: this.employee.position
    };

    if (employee.nationalIdentity) {
      if (employee.nationalIdentity != null) {
        this.employeeUpdateRequest.nationalIdentity = employee.nationalIdentity;
      }
    }
    if (employee.dateOfBirth) {
      if (new Date(employee.dateOfBirth).getFullYear() != 1 && employee.dateOfBirth != null) {
        this.employeeUpdateRequest.dateOfBirth = new Date(employee.dateOfBirth);
      }
    }

    this.employeeUpdateDialog = true;
    this.submitted = false;
  }

  hideDialog() {
    this.employeeCreateDialog = false;
    this.employeeUpdateDialog = false;
    this.submitted = false;
    this.submitButton = false;
  }

  deleteSelectedEmployees(isPermament: boolean) {
    this.confirmationService.confirm({
      message: 'Seçilen çalışanları silmek istediğine emin misin?',
      header: 'Toplu Sil',
      rejectLabel: 'İptal',
      acceptLabel: 'Sil',
      defaultFocus: 'reject',
      acceptButtonStyleClass: "delete-accept",
      rejectButtonStyleClass: "delete-reject",
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        if (this.selectedEmployees || this.selectedDeletedEmployees) {
          this.employeeDeleteRangeRequest = {
            ids: [],
            isPermament: isPermament
          };

          if (isPermament) {
            if (this.selectedDeletedEmployees) {
              this.selectedDeletedEmployees.forEach(i => {
                if (i.id) {
                  this.employeeDeleteRangeRequest.ids.push(i.id);
                }
              });
            }
          }
          else {
            if (this.selectedEmployees) {
              this.selectedEmployees.forEach(i => {
                if (i.id) {
                  this.employeeDeleteRangeRequest.ids.push(i.id);
                }
              });
            }
          }

          this.employeeService.deleteRangeEmployee(this.employeeDeleteRangeRequest).subscribe(response => {

            if (!isPermament) {
              this.selectedEmployees?.forEach(i => {
                this.deletedEmployee = {
                  id: i.id,
                  email: i.email,
                  userName: i.userName,
                  firstName: i.firstName,
                  lastName: i.lastName,
                  dateOfBirth: i.dateOfBirth,
                  nationalIdentity: i.nationalIdentity,
                  position: i.position,

                  createdDate: i.createdDate,
                  deletedDate: response.deletedDate,
                };
                this.deletedEmployees.items.push(this.deletedEmployee);
              });

              this.employees.items = this.employees.items.filter((val) => !this.selectedEmployees?.includes(val));
              this.messageService.add({ severity: 'warn', summary: 'Uyarı', detail: 'Seçili çalışanlar silindi.', life: 4000 });
            }
            else {
              this.deletedEmployees.items = this.deletedEmployees.items.filter((val) => !this.selectedDeletedEmployees?.includes(val));
              this.messageService.add({ severity: 'error', summary: 'Uyarı', detail: 'Seçili çalışanlar kalıcı olarak silindi.', life: 5000 });
            }

          }, error => {
            this.messageService.add({ severity: 'error', summary: 'Hata', detail: 'Bir hata meydana geldi.', life: 4000 });
          }).add(() => {
            this.selectedEmployees = [];
            this.selectedDeletedEmployees = [];
            this.deletedEmployee = {
              id: '',
              email: '',
              userName: '',
              firstName: '',
              lastName: '',
              dateOfBirth: new Date("0001-01-01T01:00:00"),
              nationalIdentity: '',
              position: '',

              createdDate: new Date("0001-01-01T01:00:00"),
              deletedDate: new Date("0001-01-01T01:00:00")
            };
            this.employeeDeleteRangeRequest = {
              ids: [],
              isPermament: false
            }
          });
        }
      }
    });
  }

  restoreSelectedEmployees() {
    this.confirmationService.confirm({
      message: 'Seçilen silinmiş çalışanları geri yüklemek istediğine emin misin?',
      header: 'Toplu Geri Yükle',
      rejectLabel: 'İptal',
      acceptLabel: 'Geri Yükle',
      defaultFocus: 'reject',
      acceptButtonStyleClass: "restore-accept",
      rejectButtonStyleClass: "restore-reject",
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        if (this.selectedDeletedEmployees) {
          this.employeeRestoreRangeRequest = {
            ids: []
          }

          this.selectedDeletedEmployees.forEach(i => {
            if (i.id) {
              this.employeeRestoreRangeRequest.ids.push(i.id);
            }
          });

          this.employeeService.restoreRangeEmployee(this.employeeRestoreRangeRequest).subscribe(response => {
            this.selectedDeletedEmployees?.forEach(i => {
              this.employee = {
                id: i.id,
                email: i.email,
                userName: i.userName,
                firstName: i.firstName,
                lastName: i.lastName,
                dateOfBirth: i.dateOfBirth,
                nationalIdentity: i.nationalIdentity,
                position: i.position,

                createdDate: i.createdDate,
              };
              this.employees.items.push(this.employee);

            });

            this.deletedEmployees.items = this.deletedEmployees.items.filter((val) => !this.selectedDeletedEmployees?.includes(val));
            this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Seçili çalışanlar geri yüklendi.', life: 4000 });

          }, error => {
            this.messageService.add({ severity: 'error', summary: 'Hata', detail: 'Bir hata meydana geldi.', life: 4000 });
          }).add(() => {
            this.selectedEmployees = [];
            this.selectedDeletedEmployees = [];
            this.employee = {
              id: '',
              email: '',
              userName: '',
              firstName: '',
              lastName: '',
              dateOfBirth: new Date("0001-01-01T01:00:00"),
              nationalIdentity: '',
              position: '',

              createdDate: new Date("0001-01-01T01:00:00")
            };
            this.employeeRestoreRangeRequest = {
              ids: []
            }
          });
        }
      }
    });
  }

  deleteEmployee(employee: EmployeeGetListResponse, isPermament: boolean) {
    this.confirmationService.confirm({
      message: '"' + employee.userName + '" Adlı çalışanı silmek istediğine emin misin?',
      header: 'Sil',
      rejectLabel: 'İptal',
      acceptLabel: 'Sil',
      defaultFocus: 'reject',
      acceptButtonStyleClass: "delete-accept",
      rejectButtonStyleClass: "delete-reject",
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.employeeDeleteRequest = {
          id: employee.id,
          isPermament: isPermament
        }

        this.employeeService.deleteEmployee(this.employeeDeleteRequest).subscribe(response => {

          if (!this.employeeDeleteRequest.isPermament) {
            this.deletedEmployee = {
              id: response.id,
              email: employee.email,
              userName: employee.userName,
              firstName: employee.firstName,
              lastName: employee.lastName,
              dateOfBirth: employee.dateOfBirth,
              nationalIdentity: employee.nationalIdentity,
              position: employee.position,

              createdDate: employee.createdDate,
              deletedDate: response.deletedDate,
            };

            this.employees.items = this.employees.items.filter((val) => val.id !== employee.id);
            this.deletedEmployees.items.push(this.deletedEmployee);
            this.messageService.add({ severity: 'warn', summary: 'Uyarı', detail: 'Bir çalışan silindi.', life: 4000 });
          }
          else {
            this.deletedEmployees.items = this.deletedEmployees.items.filter((val) => val.id !== employee.id);
            this.messageService.add({ severity: 'error', summary: 'Uyarı', detail: 'Bir çalışan kalıcı olarak silindi.', life: 5000 });
          }

        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Hata', detail: 'Bir hata meydana geldi.', life: 4000 });
        }).add(() => {
          this.deletedEmployee = {
            id: '',
            email: '',
            userName: '',
            firstName: '',
            lastName: '',
            dateOfBirth: new Date("0001-01-01T01:00:00"),
            nationalIdentity: '',
            position: '',

            createdDate: new Date("0001-01-01T01:00:00"),
            deletedDate: new Date("0001-01-01T01:00:00")
          };
          this.employeeDeleteRequest = {
            id: '',
            isPermament: false
          }

        });
      }
    });
  }

  restoreEmployee(employee: EmployeeGetListDeletedResponse) {
    this.confirmationService.confirm({
      message: '"' + employee.userName + '" Adlı silinen çalışanı geri yüklemek istediğine emin misin?',
      header: 'Geri Yükle',
      rejectLabel: 'İptal',
      acceptLabel: 'Geri Yükle',
      defaultFocus: 'reject',
      acceptButtonStyleClass: "restore-accept",
      rejectButtonStyleClass: "restore-reject",
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.employeeRestoreRequest = {
          id: employee.id
        }

        this.employeeService.restoreEmployee(this.employeeRestoreRequest).subscribe(response => {

          this.employee = {
            id: response.id,
            email: employee.email,
            userName: response.userName,
            firstName: employee.firstName,
            lastName: employee.lastName,
            dateOfBirth: employee.dateOfBirth,
            nationalIdentity: employee.nationalIdentity,
            position: employee.position,

            createdDate: employee.createdDate
          };

          this.deletedEmployees.items = this.deletedEmployees.items.filter((val) => val.id !== employee.id);
          this.employees.items.push(this.employee);
          this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Bir çalışan geri yüklendi.', life: 4000 });

        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Hata', detail: 'Bir hata meydana geldi.', life: 4000 });
        }).add(() => {
          this.employee = {
            id: '',
            email: '',
            userName: '',
            firstName: '',
            lastName: '',
            dateOfBirth: new Date("0001-01-01T01:00:00"),
            nationalIdentity: '',
            position: '',

            createdDate: new Date("0001-01-01T01:00:00")
          };
          this.employeeRestoreRequest = {
            id: ''
          };
        });
      }
    });
  }

  createEmployee() {
    this.submitted = true;
    this.submitButton = true;

    if (this.validationControl("create")) {

      this.employeeService.createEmployee(this.employeeCreateRequest).subscribe(response => {
        this.hideDialog();

        this.employee = {
          id: response.id,
          email: response.email,
          userName: response.userName,
          firstName: response.firstName,
          lastName: response.lastName,
          dateOfBirth: response.dateOfBirth,
          nationalIdentity: response.nationalIdentity,
          position: response.position,

          createdDate: response.createdDate,
        };

        this.employees.items.push(this.employee);
        this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Çalışan oluşturuldu.', life: 4000 });

      }, error => {
        this.submitted = false;
        this.submitButton = false;
        console.log("- Bir hata meydana geldi.: ", error)
        this.messageService.add({ severity: 'error', summary: 'Hata', detail: 'Bir hata meydana geldi.', life: 4000 });
      }).add(() => {
        this.employees.items = [...this.employees.items];
        this.employeeCreateRequest = {
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          dateOfBirth: undefined,
          nationalIdentity: '',
          position: '',
        };
        this.employee = {
          id: '',
          email: '',
          userName: '',
          firstName: '',
          lastName: '',
          dateOfBirth: new Date("0001-01-01T01:00:00"),
          nationalIdentity: '',
          position: '',

          createdDate: new Date("0001-01-01T01:00:00"),
        };

      });
    }
    else {
      this.submitButton = false;
    }
  }

  updateEmployee() {
    this.submitted = true;
    this.submitButton = true;

    if (this.validationControl("update")) {

      this.employeeService.updateEmployee(this.employeeUpdateRequest).subscribe(response => {
        this.hideDialog();

        this.employee = {
          id: response.id,
          email: response.email,
          userName: response.userName,
          firstName: response.firstName,
          lastName: response.lastName,
          dateOfBirth: response.dateOfBirth,
          nationalIdentity: response.nationalIdentity,
          position: response.position,

          createdDate: this.employee.createdDate,
        };

        this.employees.items[this.findIndexById(this.employee.id)] = this.employee;
        this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Çalışan bilgileri güncellendi.', life: 4000 });

      }, error => {
        this.submitted = false;
        this.submitButton = false;
        console.log("- Bir hata meydana geldi.: ", error)
        this.messageService.add({ severity: 'error', summary: 'Hata', detail: 'Bir hata meydana geldi.', life: 4000 });
      }).add(() => {
        this.employees.items = [...this.employees.items];
        this.employeeUpdateRequest = {
          id: '',
          email: '',
          firstName: '',
          lastName: '',
          dateOfBirth: new Date("0001-01-01T01:00:00"),
          nationalIdentity: undefined,
          position: '',
        };
        this.employee = {
          id: '',
          email: '',
          userName: '',
          firstName: '',
          lastName: '',
          dateOfBirth: new Date("0001-01-01T01:00:00"),
          nationalIdentity: '',
          position: '',

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
    for (let i = 0; i < this.employees.items.length; i++) {
      if (this.employees.items[i].id === id) {
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
          !this.employeeCreateRequest.firstName?.trim() ||
          !this.employeeCreateRequest.lastName?.trim() ||
          !this.beValidEmail(this.employeeCreateRequest.email) ||
          !this.strongPassword(this.employeeCreateRequest.password) ||
          !this.employeeCreateRequest.position?.trim()
        ) {
          return false;
        }
        else {
          if (!(this.employeeCreateRequest.nationalIdentity?.length == 0 || this.employeeCreateRequest.nationalIdentity?.length == 11)) {
            return false;
          }
          else {
            this.employeeCreateRequest.nationalIdentity = this.employeeCreateRequest.nationalIdentity.length == 0 ? undefined : this.employeeCreateRequest.nationalIdentity;
            return true;
          }
        }
      case "update":
        if (
          !this.employeeUpdateRequest.id?.trim() ||
          !this.employeeUpdateRequest.firstName?.trim() ||
          !this.employeeUpdateRequest.lastName?.trim() ||
          !this.beValidEmail(this.employeeUpdateRequest.email) ||
          !this.employeeUpdateRequest.position?.trim()
        ) {
          return false;
        }
        else {
          if (!(this.employeeUpdateRequest.nationalIdentity?.length == 0 || this.employeeUpdateRequest.nationalIdentity?.length == 11)) {
            return false;
          }
          else {
            this.employeeUpdateRequest.nationalIdentity = this.employeeUpdateRequest.nationalIdentity.length == 0 ? undefined : this.employeeUpdateRequest.nationalIdentity;
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
      this.employeeCreateRequest.nationalIdentity = value;
    }
    if (requestName == "update") {
      this.employeeUpdateRequest.nationalIdentity = value;
    }
  }

}
