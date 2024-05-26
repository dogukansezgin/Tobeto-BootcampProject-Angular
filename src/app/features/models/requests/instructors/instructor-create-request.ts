export interface InstructorCreateRequest{
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    dateOfBirth?: Date,
    nationalIdentity?: string,
    companyName: string,
}