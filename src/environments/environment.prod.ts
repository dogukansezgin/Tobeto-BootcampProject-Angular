export const environment = {
  production: true,
  apiUrl: 'http://localhost:5278',
  endpoints: {
    bootcamps: {
      getBootcamps: '/api/Bootcamps/get',
      getBootcampById: '/api/Bootcamps/'
      // Diğer kullanıcı endpointleri buraya eklenebilir
    },
    posts: {
      // Post endpointleri buraya eklenebilir
    }
    // Diğer endpointler buraya eklenebilir
  }
};