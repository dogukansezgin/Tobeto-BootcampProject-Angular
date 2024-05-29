export interface ApplicationGetListByInstructorByStateResponse {
    id: string,

    applicantId: string,
    applicantUserName: string,
    applicantEmail: string,

    bootcampId: string,
    bootcampName: string,
    bootcampInstructorId: string,
    bootcampInstructorUserName: string,

    applicationStateId: string,
    applicationStateName: string,

    createdDate: Date
}