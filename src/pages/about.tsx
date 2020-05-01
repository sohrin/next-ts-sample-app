import React from "react";
import Link from 'next/link'
// MEMO: この方法だとwasmが使えない（https://github.com/rustwasm/wasm-bindgen/issues/700#issuecomment-412847065）
//import * as wasm from "rust-wasm-pack";
//wasm.greet();

export default class About extends React.Component {
  static async getInitialProps() {
    console.info("About.getInitialProps() BEGIN.")
    return {}
  }
  onClickMethod = () => {
    console.info("About#onClickMethod() BEGIN.")
    alert("ボタン押下処理!");
  }
  execWasm = () => {
    console.info("About#execWasm() BEGIN.")
    import('rust-wasm-pack').then(wasm => wasm.greet())
  }
  render() {
    return (
      <>
        <h1>My blog post</h1>
        <p><Link href="/"><a>Back To Home</a></Link></p>
        <p><Link href="#"><a onClick={this.onClickMethod}>ボタン押下処理</a></Link></p>
        <p><Link href="#"><a onClick={this.execWasm}>ボタン押下処理(WebAssembly)</a></Link></p>
      </>
    )
  }
}