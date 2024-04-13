export interface GetBootcampResponse{
    id: string,
    name: string,
    startDate: string,
    endDate: string,

    instructorId: string,
    instructorUserName: string,
    instructorFirstName: string,
    instructorLastName: string,
    instructorCompanyName: string,

    bootcampStateId: string,
    bootcampStateName: string
}