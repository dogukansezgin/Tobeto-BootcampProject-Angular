export interface InstructorUpdateRequest{
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    dateOfBirth?: Date,
    nationalIdentity?: string,
    companyName: string,
}