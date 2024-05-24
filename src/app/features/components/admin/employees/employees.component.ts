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

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [TableModule, DialogModule, RippleModule, ButtonModule, ToastModule, ToolbarModule, ConfirmDialogModule, InputTextModule, InputTextareaModule, CommonModule, FileUploadModule, DropdownModule, TagModule, RadioButtonModule, RatingModule, InputTextModule, FormsModule, InputNumberModule, CalendarModule],
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
    dateOfBirth: new Date("0001-01-01T01:00:00"),
    nationalIdentity: '',
    position: '',
  };

  employeeUpdateRequest: EmployeeUpdateRequest = {
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    dateOfBirth: new Date("0001-01-01T01:00:00"),
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
      dateOfBirth: new Date(this.maxDate.getFullYear() - 30, this.maxDate.getMonth(), this.maxDate.getDate()),
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
    };

    if(employee.nationalIdentity) {
      if (employee.dateOfBirth != null) {
        this.employeeUpdateRequest.nationalIdentity = employee.nationalIdentity;
      }
    }
    if (employee.dateOfBirth) {
      if (new Date(employee.dateOfBirth).getFullYear() != 1 && employee.dateOfBirth != null) {
        this.employeeUpdateRequest.dateOfBirth = new Date(employee.dateOfBirth);
      }
    }
    if (employee.position) {
      if (employee.position != null) {
        this.employeeUpdateRequest.position = employee.position;
      }
    }

    this.employeeUpdateDialog = true;
    this.submitted = false;
  }

  hideDialog() {
    this.employeeCreateDialog = false;
    this.employeeUpdateDialog = false;
    this.submitted = false;
  }

  deleteSelectedEmployees(isPermament: boolean) {
    this.confirmationService.confirm({
      message: 'Seçilen çalışanları silmek istediğine emin misin?',
      header: 'Toplu Sil',
      rejectLabel: 'İptal',
      acceptLabel: 'Sil',
      defaultFocus: 'reject',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log(this.selectedEmployees)

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
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Employees Deleted', life: 3000 });

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
            }
            else {
              this.deletedEmployees.items = this.deletedEmployees.items.filter((val) => !this.selectedDeletedEmployees?.includes(val));
            }


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
      message: 'Seçilen silinmiş çalışanları kurtarmak istediğine emin misin?',
      header: 'Toplu Kurtar',
      rejectLabel: 'İptal',
      acceptLabel: 'Kurtar',
      defaultFocus: 'reject',
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
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Employees Restored', life: 3000 });

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
    console.log(employee)
    this.confirmationService.confirm({
      message: '"' + employee.userName + '" Adlı çalışanı silmek istediğine emin misin?',
      header: 'Sil',
      rejectLabel: 'İptal',
      acceptLabel: 'Sil',
      defaultFocus: 'reject',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.employeeDeleteRequest = {
          id: employee.id,
          isPermament: isPermament
        }

        this.employeeService.deleteEmployee(this.employeeDeleteRequest).subscribe(response => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Employee Deleted', life: 3000 });

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

          }
          else {
            this.deletedEmployees.items = this.deletedEmployees.items.filter((val) => val.id !== employee.id);
          }

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
    console.log(employee)
    this.confirmationService.confirm({
      message: '"' + employee.userName + '" Adlı silinen çalışanı kurtarmak istediğine emin misin?',
      header: 'Kurtar',
      rejectLabel: 'İptal',
      acceptLabel: 'Kurtar',
      defaultFocus: 'reject',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.employeeRestoreRequest = {
          id: employee.id
        }

        this.employeeService.restoreEmployee(this.employeeRestoreRequest).subscribe(response => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Employee Restored', life: 3000 });

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
    console.log(this.employeeCreateRequest)
    this.submitted = true;
    if (this.employeeCreateRequest.firstName?.trim() && this.employeeCreateRequest.lastName?.trim()) {

      this.employeeService.createEmployee(this.employeeCreateRequest).subscribe(response => {
        this.employeeCreateDialog = false;
        this.submitted = false;

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
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Employee Created', life: 3000 });

      }).add(() => {
        this.employees.items = [...this.employees.items];
        this.employeeCreateDialog = false;
        this.employeeCreateRequest = {
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          dateOfBirth: new Date("0001-01-01T01:00:00"),
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
  }

  updateEmployee() {
    this.submitted = true;

    if (this.employee.userName?.trim()) {

      this.employeeService.updateEmployee(this.employeeUpdateRequest).subscribe(response => {
        this.employeeUpdateDialog = false;
        this.submitted = false;

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
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Employee Updated', life: 3000 });
      }).add(() => {
        this.employees.items = [...this.employees.items];
        this.employeeUpdateDialog = false;
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

}
