export interface BootcampGetListImageResponse {
    id: string,
    name: string,
    startDate: Date,
    endDate: Date,

    instructorId: string,
    instructorUserName: string,
    instructorFirstName: string,
    instructorLastName: string,
    instructorCompanyName: string,

    bootcampStateId: string,
    bootcampStateName: string,

    bootcampImageId: string,
    bootcampImagePath: string,

    createdDate: Date,
}