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
    },
    users: {
      getUserById: ''
    },
    applicants: {
      getApplicantById: '',
      updateApplicantInfo: ''
    },
    applications: {
      post: '',
      checkApplication: '',
      appliedBootcamps: ''
    }

    // Diğer endpointler buraya eklenebilir
  }
};