export interface EmployeeCreateRequest{
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    dateOfBirth?: Date,
    nationalIdentity?: string,
    position: string,
}