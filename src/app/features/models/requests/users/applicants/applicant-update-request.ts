export interface ApplicantUpdateRequest{
    id: string,
    firstName?: string,
    lastName?: string,
    dateOfBirth?: Date,
    about?: string
}