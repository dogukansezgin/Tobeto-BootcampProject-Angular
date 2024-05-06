export const environment = {
    production: false,
    apiUrl: 'http://localhost:5278',
    endpoints: {
      bootcamps: {
        getBootcamps: '/api/Bootcamps/get',
        getBootcampById: '/api/Bootcamps/',
        getUnfinishedBootcamps:'/api/Bootcamps/getUnfinished?PageIndex=0&PageSize=50'
      },
      auth: {
        register: {
          applicant: '/api/Auth/Register/Applicant'
        },
        login: {
          userLogin: '/api/Auth/Login'
        }
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