const all = {
  env: process.env.NODE_ENV,

  // Server port
  port: process.env.PORT || 3030,

  // Should we populate the DB with sample data?
  seedDB: false,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: process.env.SECRET_KEY || 's3cr3t_k3y@!!',
  },

  userRoles: ['manager', 'admin', 'user'],
}

// Export the config object based on the NODE_ENV
// =============================================
module.exports = all
