export const environment = {
  production: false,
  apiUrl: 'http://localhost:5278',
  endpoints: {
    bootcamps: {
      getBootcamps: '/api/Bootcamps/get',
      getBootcampById: '/api/Bootcamps/id/',
      getBootcampByName: '/api/Bootcamps/name/',
      getUnfinishedBootcamps: '/api/Bootcamps/getUnfinished',
      getFinishedBootcamps: '/api/Bootcamps/getFinished',
      searchAllBootcamps: '/api/Bootcamps/searchAll',
      createBootcamp: '/api/Bootcamps/create',
      updateBootcamp: '/api/Bootcamps/update'
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
      getList: '/api/Instructors',
      getBasicInfo: '/api/Instructors/getBasicInfo'
    }

    // Diğer endpointler buraya eklenebilir
  }
};