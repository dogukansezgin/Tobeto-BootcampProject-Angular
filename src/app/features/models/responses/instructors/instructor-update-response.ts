export interface InstructorUpdateResponse{
    id: string,
    email: string,
    userName: string,
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    nationalIdentity: string,
    companyName: string,

    deletedDate: Date
}