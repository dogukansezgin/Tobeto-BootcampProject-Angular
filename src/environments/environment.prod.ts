export const environment = {
  production: true,
  apiUrl: 'http://localhost:5278',
  endpoints: {
    bootcamps: {
      getList: '',
      getListDeleted: '',
      getBasicInfo: '',
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
      getList: '',
      getListDeleted: '',
      createBootcampState: '',
      updateBootcampState: '',
      deleteBootcampState: '',
      deleteRangeBootcampState: '',
      restoreBootcampState: '',
      restoreRangeBootcampState: ''
    },
    blacklists: {
      getList: '',
      getListDeleted: '',
      createBlacklist: '',
      updateBlacklist: '',
      deleteBlacklist: '',
      deleteRangeBlacklist: '',
      restoreBlacklist: '',
      restoreRangeBlacklist: ''
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
      getBasicInfo: '',
      getApplicantById: '',
      updateApplicantInfo: '',
      createApplicants: '',
      updateApplicants: '',
      deleteApplicants: '',
      deleteRangeApplicants: '',
      restoreApplicants: '',
      restoreRangeApplicants: '',
      getListByJoin:''
    },
    applications: {
      checkApplication: '',
      appliedBootcamps: '',
      getList: '',
      getListDeleted: '',
      getListByInstructor:'',
      getListByInstructorByState:'',
      createApplication: '',
      updateApplication: '',
      updateRangeApplication: '',
      deleteApplication: '',
      deleteRangeApplication: '',
      restoreApplication: '',
      restoreRangeApplication: ''
    },
    applicationStates: {
      getByName: '',
      getList: '',
      getListDeleted: '',
      createApplicationState: '',
      updateApplicationState: '',
      deleteApplicationState: '',
      deleteRangeApplicationState: '',
      restoreApplicationState: '',
      restoreRangeApplicationState: ''
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