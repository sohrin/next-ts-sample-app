// Next.jsでenvファイルを使用する：https://qiita.com/Switch/items/230aa186e5c2029f536c
// 何故かdotenvではだめで、dotenv-webpackだと動いた
import Dotenv from "dotenv-webpack";
let dotenvFilename;
// TODO: npm run devのときは".env_local_npm"、docker-composeの時は".env"
// TODO: Fargate用docker-composeのビルド（検証環境）時は".env-ecs"
// TODO: Fargate用docker-composeのビルド（本番環境）時は・・・
// TODO: next.config.jsではログはでない？？？
// TODO: cross-envは必要？（https://qiita.com/TakahiRoyte/items/c152ad8baa191ed1f8ae、https://qiita.com/syoimin/items/3dac2626f0a4e240ee55、https://www.tam-tam.co.jp/tipsnote/program/post17589.html）
console.log("★★★process.env.NODE_ENV:" + process.env.NODE_ENV);
if (!process.env.NODE_ENV) {
    dotenvFilename = ".env_local_npm";
} else {
    dotenvFilename = '.env';
}
console.log("★★★env file: [" + dotenvFilename + "]");

export function webpack(config, { isServer }) {
    config.plugins = [
        // 設定を記述
        new Dotenv({
            path: path.join(__dirname, dotenvFilename),
            systemvars: true
        })
    ];
    // Fixes npm packages that depend on `fs` module
    // if (!isServer) {
    //     config.node = {
    //         fs: 'empty'
    //     };
    // }
    return config;
}