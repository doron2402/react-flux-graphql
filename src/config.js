module.exports = (() => {
  let env = process.NODE_ENV || 'development';

  let publicAPI = {
    development: {
      mongodb: 'mongodb://localhost:27017/rgr',
      server:{
        port: 3000
      }
    },
    production: {
      mongodb: 'mongodb://localhost:27017/rgr',
      server: {
        port: 3000
      }
    }
  };

  return publicAPI[env];
})();
