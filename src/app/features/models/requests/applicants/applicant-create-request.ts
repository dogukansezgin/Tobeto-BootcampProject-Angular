export interface ApplicantCreateRequest{
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    dateOfBirth?: Date,
    nationalIdentity?: string,
    about?: string,
}