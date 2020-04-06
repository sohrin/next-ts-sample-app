const dotEnv = require('dotenv');
const path = require('path');
let dotEnvFileName = null;
let nodeEnv = `${process.env.NODE_ENV}`;
if (nodeEnv === "") {
    dotEnvFileName = ".env";
} else {
    dotEnvFileName = ".env." + nodeEnv;
}
const envFilePath = path.join(__dirname, dotEnvFileName);
dotEnv.config({ path: envFilePath });
module.exports = {
    env: {
        POSTGRES_HOSTNAME: process.env.POSTGRES_HOSTNAME,
        BACKEND_HOSTNAME: process.env.BACKEND_HOSTNAME,
    },
}