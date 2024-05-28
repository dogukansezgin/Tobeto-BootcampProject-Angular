export interface BlacklistGetListResponse {
    id: string,

    applicantId: string,
    applicantUserName: string,
    applicantEmail: string,
    
    reason: string,
    date: Date,

    createdDate: Date
}