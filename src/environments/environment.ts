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
      }
      // Diğer endpointler buraya eklenebilir
    }
  };