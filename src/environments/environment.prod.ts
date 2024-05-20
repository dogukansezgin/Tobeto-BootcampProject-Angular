export const environment = {
  production: true,
  apiUrl: 'http://localhost:5278',
  endpoints: {
    bootcamps: {
      getBootcamps: '',
      getBootcampById: '',
      getBootcampByName: '',
      getUnfinishedBootcamps: '',
      getFinishedBootcamps: '',
      searchAllBootcamps: '',
      createBootcamp: '',
      updateBootcamp: ''
    },
    bootcampStates: {
      getList: ''
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
    },
    applicationStates: {
      getByName: ''
    },
    instructors: {
      getList: '',
      getBasicInfo: ''
    }

    // Diğer endpointler buraya eklenebilir
  }
};