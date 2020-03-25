import React from "react";
// 「 npm install --save unfetch 」の実行が必要
import fetch from 'isomorphic-unfetch'

//const Home = () => <h1>Hello world!!!</h1>;
//export default Home;

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

    /*
    getInitialProps()で返した値がコンポーネントにPropsとして渡されてくる。
    サーバーサイドおよび、クライアントサイドで取得したデータをもとにレンダリング。
    */
    render () {
        return (
          <ul>
            <h1>Hello world!!!</h1>
            {this.props.posts.map((post) => <li key={post.key}>{post.title}</li>)}
          </ul>
        )
    }
}