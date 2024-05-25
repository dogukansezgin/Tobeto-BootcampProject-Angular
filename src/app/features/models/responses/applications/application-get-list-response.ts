export interface ApplicationGetListResponse {
    id: string,

    applicantId: string,
    applicantUserName: string,
    applicantEmail: string,

    bootcampId: string,
    bootcampName: string,

    applicationStateId: string,
    applicationStateName: string,

    createdDate: Date
}