export interface BlacklistGetListDeletedResponse {
    id: string,
    
    applicantId: string,
    applicantUserName: string,
    applicantEmail: string,

    reason: string,
    date: Date,

    createdDate: Date,
    deletedDate: Date
}