export interface GetListByJoinApplicantListItemDto {
    id: string | null,
    createdDate: Date | null,
    applicantId: string,
    applicantUserName: string,
    bootcampId: string | null,
    bootcampName: string | null,
    applicationStateId: string | null,
    applicationStateName: string | null
}