import React from "react";
import Link from 'next/link'

// MEMO: npm install pixi.js @inlet/react-pixi --save
//       pixi.jsをインストールしていないとエラーが発生する。
// https://reactpixi.org/
import { Stage, Sprite } from '@inlet/react-pixi';

export default class Chord extends React.Component {
  state = {
    isClient: false,
  };

  // MEMO: React.jsでwindowやdocumentやjQueryのイベントを使う方法：https://jmatsuzaki.com/archives/17484
  componentDidMount(){
    console.info("Chord.componentDidMount() BEGIN.");
    this.setState({
      isClient: true,
    });
  }
  static async getInitialProps() {
    console.info("Chord.getInitialProps() BEGIN.");
    return {}
  }
  render() {
    const { isClient } = this.state;
    if (!isClient) {
      console.info("do not render");
      return false;
    }
    console.info("do render");
    return (
      <>
        <h1>コード表</h1>
        <Stage>
          {/* TODO: ①プロジェクト内の画像が表示されない。URLは表示できる。②APNGやアニメgifが動かない。http://ics-web.jp/lab-data/140930_apng/sample1/ */}
          <Sprite image="http://ics-web.jp/lab-data/140930_apng/images/elephant_apng_zopfli.png" x={100} y={100} />
        </Stage>
        <p><Link href="/"><a>Back To Home</a></Link></p>
      </>
    )
  }
}