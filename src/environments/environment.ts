export const environment = {
    production: false,
    apiUrl: 'http://localhost:5278',
    endpoints: {
      bootcamps: {
        getBootcamps: '/api/Bootcamps/get',
        getBootcampById: '/api/Bootcamps/',
        getUnfinishedBootcamps:'/api/Bootcamps/getUnfinished',
        searchAllBootcamps: '/api/Bootcamps/searchAll'
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
      }

      // Diğer endpointler buraya eklenebilir
    }
  };