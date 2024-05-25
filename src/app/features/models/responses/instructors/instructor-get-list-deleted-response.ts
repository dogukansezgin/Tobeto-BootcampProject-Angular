export interface InstructorGetListDeletedResponse {
    id: string,
    email: string,
    userName: string,
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    nationalIdentity: string,
    companyName: string,

    createdDate: Date,
    deletedDate: Date
}