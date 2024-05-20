export interface BootcampUpdateRequest{
    id: string,
    name: string,
    instructorId: string,
    bootcampStateId: string,
    startDate: Date,
    endDate: Date
}