export const environment = {
  production: true,
  apiUrl: 'http://localhost:5278',
  endpoints: {
    bootcamps: {
      getList: '',
      getListDeleted: '',
      getBootcampById: '',
      getBootcampByName: '',
      getUnfinishedBootcamps: '',
      getFinishedBootcamps: '',
      searchAllBootcamps: '',
      createBootcamp: '',
      updateBootcamp: '',
      deleteBootcamp: '',
      deleteRangeBootcamp: '',
      restoreBootcamp: '',
      restoreRangeBootcamp: ''
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
      getList: '',
      getListDeleted: '',
      getApplicantById: '',
      updateApplicantInfo: '',
      createApplicants: '',
      updateApplicants: '',
      deleteApplicants: '',
      deleteRangeApplicants: '',
      restoreApplicants: '',
      restoreRangeApplicants: ''
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
      getListDeleted: '',
      getBasicInfo: '',
      createInstructors: '',
      updateInstructors: '',
      deleteInstructors: '',
      deleteRangeInstructors: '',
      restoreInstructors: '',
      restoreRangeInstructors: ''
    },
    employees: {
      getList: '',
      getListDeleted: '',
      createEmployees: '',
      updateEmployees: '',
      deleteEmployees: '',
      deleteRangeEmployees: '',
      restoreEmployees: '',
      restoreRangeEmployees: ''
    }

    // Diğer endpointler buraya eklenebilir
  }
};