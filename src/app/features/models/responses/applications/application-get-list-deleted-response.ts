export interface ApplicationGetListDeletedResponse {
    id: string,

    applicantId: string,
    applicantUserName: string,
    applicantEmail: string,

    bootcampId: string,
    bootcampName: string,

    applicationStateId: string,
    applicationStateName: string,

    createdDate: Date,
    deletedDate: Date
}