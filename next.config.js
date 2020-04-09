const dotEnv = require('dotenv');
const path = require('path');
let dotEnvFileName = null;
let nodeEnv = `${process.env.NODE_ENV}`;
if (nodeEnv === "docker") {
    dotEnvFileName = ".env";
} else {
    dotEnvFileName = ".env." + nodeEnv;
}
const envFilePath = path.join(__dirname, dotEnvFileName);
dotEnv.config({ path: envFilePath });
module.exports = {
    env: {
        // Next.jsで必要となる.envファイルのプロパティキーを記載
        POSTGRES_DOCKER_HOSTNAME: process.env.POSTGRES_DOCKER_HOSTNAME,
        BACKEND_DOCKER_HOSTNAME: process.env.BACKEND_DOCKER_HOSTNAME,
        BACKEND_HOSTNAME_AND_PORT: process.env.BACKEND_HOSTNAME_AND_PORT,
    },
}