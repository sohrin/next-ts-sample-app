require('dotenv').config()
module.exports = {
    env: {
        POSTGRES_HOSTNAME: process.env.POSTGRES_HOSTNAME,
        BACKEND_HOSTNAME: process.env.BACKEND_HOSTNAME,
    },
}