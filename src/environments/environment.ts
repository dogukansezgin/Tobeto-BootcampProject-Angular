export const environment = {
    production: false,
    apiUrl: 'http://localhost:5278',
    endpoints: {
      bootcamps: {
        getBootcamps: '/api/Bootcamps/get',
        getBootcampById: '/api/Bootcamps/'
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
      }
      // Diğer endpointler buraya eklenebilir
    }
  };