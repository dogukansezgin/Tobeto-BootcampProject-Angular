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
      updateApplicantInfo: '/api/Applicants/UpdateFromAuth',
      getListByJoin:'/api/Applications/getByJoin',
      getList:'/api/Applicants'
    },
    applications: {
      post: '/api/Applications/post',
      checkApplication: '/api/Applications/checkApplication',
      appliedBootcamps: '/api/Applications/appliedBootcamps',
      getApplications:'/api/Applications',
      deleteApplication:'/api/Applications/delete/',
      updateApplication:'/api/Applications/update',
      deleteSelected:'/api/Applications/deleteSelected',
      getByState:'/api/Applications/getByState'
    },
    applicationStates: {
      getByName: '/api/ApplicationStates/getByName/'
    },
    instructors: {
      getList: '/api/Instructors',
      getBasicInfo: '/api/Instructors/getBasicInfo'
    }

    // Diğer endpointler buraya eklenebilir
  }
};