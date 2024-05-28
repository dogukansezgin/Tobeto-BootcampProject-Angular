export const environment = {
  production: false,
  apiUrl: 'http://localhost:5278',
  endpoints: {
    bootcamps: {
      getList: '/api/Bootcamps/get',
      getListDeleted: '/api/Bootcamps/getDeleted',
      getBasicInfo: '/api/Bootcamps/getBasicInfo',
      getBootcampById: '/api/Bootcamps/id/',
      getBootcampByName: '/api/Bootcamps/name/',
      getUnfinishedBootcamps: '/api/Bootcamps/getUnfinished',
      getFinishedBootcamps: '/api/Bootcamps/getFinished',
      searchAllBootcamps: '/api/Bootcamps/searchAll',
      createBootcamp: '/api/Bootcamps/create',
      updateBootcamp: '/api/Bootcamps/update',
      deleteBootcamp: '/api/Bootcamps/delete',
      deleteRangeBootcamp: '/api/Bootcamps/deleteRange',
      restoreBootcamp: '/api/Bootcamps/restore',
      restoreRangeBootcamp: '/api/Bootcamps/restoreRange'
    },
    bootcampStates: {
      getList: '/api/BootcampStates/get',
      getListDeleted: '/api/BootcampStates/getDeleted',
      createBootcampState: '/api/BootcampStates/create',
      updateBootcampState: '/api/BootcampStates/update',
      deleteBootcampState: '/api/BootcampStates/delete',
      deleteRangeBootcampState: '/api/BootcampStates/deleteRange',
      restoreBootcampState: '/api/BootcampStates/restore',
      restoreRangeBootcampState: '/api/BootcampStates/restoreRange'
    },
    blacklists: {
      getList: '/api/Blacklists/get',
      getListDeleted: '/api/Blacklists/getDeleted',
      createBlacklist: '/api/Blacklists/create',
      updateBlacklist: '/api/Blacklists/update',
      deleteBlacklist: '/api/Blacklists/delete',
      deleteRangeBlacklist: '/api/Blacklists/deleteRange',
      restoreBlacklist: '/api/Blacklists/restore',
      restoreRangeBlacklist: '/api/Blacklists/restoreRange'
    },
    auth: {
      register: {
        applicant: '/api/Auth/Register/Applicant'
      },
      login: {
        userLogin: '/api/Auth/Login'
      }
    },
    users: {
      getUserById: '/api/Users/'
    },
    applicants: {
      getList: '/api/Applicants/get',
      getListDeleted: '/api/Applicants/getDeleted',
      getBasicInfo: '/api/Applicants/getBasicInfo',
      getApplicantById: '/api/Applicants/',
      updateApplicantInfo: '/api/Applicants/UpdateFromAuth',
      createApplicants: '/api/Applicants/create',
      updateApplicants: '/api/Applicants/update',
      deleteApplicants: '/api/Applicants/delete',
      deleteRangeApplicants: '/api/Applicants/deleteRange',
      restoreApplicants: '/api/Applicants/restore',
      restoreRangeApplicants: '/api/Applicants/restoreRange',
      getListByJoin:'/api/Applications/getByJoin'
    },
    applications: {
      checkApplication: '/api/Applications/checkApplication',
      appliedBootcamps: '/api/Applications/appliedBootcamps',
      getList: '/api/Applications/get',
      getListDeleted: '/api/Applications/getDeleted',
      createApplication: '/api/Applications/create',
      updateApplication: '/api/Applications/update',
      deleteApplication: '/api/Applications/delete',
      deleteRangeApplication: '/api/Applications/deleteRange',
      restoreApplication: '/api/Applications/restore',
      restoreRangeApplication: '/api/Applications/restoreRange',
      getByState:'/api/Applications/getByState'

    },
    applicationStates: {
      getByName: '/api/ApplicationStates/getByName/',
      getList: '/api/ApplicationStates/get',
      getListDeleted: '/api/ApplicationStates/getDeleted',
      createApplicationState: '/api/ApplicationStates/create',
      updateApplicationState: '/api/ApplicationStates/update',
      deleteApplicationState: '/api/ApplicationStates/delete',
      deleteRangeApplicationState: '/api/ApplicationStates/deleteRange',
      restoreApplicationState: '/api/ApplicationStates/restore',
      restoreRangeApplicationState: '/api/ApplicationStates/restoreRange'
    },
    instructors: {
      getList: '/api/Instructors/get',
      getListDeleted: '/api/Instructors/getDeleted',
      getBasicInfo: '/api/Instructors/getBasicInfo',
      createInstructors: '/api/Instructors/create',
      updateInstructors: '/api/Instructors/update',
      deleteInstructors: '/api/Instructors/delete',
      deleteRangeInstructors: '/api/Instructors/deleteRange',
      restoreInstructors: '/api/Instructors/restore',
      restoreRangeInstructors: '/api/Instructors/restoreRange'
    },
    employees: {
      getList: '/api/Employees/get',
      getListDeleted: '/api/Employees/getDeleted',
      createEmployees: '/api/Employees/create',
      updateEmployees: '/api/Employees/update',
      deleteEmployees: '/api/Employees/delete',
      deleteRangeEmployees: '/api/Employees/deleteRange',
      restoreEmployees: '/api/Employees/restore',
      restoreRangeEmployees: '/api/Employees/restoreRange'
    }

    // Diğer endpointler buraya eklenebilir
  }
};