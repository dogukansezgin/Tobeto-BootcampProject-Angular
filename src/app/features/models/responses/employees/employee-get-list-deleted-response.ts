export interface EmployeeGetListDeletedResponse {
    id: string,
    email: string,
    userName: string,
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    nationalIdentity: string,
    position: string,

    createdDate: Date,
    deletedDate: Date
}