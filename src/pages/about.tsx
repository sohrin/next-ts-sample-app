import React from "react";
import Link from 'next/link'

export default class About extends React.Component {
  static async getInitialProps() {
    console.info("About.getInitialProps() BEGIN.")
    return {}
  }
  onClickMethod = () => {
    console.info("About#onClickMethod() BEGIN.")
  }
  render() {
    return (
      <>
        <h1>My blog post</h1>
        <p><Link href="/"><a>Back To Home</a></Link></p>
        <p><Link href="#"><a onClick={this.onClickMethod}>ボタン押下処理</a></Link></p>
      </>
    )
  }
}