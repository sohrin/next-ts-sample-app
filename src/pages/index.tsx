import React from "react";
import Link from 'next/link'
// 「 npm install --save isomorphic-unfetch 」の実行が必要
import fetch from 'isomorphic-unfetch';
//import FormData from 'form-data'
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

  // テーブルへ挿入
  await testModel01Repo.insert({ name: "あいうえお" });
  await testModel01Repo.insert({ name: "かきくけこ" });

  //データの取得と表示
  const testValue01List = await testModel01Repo.find();
  console.log("[出力結果]\n%s",JSON.stringify(testValue01List, null, "  "));
  await con.close();
}

/*
static async getInitialProps()は下記のタイミングで呼ばれる。
基本的には、サーバーサイド・クライアントサイド、どちらの環境でも動作するコードにする必要がある。
1: サーバーサイドレンダリングでReactコンポーネントをレンダリングする時
2: Next.jsのルーター経由でこのページにアクセスした時
*/
export default class Home extends React.Component<HomeProps, {}> {

    static async getInitialProps({ Component, router, ctx, req }) {
        try {
          let backendUrl;
// TODO: ポート番号も環境変数化する？
console.log(process.env.BACKEND_HOSTNAME);
let backendUrlSsr = "http://" + process.env.BACKEND_HOSTNAME + ":8080";
let backendUrlBrower = "http://" + process.env.BACKEND_HOSTNAME_AND_PORT;
console.log(backendUrlSsr);
console.log(backendUrlBrower);
          if (req) {
            console.log("■■■■■SSR getInitialProps() BEGIN.");
            backendUrl = backendUrlSsr;
          } else {
            console.log("■■■■■browser getInitialProps() BEGIN.");
            backendUrl = backendUrlBrower;
          }
          // TypeScriptのAPIからデータを取得
          // ※Next.jsのAPIの動作確認用コード。
          //   SSRでは動くが、ブラウザ側ではホスト部分が見つからずエラーとなる。
//          const nextJsApiResponse = await fetch('http://localhost:3000/backend-api/sample')
//          const nextJsApiResponseData = await nextJsApiResponse.json()
//          console.log(nextJsApiResponseData);
          
          // PostgreSQL接続お試し
          // ※TypeORMの動作確認用コード。
          //   SSRでは動くが、ブラウザ側ではホスト部分が見つからずエラーとなる。
//          dbAccessTest();
          
          // Spring BootのAPIからデータを取得
          // ※DBアクセスはバックエンドAPIを経由して行うこととする。その方式であればSSRでもブラウザでも動く。
          // 1件INSERT
         // TODO: await fetch呼び出し箇所のメソッド切り出し
          let date = new Date();
          let obj = new TestModel01();
          obj.id = date.getTime();
          obj.name = String(obj.id) + "getInitialProps_" + backendUrl;

//          let formData = new FormData()
//          formData.append('id', String(date.getTime()));
//          formData.append('name', date.toString());
          await fetch(backendUrl + "/backend-api/sample/add", {
            method: 'post',
            headers: {
              'content-type': 'application/json',
              'Accept': 'application/json'
            },
//            body: JSON.stringify('{"id": "' + String(date.getTime()) + '", "name": "' + date.toString() + '"}')
            body : JSON.stringify(obj)
          })
          // 全件SELECT
          console.log("■getAllUrl: " + backendUrl + "/backend-api/sample/getAll");
          const springBootApiResponse = await fetch(backendUrl + "/backend-api/sample/getAll")
          const springBootApiResponseData = await springBootApiResponse.json()
          console.log(springBootApiResponseData);
          
          // ここで return したデータがPropsとしてコンポーネントに渡されてくる。
          return {
              "posts": [
                {
                  key: "key_value",
//                  title: nextJsApiResponseData.message
                  title: JSON.stringify(springBootApiResponseData)
                }
              ]
            }
        } catch(e) {
          console.log(e)
    
          // エラーが発生した時に返すデータ。
          return {"posts": []}
        } finally {
          console.log("■■■■■SSR/browser getInitialProps() END.");
        }
      }

localApiCallTest() {
  console.log("localApiCallTest begin.")
  let date = new Date();
  let obj = new TestModel01();
  obj.id = date.getTime();
  obj.name = String(obj.id) + "_local";
// TODO: ポート番号も環境変数化する？
let backendUrlSsr = "http://" + process.env.BACKEND_HOSTNAME + ":8080";
let backendUrlBrower = "http://" + process.env.BACKEND_HOSTNAME_AND_PORT;
//          let formData = new FormData()
//          formData.append('id', String(date.getTime()));
//          formData.append('name', date.toString());
  fetch(backendUrlBrower + "/backend-api/sample/add", {
    method: 'post',
    headers: {
      'content-type': 'application/json',
      'Accept': 'application/json'
    },
//            body: JSON.stringify('{"id": "' + String(date.getTime()) + '", "name": "' + date.toString() + '"}')
    body : JSON.stringify(obj)
  })
  console.log("localApiCallTest end.")
}

    // getInitialProps()で返した値がコンポーネントにPropsとして渡されてくる。
    // サーバーサイドおよび、クライアントサイドで取得したデータをもとにレンダリング。
    render () {
        return (
          <ul>
            <h1>Hello world!!!</h1>
            <p><a href="/static.html">staticフォルダのhtmlへ遷移</a></p>
            {this.props.posts.map((post) => <li key={post.key}>{post.title}</li>)}
            <Link href="/about">
              <a>About Us</a>
            </Link>
            <Link href="">
              {/* TODO: onClick処理を実行する時にSSR時のSELECT結果が消える件 */}
              <a onClick={this.localApiCallTest}>ボタン押下処理</a>
            </Link>
          </ul>
        )
    }
}