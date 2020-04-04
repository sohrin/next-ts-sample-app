import React from "react";
// 「 npm install --save isomorphic-unfetch 」の実行が必要
import fetch from 'isomorphic-unfetch';
import TypeOrmUtils from "../common/utils/TypeOrmUtils";
import TestModel01 from "../entities/TestModel01";

// // pagesとしての最低限の記述
// const Home = () => <h1>Hello world!!!</h1>;
// export default Home;

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

/*
    // 注意" これがtrueだと、モデル定義を変更すると即DB反映されます。
    // 個人PJならいいですが、普通はmigrationファイルで世代管理すると思うのでfalseにします。
    synchronize: false,

    entities: [TestModel01], // TODO: 後で["src/entities/*.ts"],等に変更
    // "migrations": ["src/db/migrations/*.ts"],
    // "subscribers": ["src/db/subscribers/*.ts"],
    // "cli": {
    //   "entitiesDir": "src/entities",
    //   "migrationsDir": "src/db/migrations",
    //   "subscribersDir": "src/db/subscribers"
    // }
*/

async function dbAccessTest() {
  // コネクション取得
  let con = await TypeOrmUtils.getTypeOrmConnection();

  // DBの構造を初期化
  // await con.synchronize();

  // テーブルアクセス用インスタンスの取得
  const testModel01Repo = con.getRepository(TestModel01);
  //テーブルへ挿入
  await testModel01Repo.insert({ name: "あいうえお" });
  await testModel01Repo.insert({ name: "かきくけこ" });
  //データの取得と表示
  const testValue01 = await testModel01Repo.find();
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