export interface ApplicantCreateResponse{
    id: string,
    email: string,
    userName: string,
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    nationalIdentity: string,
    about: string,

    createdDate: Date
}