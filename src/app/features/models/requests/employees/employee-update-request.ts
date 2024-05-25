export interface EmployeeUpdateRequest{
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    dateOfBirth?: Date,
    nationalIdentity?: string,
    position: string,
}