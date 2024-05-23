export const environment = {
  production: false,
  apiUrl: 'http://localhost:5278',
  endpoints: {
    bootcamps: {
      getList: '/api/Bootcamps/get',
      getListDeleted: '/api/Bootcamps/getDeleted',
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
      getList: '/api/BootcampStates'
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
      getApplicantById: '/api/Applicants/',
      updateApplicantInfo: '/api/Applicants/UpdateFromAuth'
    },
    applications: {
      post: '/api/Applications/post',
      checkApplication: '/api/Applications/checkApplication',
      appliedBootcamps: '/api/Applications/appliedBootcamps'
    },
    applicationStates: {
      getByName: '/api/ApplicationStates/getByName/'
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
    }

    // Diğer endpointler buraya eklenebilir
  }
};