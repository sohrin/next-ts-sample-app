import React from "react";
// 「 npm install --save isomorphic-unfetch 」の実行が必要
import fetch from 'isomorphic-unfetch'
// 「 npm install --save typeorm reflect-metadata 」の実行が必要
// ※DBごとの接続クライアントも必要。PostgreSQLの場合はpg
// ※デコレーター有効化のため以下の実施が必要（https://qiita.com/KuwaK/items/f40b151ceb6613da9161）
// [1]：npm install --save-dev @babel/plugin-proposal-class-properties @babel/plugin-proposal-decorators
// [2]：/.babelrc　を追加（プリセット設定、とnpm installした2プラグインの設定）
// [3]：tsconfig.jsonのcompilerOptionsにexperimentalDecoratorsとemitDecoratorMetadataのtueを設定
import * as typeorm from "typeorm";

// // pagesとしての最低限の記述
// const Home = () => <h1>Hello world!!!</h1>;
// export default Home;

/**
 *データ構造の定義
 *
 * @export
 * @class TestModel01
 */
@typeorm.Entity()
// MEMO: テーブル名はクラス名のロワースネークケースとなる。指定も可能。
export class TestModel01 {
  // 自動番号
  @typeorm.PrimaryGeneratedColumn()
  id!: number;
  
  // TODO: Column引数未指定だとエラーが出た
  @typeorm.Column('text', {nullable:true}) //一般データ
  name?: string;

  // TODO: Column第一引数'timestamp'未指定だとエラーが出た
  @typeorm.Column('timestamp',{
    default: () => "CURRENT_TIMESTAMP"
  }) // default値の指定:()=>"命令" でCURRENT_TIMESTAMPが文字列にならないように設定
  date!: Date;
}

class Post {
  key: string;
  title: string;
}

// Reactのチュートリアルで Property 'value' does not exist on type 'IntrinsicAttributes ... エラー
// http://itexplorer.hateblo.jp/entry/20170715-react-tutorial-intrinsic-attributes-error
interface HomeProps {
  posts: Post[];
}

console.log("test3")

/**
 *非同期主処理
 *
 */
async function dbAccessTest() {
  // DBへ接続
  // TODO: 環境によって異なる箇所のため設定切り出しが必要
  const con = await typeorm.createConnection({
    type: "postgres",
    // TODO: ローカルとfargateの値切り替え（127.0.0.1がFargate用）
//    host: "127.0.0.1",
    host: "postgres",
    port: 5432,
    username: "appuser",
    password: "apppass",
    database: `appdb`,
    // 注意" これがtrueだと、モデル定義を変更すると即DB反映されます。
    // 個人PJならいいですが、普通はmigrationファイルで世代管理すると思うのでfalseにします。
    synchronize: false,
    logging: true,
    entities: [TestModel01], // TODO: 後で["src/entities/**/*.ts"],等に変更
    // "migrations": ["src/db/migrations/**/*.ts"],
    // "subscribers": ["src/db/subscribers/**/*.ts"],
    // "cli": {
    //   "entitiesDir": "src/entities",
    //   "migrationsDir": "src/db/migrations",
    //   "subscribersDir": "src/db/subscribers"
    // }
  });
  //DBの構造を初期化
//  await con.synchronize();
  //テーブルアクセス用インスタンスの取得
  const testModel01 = con.getRepository(TestModel01);
  //テーブルへ挿入
  await testModel01.insert({ name: "あいうえお" });
  await testModel01.insert({ name: "かきくけこ" });
  //データの取得と表示
  const testValue01 = await testModel01.find();
  console.log("[出力結果]\n%s",JSON.stringify(testValue01,null , "  "));
  await con.close();
}

/*
static async getInitialProps()は下記のタイミングで呼ばれる。
基本的には、サーバーサイド・クライアントサイド、どちらの環境でも動作するコードにする必要がある。
1: サーバーサイドレンダリングでReactコンポーネントをレンダリングする時
2: Next.jsのルーター経由でこのページにアクセスした時
*/
export default class Home extends React.Component<HomeProps, {}> {

    static async getInitialProps({ Component, router, ctx }) {
        try {
          // 外部APIサーバーからデータを取得。
          console.log("test1")
          const res = await fetch('http://localhost:3000/api/sample')
          console.log("test2")
          const resData = await res.json()
          // 例: [{"title": "Next.jsでアプリをつくってみた"}, {"title": "workbox-swをためす"}]


          // PostgreSQL接続お試し
          dbAccessTest();
          
          // ここで return したデータがPropsとしてコンポーネントに渡されてくる。
          return {
              "posts": [
                {
                  key: "key_value",
                  title: resData.message
                }
              ]
            }
        } catch(e) {
          console.log(e)
    
          // エラーが発生した時に返すデータ。
          return {"posts": []}
        }
      }

    // getInitialProps()で返した値がコンポーネントにPropsとして渡されてくる。
    // サーバーサイドおよび、クライアントサイドで取得したデータをもとにレンダリング。
    render () {
        return (
          <ul>
            <h1>Hello world!!!</h1>
            <p><a href="/static.html">staticフォルダのhtmlへ遷移</a></p>
            {this.props.posts.map((post) => <li key={post.key}>{post.title}</li>)}
          </ul>
        )
    }
}