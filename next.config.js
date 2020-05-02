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
        // MEMO: Next.jsで必要となる.envファイルのプロパティキーを記載
        POSTGRES_HOSTNAME: process.env.POSTGRES_HOSTNAME,
        BACKEND_HOSTNAME: process.env.BACKEND_HOSTNAME,
        BACKEND_HOSTNAME_AND_PORT: process.env.BACKEND_HOSTNAME_AND_PORT,
        // Amazon Cognito User Pools
        AWS_REGION: process.env.AWS_REGION,
        IDP_DOMAIN: process.env.IDP_DOMAIN,
        USER_POOL_ID: process.env.USER_POOL_ID,
        USER_POOL_CLIENT_ID: process.env.USER_POOL_CLIENT_ID,
        REDIRECT_SIGN_IN: process.env.REDIRECT_SIGN_IN,
        REDIRECT_SIGN_OUT: process.env.REDIRECT_SIGN_OUT,
        AUTH_COOKIE_DOMAIN: process.env.AUTH_COOKIE_DOMAIN,
    },
}