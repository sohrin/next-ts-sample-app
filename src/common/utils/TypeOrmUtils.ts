// ■TypeORMの利用方法
// 「 npm install --save typeorm reflect-metadata 」の実行が必要
// ※DBごとの接続クライアントも必要。PostgreSQLの場合はpg
// ※デコレーター有効化のため以下の実施が必要（https://qiita.com/KuwaK/items/f40b151ceb6613da9161）
// [1]：npm install --save-dev @babel/plugin-proposal-class-properties @babel/plugin-proposal-decorators
// [2]：/.babelrc　を追加（プリセット設定、とnpm installした2プラグインの設定）
// [3]：tsconfig.jsonのcompilerOptionsにexperimentalDecoratorsとemitDecoratorMetadataのtueを設定
import { Connection, createConnection } from 'typeorm';
import TestModel01 from "../../entities/TestModel01";

// ormconfig.jsonを環境ごとに用意（例：ormconfig.local.json）する方法は
// entityの指定方法がまずいのかRepositoryNotFoundErrorが出て解決できなかった
// 一旦、ソース内で環境変数により設定値を切り替えることにした。
// TODO: 環境変数切り出し（Next.jsで環境変数を利用するためにdotenvは必要ない：https://qiita.com/matamatanot/items/1c8f1c1e21664591c220）
export default class TypeOrmUtils {

    static connection: Promise<Connection>;

    static async getTypeOrmConnection() {
        if (this.connection == null) {
            this.connection = createConnection({
                "name": "default",
                "type": "postgres",
                "host": "localhost",
                "port": 5432,
                "username": "appuser",
                "password": "apppass",
                "database": "appdb",
                "synchronize": false,
                "logging": true,
                "entities": [TestModel01],
                "cli": {
                    "entitiesDir": "dist/entities"
                }
            });
        }
        return this.connection;
    }
}