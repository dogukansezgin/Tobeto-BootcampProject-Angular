export const environment = {
  production: true,
  apiUrl: 'http://localhost:5278',
  endpoints: {
    bootcamps: {
      getBootcamps: '',
      getBootcampById: ''
    },
    auth: {
      register: {
        applicant: ''
      },
      login: {
        userLogin: ''
      }
    }
    // Diğer endpointler buraya eklenebilir
  }
};