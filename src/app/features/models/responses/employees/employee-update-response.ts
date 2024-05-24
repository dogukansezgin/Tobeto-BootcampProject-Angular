export interface EmployeeUpdateResponse{
    id: string,
    email: string,
    userName: string,
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    nationalIdentity: string,
    position: string,

    deletedDate: Date
}