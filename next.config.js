module.exports = {
  reactStrictMode: true,
  env: {
    HOSTNAME: process.env.HOSTNAME,
    
    //
    // This is an insecure implementation of user access
    // Given the nature of the project, and is demo purposes only
    //
    // For the next developer, implement a JWT auth or similar
    // - Gin
    //
    ADMIN_USER: process.env.ADMIN_USER,
    ADMIN_PASS: process.env.ADMIN_PASS,
  },
}