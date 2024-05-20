export interface BootcampCreateRequest{
    name: string,
    instructorId: string,
    bootcampStateId: string,
    startDate: Date,
    endDate: Date
}