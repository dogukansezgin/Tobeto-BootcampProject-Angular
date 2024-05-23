export interface GetListApplicationListItemDto {
    id: string;
    applicantId: string;
    bootcampId: string;
    applicationStateId: string;

    createdDate:Date;

    applicantFirstName: string;
    applicantLastName: string;

    bootcampName: string;

    applicationStateName: string;
}