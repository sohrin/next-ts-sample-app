# next-ts-sample-app
Next.js(TypeScript)のサンプルプロジェクトです。

# memo
* vscodeでMarkdownをプレビュー：［Ctrl］＋［K］→［V］

## 必須インストール（フロントエンド）
1. Node.js
2. Visual Studio Code（以降vscodeと記載）

## 必須インストール（バックエンド）
1. OpenJDK14
- （参考）Windows 版 OpenJDK インストール手順：https://qiita.com/ryo-sato/items/87d05021fcc0519e8828
2. Kotlin 1.3.71
    1. コマンドプロンプト上でkotlincコマンドを実行できるようにする
        - ダウンロードファイル：https://github.com/JetBrains/kotlin/releases/tag/v1.3.71
        - （参考）Kotlinのコマンドライン実行：https://qiita.com/forests-k/items/bdb759f6fb4e9ff11e60
        - （参考）KotlinをVS Codeでやってみようと思ったらKotlinの実行時にハマった：https://qiita.com/kuroyakov/items/8c70cb1d490aa2787d3e
    2. vscodeにKotlin実行用の拡張機能として「Kotlin」、「Kotlin Language」、「Code Runner」、「Kotlin Debugger」をインストールし、vscode上でHello Worldなktファイルをコーディングし、「右クリック＞Run Code」でKotlinコードを実行できるようにする。
        - （参考）Kotlin(SDKMAN!) + VS Code + Ubuntu 18.04での実行環境作成：https://symfoware.blog.fc2.com/blog-entry-2433.html
        - （参考）Code Runnerで文字化け #VS Code 02：https://ymdevx3.hatenablog.com/entry/2019/08/26/012020
3. vscode上でSpring Bootを動作させる環境
    1. 拡張機能「Java Extension Pack」、「Spring Boot Extension Pack」、「Gradle Language Support」をインストールする。
        - （参考）VS Code + Spring Boot + Maven + JPA + H2 で最速 Web API 環境の構築（Step1）：https://qiita.com/euledge/items/ce3e24a2b8020441cd85
        - （参考）環境構築(VSCode + kotlin + spring boot + Gradvle)：https://qiita.com/miro108/items/43cf6878eff70830a0c9 
        - （参考）VSCodeでGradleを使い、Javaをビルド→ランするまで：https://qiita.com/yhayashi30/items/910a79da8b7c7fe7872e
    2. 【Windowsの場合】「gradlew.bat build」、「gradlew.bat bootRun」を実行し、SpringBootアプリが起動することを確認する（2020-04-05時点ではGradle 6.3が動く）。
        - （参考）Spring Boot + PostgreSQLの設定方法：https://qiita.com/k0uhashi/items/55cbb88fd0d1b8ae4721
    3. 「Terminal＞Run task...＞bootRun＞Continue without scanning thw task output」

## 任意インストール（両方）
1. PostgreSQL（docker-compose起動時は不要）

## 環境構築手順
### チェックアウト
    cd 作業ディレクトリ
    git clone https://github.com/sohrin/next-ts-sample-app.git
    npm install

### ローカル起動（npm、開発）
    cd 作業ディレクトリ/next-ts-sample-app
    npm run dev
- ローカルに別途PostgreSQLをインストールし、PostgreSQLに対しては next-ts-sample-app/docker/postgres/docker-entrypoint-initdb.d/ にあるDDL、DMLを実行しておく必要があります。

### ローカル起動（docker-compose）
    cd 作業ディレクトリ/next-ts-sample-app
    docker-compose build --no-cache
    docker-compose up -d
- dockerコマンド、docker-composeコマンドが動作する環境が必要です。
- PostgreSQLコンテナも起動するため、ローカルに別途PostgreSQLをインストールする必要はありません。

## ローカル起動後の動作確認
### フロントエンド（Next.js）
- http://localhost:3000/ にアクセスし、ブラウザに画面が表示され、コンソールにSELECT結果が表示されれば開発準備OK。

### フロントエンド（Spring Boot(Kotlin)）
- http://localhost:8080/samples にアクセスし、ブラウザにjsonが表示されれば開発準備OK。

## デプロイ（Fargate）
- 後日整理

## ディレクトリ構成／重要なファイル等
- 後日整理

## トラブルシューティングメモ
- .dockerignoreファイルのコメント中に日本語があると、ファイルがUTF-8でも文字コードエラーが発生する。

## TODO
- 4/6に間違えて端末時間を変更してPUSHした4/20のコミットログを消したい（内容は無かったことにしたくない）。以下を実行したが、4/6で改めてコミット・プッシュされた後、4/20分も残っている
https://blog.zzzmisa.com/git_commit_date/
https://qiita.com/snct_hu/items/971d512c26dd8b3a3b3c


## その他メモ
- mdファイルのプレビュー(vscode)：ctrl + k -> v
- マークダウンのチートシート：https://gist.github.com/mignonstyle/083c9e1651d7734f84c99b8cf49d57fa
- Windows10でRustの開発環境を構築：https://qiita.com/euledge/items/ce3e24a2b8020441cd85
    - Visual C++ Build Tools のインストール
    - Rustupのインストール


- https://keens.github.io/blog/2015/11/29/rustdechiisanatsu_ruwotsukuttemiru_kouhen_/
- https://slides.com/ryusukefuda/rust-web-service/fullscreen#/8
- https://sinsoku.hatenablog.com/entry/2019/10/28/024527
- https://www.yo1000.com/rust-sql/
- https://qiita.com/kenmaro/items/652204a7afd7c870b7db


## メモ書き

・コマンドパレッドに"spring initializr:generate a gradle project"を入力後の選択内容
Kotlin
com.sanyu_i.sisdiv3.n_study.ntsa
kotlin-backend
2.2.6
 Spring Boot Devtools
 Spring Web
 Mybatis Framework
 PostgreSQL Driver
 Spring Boot Actuator

・Gradleタスク追加手順
「Terminal＞Configure Tasks...＞Create tasks.json file from template＞Others」でtasks.jsonができる。以下の内容に書き換えた。
VSCodeでGradleを使い、Javaをビルド→ランするまで
https://qiita.com/yhayashi30/items/910a79da8b7c7fe7872e
※コマンドに「cd kotlin-backend && 」を追加し、「./gradlew」は「gradlew」に書き換えた

・Kotlin × Spring Boot で REST API サンプルアプリケーション作ってみた。
https://qiita.com/yusuke_dev/items/79c980ff7002d68f9aa5
※一部実施

・３０分で覚えるKotlin文法
https://qiita.com/k5n/items/cc0377b75d8537ef8a85

・Kotlin のコレクション使い方メモ
https://qiita.com/opengl-8080/items/36351dca891b6d9c9687

・Spring Boot (Kotlin) はじめの一歩
https://qiita.com/Yuki10/items/aef152f300a500b85725
※未実施

・Kotlin with Spring Boot 2.0で簡単なRest APIを実装する
https://qiita.com/rubytomato@github/items/daa723db5deffc908df7
※未実施

・Kotlin + Spring BootでDBキャッシュをRedisでやってみる
https://qiita.com/syumiwohossu/items/3139e14ca995027c8fdf



## メモ書き（Rust）

・Windows10でRustの開発環境を構築
https://qiita.com/euledge/items/ce3e24a2b8020441cd85

・[Rust]Actixインストール手順
https://qiita.com/taichikanaya_1989/items/1dbc456278e8fe5b0996

・diesel
https://qiita.com/techno-tanoC/items/4ca564bd1ea8db409496
https://qiita.com/kenmaro/items/652204a7afd7c870b7db
https://qiita.com/AtsukiTak/items/568304c528c17fc6d10b

・[Rust] WebAssemblyを用いたウェブフロントエンド開発入門
https://qiita.com/osanshouo/items/40f087cc79a1446ad7ef


## この設定いる？
・vscodeにJavaHomeの設定「ファイル＞基本設定（Preferences）＞設定（Settings）」で「JAVA_HOME」を検索するとsettings.jsonを開く事ができる。
    "java.home": "C:\\_dev\\dev_env\\jdk-14",
    "files.exclude": {
        "**/.classpath": true,
        "**/.project": true,
        "**/.settings": true,
        "**/.factorypath": true
    }
→Javaは自動コンパイルが効くようになった。Kotlinは？

↓Kotlin拡張の説明を参考に以下launch.jsonを追加したタイミングか、JAVA_HOMEを有効にしたタイミングで、自動コンパイルが効くようになった。

{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "kotlin",
            "request": "launch",
            "name": "Kotlin Launch",
            "projectRoot": "${workspaceFolder}",
            "mainClass": "path.to.your.MainClassKt"
        }
    ]
}


・Cannot inline bytecode built with JVM target 1.8 into bytecode that is being built with JVM target 1.6. Please specify proper ‘-jvm-target’ option
https://qiita.com/kph7mgb/items/28ee37957976e80e38f2
vscodeでも、「ctrl + ,」でKotlinを検索したら↑の設定が出てくるので、defaultを1.8にしたらエラーがでなくなった。

・【グッバイEclipse】VSCodeでJavaの開発環境を構築するための設定方法【import保管やデバッグ確認まで出来ちゃう】
https://blogenist.jp/2019/11/06/9687/#import

・「Visual Studio Code デバッグ技術」読んだ
https://cormorant.hatenablog.com/entry/2018/04/29/002150

・Spring Bootの開発はVS CodeをメインにしてSTSをサブにするのが最強じゃね？
https://www.aruse.net/entry/2019/07/28/112144
※dashboardでサブディレクトリのSpring Bootを起動する方法は？？？





■TODO
・SPRING-BOOT DASHBOARDでどうやって起動する？
・デバッグ起動方法（ひとまずkotlin側にlaunch.jsonを追加してみたが、ターミナルで以下で止まる）
d9c76980 Building: 50% Copying resources to the output folder [504/1000]
VS Code + Spring Boot + Maven + JPA + H2 で最速 Web API 環境の構築（Step1）
http://kusamakura.hatenablog.com/entry/vscode_springboot_maven_jpa_h2_webapi_step1
https://stackoverflow.com/questions/59357618/how-to-set-kotlin-debug-launch-json-configurations-in-vs-code
https://stackoverflow.com/questions/4686364/eclipse-hangs-when-building-project-copying-resources-to-output-folder
https://qiita.com/chakimar/items/39937cf39d2069758c83
https://qiita.com/miro108/items/43cf6878eff70830a0c9
https://www.aruse.net/entry/2019/07/28/112144
https://auth0.com/blog/jp-vuejs-spring-boot-kotlin-and-graphql-building-modern-apps-part-1/
https://qiita.com/ikemura23/items/1746facbb243c8b5eca3
https://qiita.com/omochimetaru/items/98e015b0b694dd97f323
https://qiita.com/ikatechx/items/02c706755619a08353bc
https://akiko-pusu.github.io/kotlin-study/2017/04/25/vscode-setting.html



・boot-java change-detectionをonに設定
→いる？？？



・jib を使って Java アプリケーションを超簡単にコンテナ化！
https://www.isoroot.jp/blog/1744/

※spring、Run taskで起動するだけなら、Kotlinコンパイラインストールと拡張機能「Kotlin」、「Kotlin Language」だけでいけた。

※（4/6）自宅で出てたエラーは会社では出ず。

※Run task、一度コマンドプロンプトを立ち上げて実行してあげないと動かないことがある（例：gradlew jibDockerBuild）


・package.jsonで環境変数(NODE_ENV)を設定するとき、WindowsでもLinux,Macでも動くようにする
https://qiita.com/riversun/items/d45b26f4a7aad6e51b69
https://nextjs.org/docs#manual-setup
https://stackoverflow.com/questions/60880050/env-with-next-js-on-local
https://github.com/motdotla/dotenv

・なぜNext.jsを採用するのか？
https://mottox2.com/posts/429

・プログラム内でdotenvを読み込むのをやめた話
https://blog.leko.jp/post/you-might-not-need-dotenv-in-source/

・最近っぽいnext.jsの設定
https://qiita.com/numa999/items/aef01affdb25bbaa3290

・イマドキのJavaScriptの書き方2018
https://qiita.com/shibukawa/items/19ab5c381bbb2e09d0d9
※以下を実施
文字列テンプレートリテラル
アロー関数
Promise
デフォルト引数
thisを操作するコードは書かない
ループはfor ... ofを使う
辞書・ハッシュ用途はオブジェクトではなくてMapを使う
分割代入（Destructuring Assignment）
スプレッド演算子



■TODO（Swagger）
・Swaggerの概要をまとめてみた。
https://qiita.com/gcyata/items/342073fa7607fd4082bd

・Kotlin + Spring BootでREST APIを作ってみる
https://qiita.com/ARBALEST000/items/0e0ef5074ae110120ac7

・初心者がGoでTODOアプリ用のREST API serverを作った話
https://qiita.com/katuo0011/items/bc2e1929fde394da8579
※Swaggerのdocker-compose記述がある


■TODO（vscode＋Spring Boot）
・Spring Boot in Visual Studio Code
https://code.visualstudio.com/docs/java/java-spring-boot



■vscodeメモ
・Java開発環境をVisual Studio Code で整える
https://solutionware.jp/blog/2018/06/01/java%E9%96%8B%E7%99%BA%E7%92%B0%E5%A2%83%E3%82%92visual-studio-code-%E3%81%A7%E6%95%B4%E3%81%88%E3%82%8B/

・【グッバイNetBeans】VSCodeでSpringBootの開発環境を構築するための設定方法【ホットリロードやデバッグにも対応】
https://blogenist.jp/2019/11/08/9757/



■TypeScriptメモ
・今更聞けない JSX のコメントアウトの構文
https://qiita.com/naoiwata/items/c590667765143c41d87a



■Kotlinメモ
・Kotlin で RESTful API を開発する
https://auth0.com/blog/jp-developing-restful-apis-with-kotlin/

・基本の型（公式ドキュメント）
https://dogwood008.github.io/kotlin-web-site-ja/docs/reference/basic-types.html
※基本型も、Int等、頭が大文字になっている

・関数（公式ドキュメント）
https://dogwood008.github.io/kotlin-web-site-ja/docs/reference/functions.html
※引数の定義の記法が少し異なる

・Kotlinのいいところ/Data Class
http://blog.techfirm.co.jp/2015/10/21/kotlin%E3%81%AE%E3%81%84%E3%81%84%E3%81%A8%E3%81%93%E3%82%8Ddata-class/

・KotlinでLoggerの生成を少し楽にした
https://qiita.com/mumei_himazin/items/df94b3bc9c6112a4125e

・Kotlinにおける継承、オーバーライド、抽象クラス、インタフェースとスマートキャスト
https://www.atmarkit.co.jp/ait/articles/1804/24/news008.html

・Kotlinでのnullの基本的な扱いかた
https://re-engines.com/2018/11/01/3088/




■Spring Bootメモ
・Spring FrameworkのControllerの基本的なアノテーション
https://morizyun.github.io/java/spring-framework-controller-annotation.html

・mybatisでstring型を動的パラメータ（${ }）で渡そうとしたらエラー　MyBatisSystemException
https://ito-u-oti.com/post-270/

・Spring Bootでログを出力する
https://dev.classmethod.jp/articles/spring-boot_log_output/

・Java Spring Boot JSONの送信と受信のサンプル
https://itsakura.com/java-springboot-json

・Springの@PropertySourceと@Valueをつかってみる
https://qiita.com/toshiro3/items/56a4d03658d31ef1f939



■CORS
・Spring MVC で CORS 設定
https://qiita.com/m_kikuchi/items/df8c070b228df44a5462
→いったんこちらを採用

・Spring Boot のCORS対策
https://ti-tomo-knowledge.hatenablog.com/entry/2019/12/15/200327







■Gradle
・Gradle の compile, api, implementation とかについて
https://qiita.com/opengl-8080/items/6ad642e0b016465891de




■問題解決
・How to make request body type compatible with RequestInit or BodyInit when using node-fetch?
https://stackoverflow.com/questions/43997163/how-to-make-request-body-type-compatible-with-requestinit-or-bodyinit-when-using

・React Native fetch “unsupported BodyInit type”
https://stackoverflow.com/questions/39056125/react-native-fetch-unsupported-bodyinit-type

・Springbootで「application/x-www-form-urlencoded」形式のリクエストを送る＆受け取る
https://qiita.com/rhirabay/items/776394ceeca09b5f9670

・コンテンツタイプがapplication / x-www-form-urlencodedのHTTP PostリクエストがSpringで機能しない
https://www.it-swarm.dev/ja/java/%E3%82%B3%E3%83%B3%E3%83%86%E3%83%B3%E3%83%84%E3%82%BF%E3%82%A4%E3%83%97%E3%81%8Capplication-xwwwformurlencoded%E3%81%AEhttp-post%E3%83%AA%E3%82%AF%E3%82%A8%E3%82%B9%E3%83%88%E3%81%8Cspring%E3%81%A7%E6%A9%9F%E8%83%BD%E3%81%97%E3%81%AA%E3%81%84/822505317/

・mybatisでstring型を動的パラメータ（${ }）で渡そうとしたらエラー　MyBatisSystemException
https://ito-u-oti.com/post-270/




■docker-composeメモ
・docker-compose.ymlで.envファイルに定義した環境変数を使う
https://kitigai.hatenablog.com/entry/2019/05/08/003000




■その他
・Spring Boot + Amazon Cognito OAuth 2.0 / JWT
https://gofore.com/en/spring-boot/
※まずはAuth0からでもいいかも・・・
※書籍「AWSによるサーバーレスアーキテクチャ」が参考になりそう。

・Kotlin で RESTful API を開発する（Auth0公式ドキュメント）
https://auth0.com/blog/jp-developing-restful-apis-with-kotlin/

・oauth2_proxy と Auth0 を用いた Nginx のお手軽 OAuth 化
https://mikan.github.io/2018/05/23/enable-oauth-to-your-nginx-by-oauth2-proxy-and-auth0/

・Spring SecurityでOAuth2サーバを作ってみた
https://tmegos.hatenablog.jp/entry/spring-boot-spring-security-kotlin-oauth2


・Reactアプリにコード自動整形ツールのPrettierを導入する
https://dev.classmethod.jp/articles/introduce-prettier/


・フックの導入
https://ja.reactjs.org/docs/hooks-intro.html

・NEXT.jsとReact Hooksを使ってTodoアプリを10分で作る
https://qiita.com/hiraike32/items/71b14755f56208a8a133


・GraphQLの全体像とWebApp開発のこれから
https://qiita.com/saboyutaka/items/171f7382cdf75b67d076


■Serverless Framework
・Serverless Components はオレたちの未来を劇的にスケールさせるか
https://qiita.com/G-awa/items/04dec937925d2875d320

・Next.jsアプリをLambda@Edgeで超簡単にSSRできるserverless-next.jsのご紹介
https://qiita.com/fumiki/items/5f4408ce844520a922c2

・Lambda＠Edgeについてまとめる
https://dev.classmethod.jp/articles/lambda-edge-design-best-practices/

・Lambda@Edge活用例を紹介します - SPA編 -
https://tech.smartcamp.co.jp/entry/lambda-edge-spa




■Serverless
・Serverless Components公式
https://serverless.com/components/

・Nuxt.jsをServerlessでデプロイするにあたってぶつかった４つの壁
https://qiita.com/Karibash/items/358316e533c6a214b87b

・honerlaw / serverless-fargate-plugin
https://github.com/honerlaw/serverless-fargate-plugin

・serverless / examples
https://github.com/serverless/examples

・nathanpeck / aws-cloudformation-fargate
https://github.com/nathanpeck/aws-cloudformation-fargate

・TypeScript + Serverless + ORM + RoutingMiddlewareを探す旅
https://cloudpack.media/46011



■Cloudformation
・CloudformationでFargateを構築する
https://dev.classmethod.jp/articles/cloudformation-fargate/

・私的 CloudFormation ベストプラクティス
http://kizkoh.hatenablog.com/entry/2017/04/25/090000

・WordPressの大きなインフラをkumogataで作ったらめっちゃ楽だった話
https://www.slideshare.net/HidetakaOkamoto/wordpresskumogata

・【AWS】Stack is not required! CloudFormation支援ツール “kumogata” を試してみました
https://dev.classmethod.jp/articles/kumogata-tool-for-cloudformation/

・WordPressの大きなインフラをkumogataで作ったらめっちゃ楽だった話
https://www.slideshare.net/HidetakaOkamoto/wordpresskumogata

・kumogata / kumogata2
https://github.com/kumogata/kumogata2

・私はこれでJSONをやめました〜あるいはAWSの設定をコード化するとはどういうことか〜
https://www.slideshare.net/marcyterui/jsonaws

・【AWS】CloudFormationのベストプラクティスを読んで
http://yamano3201.hatenablog.jp/entry/2016/05/29/122238







■AWS CDK
・ソフトウェア開発者のためのAWS環境構築フレームワーク AWS Cloud Development Kit (CDK)
https://pages.awscloud.com/rs/112-TZM-766/images/B-3.pdf

・公式Getting Started
https://docs.aws.amazon.com/cdk/latest/guide/getting_started.html

・AWS CDK が GA! さっそく TypeScript でサーバーレスアプリケーションを構築するぜ【 Cloud Development Kit 】
https://dev.classmethod.jp/articles/aws-cdk-ga-serverless-application/

・Infrastructure as CodeのTips【Terraform/CDK/Cloudformation】
https://qiita.com/KsntsTt/items/5c4fe0d28b5bda698756

・AWS-CDK for TypeScriptで色んなサービスをデプロイする
https://qiita.com/is_ryo/items/f04e05768c91c21f3699

・AWS CDKを使えばTypeScriptでAWSインフラを定義できるらしい
https://qiita.com/ooooouchi/items/fbf9977c1a1ad47f5405

・AWS Cloud Development Kit(AWS CDK)でEC2インスタンスを立ち上げてみる
https://qiita.com/kai_kou/items/e35fd8c6af7dff9f2624

・AWS CDK を使って簡単に ECS(Fargate) 環境を構築する方法
https://qiita.com/ytanaka3/items/e755ff4551f01f76c303

・AWS CDKでのFargateデプロイ
https://qiita.com/nyasba/items/48bf95ee66794a608822

・AWS CDKを使ったAWS Fargate Serviceの構築
https://qiita.com/yacchin/items/e2c48984a3a68e77c3c5

・SAM meets CDK？
https://qiita.com/yhsmt/items/ebdb561e45c3cedf8f49

・AWSのインフラはプログラミングコードで構築！AWS Cloud Development Kit 入門
https://www.slideshare.net/AmazonWebServicesJapan/awsaws-cloud-development-kit






■Pulumi（WebホスティングなのでいったんはAWS CDKのほうがよさそう）
・PulumiにおけるServerlessアプリケーション開発
https://engineer.recruit-lifestyle.co.jp/techblog/2019-12-21-serverless-programming-by-pulumi/

・これが次世代プロビジョニングツールの実力か！？ PulumiでAWSリソースを作成してみた
https://dev.classmethod.jp/articles/pulumi-aws/








■Terraform
・Terraformで構築するAWS
https://y-ohgi.com/introduction-terraform/first/about/

・10分で理解するTerraform
https://qiita.com/Chanmoro/items/55bf0da3aaf37dc26f73

・TerraformとCodeDeployでイミュータブルなBlue/Greenデプロイ環境を構築する
https://dev.classmethod.jp/articles/immutable-blue-green-deployment-with-terraform-and-codedeploy/

・実環境にTerraform導入したら驚いた
https://www.slideshare.net/akuwano/terraform-47221901

・TerraformとAtlasとGitHubを使ってインフラを構築、自動化してみた話
https://techblog.zozo.com/entry/terraform

・Terraform + GitHub + CircleCI + Atlasを利用してAWSの操作を自動化した
https://blog.glidenote.com/blog/2015/02/18/terraform-github-circleci-atlas-aws/



■ECS
・EC2 Container Service(ECS)を管理して、Blue-Green Deploymentを実現するツールを書いた
https://blog.stormcat.io/post/entry/2015/07/22/130000/

・ecs-deployを使ったAmazon ECSへのデプロイの裏側
https://sandragon.hatenablog.com/entry/2019/04/14/211209

・ECS運用のノウハウ
https://qiita.com/naomichi-y/items/d933867127f27524686a

・Dockerコンテナデプロイサービスの比較 (Beanstalk Multi-container Docker/ECS)
https://qiita.com/naomichi-y/items/5830b851e8028b11cf4e

・


■素敵記事
・ロマサガRS䛾大規模負荷を処理するAmazon ECS & Docker運用知見
https://pages.awscloud.com/rs/112-TZM-766/images/I3-04.pdf
→fluentd、datadog、locust
→CloudFormation/kumogata、Terraform、Serverless Componentsのどれかに手を付けるか・・・
→負荷テスト
→ECSスケーリング
→デリバリーパイプライン
→サーバレスバッチ
→自動復旧



■その他
・大規模ゲーム開発で存在感を高めるErlang/Elixir ─ Nintendo Switch™とロマサガRSの事例から
https://employment.en-japan.com/engineerhub/entry/2019/08/01/103000

・ロマサガRS における Elixir サーバー開発実践 ~生産性を上げてゲームの面白さに注力~
https://speakerdeck.com/elixirfest/romasakars-niokeru-elixir-sahakai-fa-shi-jian-sheng-chan-xing-woshang-ketekemufalsemian-bai-sanizhu-li

・Twelve-Factor App
https://12factor.net/ja/

・AWSでサーバレスな定期バッチ環境を作るには結局どれ使えばいいの？（Lambda vs Fargate vs Batch）
https://qiita.com/kazuktym/items/0ecc1dbf98c3c3623473

・[Others] Infrastructure as Codeに疲れたので、僕たちが本来やりたかったことを整理する
https://jawsdays2019.jaws-ug.jp/session/1119/

・"are too open."がWindows 10 の ssh クライアントで表示される
http://tooljp.com/qa/ssh-are-too-open-error-2ED3.html

・Windows版VSCodeで秘密鍵の位置に関係なくSSHログインするには
https://qiita.com/mindwood/items/ddae674a0694402f22a6

・Windows10に於けるSSH公開鍵認証秘密鍵の置き場所
http://systemconcept.co.jp/blog/?p=1343

・



■AWSのネットワーク関連
・初めてAWSで環境構築した際に参考にしたページメモ
https://qiita.com/mt2/items/b39457b35210c7e856fc

・AWS勉強記録（ネットワーク構築-VPC-）
https://note.com/kawa1228/n/n62b231433668

・AWS習得編 Amazon Web Service 基礎からのネットワーク&サーバー構築 Chapter2
https://note.com/el93019205/n/n56c4c69150f1

・【AWS VPC入門】2.EC2/Internet Gateway/Route Table
https://qiita.com/_Yasuun_/items/fc6f401eeaf9a3cb7b2c

・AWS CDK入門としてネットワークリソースを作ってみた
https://dev.classmethod.jp/articles/aws-cdk-intro-nw/

・CloudFormationでVPCNetworkを作る
https://qiita.com/shinon_uk/items/13bfd0b5908d01829999

・ElasticIPが足りない場合の上限値変更方法
https://qiita.com/msyk_tym/items/e3bbed8d382d06a6a329

・AWSでEC2インスタンス作成してElasticIPを割り当てようとしたら怒られた話
https://qiita.com/C910/items/3c9706b051cb8607c203

・AWS CDKで、NATゲートウェイの数を抑制する
https://dev.classmethod.jp/articles/aws-cdk-no-natgw/

・AWS CDKなら、たった1行で高可用なVPCを構築できる
https://qiita.com/nasuvitz/items/b31a2b7b492082a949b6

・AWS CDKでつまづいたところ3選
https://tech.actindi.net/2019/12/13/115639



■AWS CDK参考サイト
・AWSCDKでVPCをデプロイする
https://qiita.com/is_ryo/items/66dfe6c4b6dda4bd1eeb

・AWS CDK が GA! さっそく TypeScript でサーバーレスアプリケーションを構築するぜ【 Cloud Development Kit 】
https://dev.classmethod.jp/articles/aws-cdk-ga-serverless-application/

・AWS Cloud Development Kit(AWS CDK)でEC2インスタンスを立ち上げてみる
https://qiita.com/kai_kou/items/e35fd8c6af7dff9f2624

・AWS Cloud Development Kit (AWS CDK) を使って VPC 環境と EC2 インスタンスを作る
https://qiita.com/ytabira/items/53f10f620befeb3d00b8

・AWS CDKとTypeScriptで環境構築
https://it-akumi.hatenablog.com/entry/2019/08/26/204310

・AWS CDK を使って簡単に ECS(Fargate) 環境を構築する方法
https://qiita.com/ytanaka3/items/e755ff4551f01f76c303

・How to add an Internet Gateway to a VPC using AWS CDK?
https://stackoverflow.com/questions/58812479/how-to-add-an-internet-gateway-to-a-vpc-using-aws-cdk

・AWS CDK と3つのテスト
https://qiita.com/it-akumi/items/df57cc5d28a3c7b50f3a

・AWS CDK と Typescript で EC2 を構築してみる。
https://qiita.com/go-go-megaman/items/e15cab5a2882d954f007
※CDK の認証とaws-mfa

・How to get instance ID of created EC2 instance
https://github.com/aws/aws-cdk/issues/3225

・Creating an AWS Fargate Service Using the AWS CDK
https://docs.aws.amazon.com/cdk/latest/guide/ecs_example.html

・AWS Fargate かんたんデプロイ選⼿権
https://pages.awscloud.com/rs/112-TZM-766/images/A-1.pdf

・AWS CDKを使ってECS(Fargate起動タイプ)を構築する
https://miyahara.hikaru.dev/posts/20191205/

・AWS CDK を使って簡単に ECS(Fargate) 環境を構築する方法
https://qiita.com/ytanaka3/items/e755ff4551f01f76c303

・ECS(Fargate)のServiceをCDKで構築・デプロイしてみた
https://dev.classmethod.jp/articles/ecs-deploy-using-cdk/


■JavaScript
・4歳娘「パパ、懐かしいJavaScript書いてるね！」
https://qiita.com/Yametaro/items/70e7878c5ea51788b643

・4歳娘「パパ、constしか使わないで？」
https://qiita.com/Yametaro/items/17f5a0434afa9b88c3b1







・その他サイト
https://dev.classmethod.jp/articles/aws-cdk-python-ec2/
https://www.skyarch.net/blog/?p=17254
https://www.techscore.com/blog/2019/12/18/aws-cdk/
https://dev.classmethod.jp/articles/aws-cdk-construct-explanation/
https://dev.classmethod.jp/articles/aws-cdk-getting-ecs/
https://qiita.com/nakaken0629/items/1dfbc5c0b72d01abdba6
https://cloudpack.media/48912
https://qiita.com/tyoshitake/items/c5176c0ef4de8d7cf5d8


■Gradle
・build.gradleからの環境変数の参照
http://horie1024.hatenablog.com/entry/2015/03/16/155309



■npm、yarn
・あなたがnpm installをしてはいけない時
https://qiita.com/jigengineer/items/2b15797b850179cb8be0

・npmから乗り換えてわかったYarnの4つのメリット
https://qiita.com/tonkotsuboy_com/items/0242928ab32794d11f76


■docker-compose
・Docker Composeでビルド時に任意のイメージ名を指定する方法
https://amaya382.hatenablog.jp/entry/2017/04/03/034002



■RDS
・【AWS】知識ゼロから理解するRDS超入門
https://miyabi-lab.space/blog/31





■kubernetes
・kubernetesのwindows環境構築
https://qiita.com/souenxx/items/db686e7df2e55f73a901

・Windows10にDocker for WindowsでKubernetesを使ってみる
https://qiita.com/tnagano1981/items/7a4a7410a2123edfaa23

・kompose を使って kubernetes 上で docker-compose してみる
https://hawksnowlog.blogspot.com/2018/03/kubernetes-with-kompose.html
※以下を実施
kompose convert -f docker-compose.yml
※以下を実施したが、kubernetesがbuildに対応していないため、buildイメージをDocker Repositoryに登録する必要がある
kompose up -f docker-compose.yml

・Docker ComposeからMinikube + Komposeに移行してみよう
https://qiita.com/progrhyme/items/116948c9fef37f3e995b

・


























■コマンドメモ
・初期インストール＆画面単体起動＆API単体起動
（npm run devで「EPERM: operation not permitted」エラーがでたので再クローンしたときの手順）
※Git for Windowsインストール
※Docker for Windowsインストール
※Open JDK11インストール
※Node.jsインストール
※PostgreSQLインストール（postgresコンテナの初期DDL・DMLを実施）// TODO: Flyway導入後はインストールのみでOK
git clone https://github.com/sohrin/next-ts-sample-app.git
cd next-ts-sample-app
npm install
npm run dev
set POSTGRES_HOSTNAME=localhost
cd kotlin-backend && gradlew bootRun

・AWS-CLIのMFA認証
aws-mfa
※MFAコードを入力

・ECRログイン（push用のaws ecr get-login）
aws ecr get-login --region ap-northeast-1
※実行して出力されるコマンドから「-e none」を削除したものを実行

・ECRリポジトリ作成（docker-compose push用）（ローカル用）※実行は一度でOK
※aws-mfaとaws ecr get-loginを済ませておくこと
aws --region ap-northeast-1 ecr create-repository --repository-name next-ts-sample-app_nginx_local
aws --region ap-northeast-1 ecr create-repository --repository-name next-ts-sample-app_express_local
aws --region ap-northeast-1 ecr create-repository --repository-name next-ts-sample-app_postgres_local
aws --region ap-northeast-1 ecr create-repository --repository-name next-ts-sample-app_kotlin-backend_local
aws --region ap-northeast-1 ecr create-repository --repository-name next-ts-sample-app_kotlin-backend_local_no_dockerized
※ECRリポジトリURL：XXXXXXXXXXXX.dkr.ecr.ap-northeast-1.amazonaws.com/【--repository-nameの指定値】


・docker-composeビルド・起動（ローカル用）※Windows用
set DOCKER_REGISTRY=XXXXXXXXXXXX.dkr.ecr.ap-northeast-1.amazonaws.com
set DOCKER_REPOSITORY_SUFFIX=_local
★★★ローカルでは以下の環境変数値は「コンテナPostgreSQL・・・postgres:55432」「ローカルインストールPostgreSQL・・・localhost:5432」の切り替えが必要★★★set POSTGRES_HOSTNAME=localhost
★★★RDSにローカルから繋ぐときも、環境変数POSTGRES_HOSTNAMEの値変更が必要。★★★set POSTGRES_HOSTNAME=【RDSエンドポイントの値】
★★★bootRun時、いくつか設定が必要な環境変数が存在している。整理すること（AWS_REGION等。jwt認証で必要になってる）★★★
set POSTGRES_HOSTNAME=postgres
set APP_DBNAME=appdb
set APP_USERNAME=appuser
set APP_PASSWORD=apppass
set AWS_ACCOUNT=XXXXXXXXXXXX
set AWS_REGION=ap-northeast-1
※npm起動・ローカルdocker-compose起動：ap-northeast-1_TetIaCkHg、
set USER_POOL_ID=ap-northeast-1_TetIaCkHg
cd kotlin-backend
※ECRにプッシュしない場合は「jibDockerBuild」★★★docker-composeはjibDockerBuild、kubernetesはjibの内容が使われることに注意
gradlew jibDockerBuild
※プロジェクト内のXXXXXXXXXXXXをAWSアカウント名に一括置換しておくこと（コミット時はXXXXXXXXXXXXに戻すこと）
docker-compose down && docker-compose build --no-cache && docker-compose up -d && docker-compose ps && docker-compose logs -f
※動作確認し問題ないことを確認
docker-compose down

・ECRリポジトリ作成（Fargate用）※実行は一度でOK
※aws-mfaとaws ecr get-loginを済ませておくこと
aws --region ap-northeast-1 ecr create-repository --repository-name next-ts-sample-app_nginx_ecs
aws --region ap-northeast-1 ecr create-repository --repository-name next-ts-sample-app_express_ecs
aws --region ap-northeast-1 ecr create-repository --repository-name next-ts-sample-app_postgres_ecs
aws --region ap-northeast-1 ecr create-repository --repository-name next-ts-sample-app_kotlin-backend_ecs
aws --region ap-northeast-1 ecr create-repository --repository-name next-ts-sample-app_kotlin-backend_ecs_no_dockerized
※ECRリポジトリURL：XXXXXXXXXXXX.dkr.ecr.ap-northeast-1.amazonaws.com/【--repository-nameの指定値】

・ECS用docker-composeビルド＆ECR登録＆ECSデプロイ
set DOCKER_REGISTRY=XXXXXXXXXXXX.dkr.ecr.ap-northeast-1.amazonaws.com
set DOCKER_REPOSITORY_SUFFIX=_ecs
set POSTGRES_HOSTNAME=next-ts-sample-app-database-test-1.cpscrlo9cjxa.ap-northeast-1.rds.amazonaws.com
set APP_DBNAME=appdb
set APP_USERNAME=appuser
set APP_PASSWORD=apppass
set AWS_ACCOUNT=XXXXXXXXXXXX
set AWS_REGION=ap-northeast-1
※npm起動・ローカルdocker-compose起動：ap-northeast-1_TetIaCkHg、
set USER_POOL_ID=ap-northeast-1_TetIaCkHg
cd kotlin-backend
※aws-mfaとaws ecr get-loginを済ませておくこと
gradlew jib -Paws.accountid=%AWS_ACCOUNT% -Paws.region=%AWS_REGION% --stacktrace
cd ..
docker-compose down && docker-compose build --no-cache
docker-compose push








★★★CONTAINER_NAME_PREFIXはDOCKER_REPOSITORY_SUFFIXに変更が必要★★★

set CONTAINER_NAME_PREFIX=ecs-
cd kotlin-backend 
gradlew jibDockerBuild
cd ..
docker-compose -f docker-compose.ecs.yml build --no-cache
set AWS_ACCOUNT=XXXXXXXXXXXX
set AWS_REGION=ap-northeast-1
cd aws-cdk
npm run build
cdk ls -l
cdk deploy
cdk destroy







・Kompose起動準備（Docker for WindowsでKubernetesをONにしていればminikube不要）
※ECRログインを実施
kubectl delete secret ecr-secret
kubectl create secret docker-registry ecr-secret --docker-server=https://XXXXXXXXXXXX.dkr.ecr.ap-northeast-1.amazonaws.com --docker-username=AWS --docker-password=【aws ecr get-loginコマンドで表示される値】

・Kompose起動（ローカル）
※https://kompose.io/、ダウンロードファイルを「kompose.exe」にリネームし、適当な場所に配置しパスを通す。
※docker-compose.yamlファイルのある場所に移動
※.envのXXXXXXXXXXXX部分をAWSアカウントに変更
docker-compose config > docker-compose-resolved.yml && kompose convert -f docker-compose-resolved.yml
（※別cmdで）kubectl proxy --port=8080
kompose up -f docker-compose-resolved.yml --build none
kubectl get all
※podのログ確認
kubectl get pod
kubectl logs -f【pod名】
kubectl exec -it 【pod名】 /bin/bash
※podのステータスが怪しい場合の調査用（image-pull-secretの設定漏れがあるとErrImagePullとなる点に注意）
kubectl describe pods
※ネットワーク絡みの確認に
kubectl describe svc
kompose down -f docker-compose-resolved.yml
（※別cmdのkubectl proxyをctrl+cで終了）

★★★★★★docker-composeでは内部のポート、kubernetesでは外部のポートを利用している。ローカルに5432ポートでPostgreSQLを使っているからといって、docker-composeでポートを55432:5432とすると、kotlin-backendからのDBアクセス時にdocker-composeでは5432で繋がるがkubernetesでは55432でないと繋がらない。CORSの許可のホスト名もそのままだとだめっぽい★★★★★★

・wasm-packプロジェクト作成
cd C:\_dev\js\n-study\next-ts-sample-app
cargo generate --git https://github.com/rustwasm/wasm-pack-template
※プロジェクト名はrust-wasm-packとした
※以下は一度wasm-pack buildしてからnext-ts-sample-appフォルダ直下で実施
npm install file:rust-wasm-pack/pkg

・wasm-packプロジェクトビルド（next-ts-sample-appフォルダ直下にいる前提）
cd rust-wasm-pack && wasm-pack build && cd ..





＜参考サイト＞
・Kompose not replacing environment variables from .env file
https://github.com/kubernetes/kompose/issues/1164

・Error while deploying application: Get http://localhost:8080/api: dial tcp [::1]:8080: connect: connection refused
https://github.com/kubernetes/kompose/issues/1201

・Kubernetes でプライベートリポジトリのコンテナイメージを使うには
https://qiita.com/ktateish/items/f094433e92310ad737a8

・Kompose公式ドキュメント
https://github.com/kubernetes/kompose/blob/master/docs/user-guide.md
※Labels「kompose.image-pull-secret」

・kompose を使って kubernetes 上で docker-compose してみる
https://hawksnowlog.blogspot.com/2018/03/kubernetes-with-kompose.html

・Getting miss formatted postgres connection URL
https://github.com/helm/charts/issues/9561
※${POSTGRES_PORT}はkubernetesが上書き設定するため使えない。


・Compose on Kubrenetesデプロイ（ローカル）
※「docker-composeデプロイ（ローカル）」のdocker-composeコマンドの代わりに実行
docker stack deploy --orchestrator=kubernetes -c docker-compose.yml next-ts-sample-app-kube
docker stack ls --orchestrator=kubernetes
kubectl get pod
kubectl get svc
docker stack services --orchestrator=kubernetes next-ts-sample-app-kube
kubectl logs -f kubernetes
docker stack rm --orchestrator=kubernetes next-ts-sample-app-kube
★★★コンテナ間通信ができていない。ローカルもKomposeのほうがよさそう★★★

＜その他URL＞
https://qiita.com/h-r-k-matsumoto/items/68f694650029ddf7351d
https://qiita.com/hesma2/items/9e1cbbc0b44c40b62981
https://qiita.com/rururu_kenken/items/05720aac729ff5614e38
https://masayuki14.hatenablog.com/entry/2019/04/19/Compose_on_Kubenetes_%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%A6%E3%81%BF%E3%82%8B
https://masayuki14.hatenablog.com/entry/2019/04/19/Compose_on_Kubenetes_%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%A6%E3%81%BF%E3%82%8B
https://qiita.com/frost-tb-voo/items/64233f0320d74e3cb6cf
https://qiita.com/frost-tb-voo/items/64233f0320d74e3cb6cf
https://qiita.com/ynott/items/4df239022f43fac67590
https://jp.alibabacloud.com/help/doc-detail/85935.htm
https://texta.pixta.jp/entry/2018/10/31/120000
https://www.codeflow.site/ja/article/how-to-migrate-a-docker-compose-workflow-to-kubernetes
https://qiita.com/s-shirayama/items/1d1e1ef639f129162ba3
https://dev.classmethod.jp/articles/build-the-k8s-with-helm-on-a-local-mac/
https://www.slideshare.net/masakinakayama2/dockerkubernetes-136578511
https://deeeet.com/writing/2018/01/10/kubernetes-yaml/
https://www.creationline.com/lab/25164
https://github.com/docker/compose-on-kubernetes
https://www.slideshare.net/masakinakayama2/dockerkubernetes-136578511
https://speakerdeck.com/masayuki14/compose-on-kubernetes-wogkededong-kasou?slide=10








■Qiitaメモ
・yarnを使うプロジェクトでnpm installを禁止する方法
https://qiita.com/suin/items/a7bf214f48eb9b2d9afc

・フロントエンドテストを雰囲気で書いているとハマりがちなところ
https://qiita.com/mugi_uno/items/0cd13a52923a8b831513






■Vagrantメモ
・目標
①Vagrantで立てたVMで自動でdocker-compose起動
https://github.com/tokyo-metropolitan-gov/covid19
https://github.com/tokyo-metropolitan-gov/covid19/blob/development/Vagrantfile
https://github.com/tokyo-metropolitan-gov/covid19/blob/development/vagrant_provision.sh
②複数ホストにKVMで複数VMを起動し冗長化構成を組む（ネットワーク的な勉強も兼ねる）


・VirtualBoxインストール
https://qiita.com/Esfahan/items/41c4469f28f6011ab33b
https://www.virtualbox.org/wiki/Downloads
※VirtualBox 6.1.10 platform packagesのWindows hostsをクリック
※ダウンロードファイル名：VirtualBox-6.1.10-138449-Win.exe
※インストーラーは全てそのままで「次へ」

・Vagrantのインストール手順
https://sukkiri.jp/technologies/orchestration_tools/vagrant/vagrant_install.html
https://www.vagrantup.com/downloads
※初期表示時は32bitのため、64bitを選択すること。
※ダウンロードファイル名：vagrant_2.2.9_x86_64.msi
※インストーラーは全てそのままで「次へ」

・初期化、起動、SSH接続、終了
http://vdeep.net/vagrant-cloud
※実行したコマンド
cd 【next-ts-sample-appクローンディレクトリ】
vagrant init generic/ubuntu2004
    ※initはVagrantfile作成コマンドなので、今後プロジェクトをクローンした人は
    　「VirtualBoxインストール」、「Vagrantインストール」、「vagrant up」するだけでいいはず。
    　1GB位ダウンロードするので初回は30分位時間がかかると思われる。

vagrant up
※おそらく初回は「SSH auth method: private key」で待たされる。
　VirtualBoxで画面表示してみると、GNU GRUBのブート選択画面が表示されており、
　一度選択してあげれば、今後はvagrant upがすぐ終わるようになる。
　なお、vagrant destroy→vagrant upしたときはGNU GRUBのブート選択画面が表示されなかった。
　※参考サイト（以下のどれでもなかったが）
　Windows7にVagrantを導入 - 失敗した事：https://qiita.com/rrryutaro/items/260f0f4bd0b1e550b6da
    C:\_dev\js\n-study\next-ts-sample-app>vagrant up
    Bringing machine 'default' up with 'virtualbox' provider...
    ==> default: Box 'generic/ubuntu2004' could not be found. Attempting to find and install...
        default: Box Provider: virtualbox
        default: Box Version: >= 0
    ==> default: Loading metadata for box 'generic/ubuntu2004'
        default: URL: https://vagrantcloud.com/generic/ubuntu2004
    ==> default: Adding box 'generic/ubuntu2004' (v3.0.8) for provider: virtualbox
        default: Downloading: https://vagrantcloud.com/generic/boxes/ubuntu2004/versions/3.0.8/providers/virtualbox.box
    Download redirected to host: vagrantcloud-files-production.s3.amazonaws.com
        default:
        default: Calculating and comparing box checksum...
    ==> default: Successfully added box 'generic/ubuntu2004' (v3.0.8) for 'virtualbox'!
    ==> default: Importing base box 'generic/ubuntu2004'...
    ==> default: Matching MAC address for NAT networking...
    ==> default: Checking if box 'generic/ubuntu2004' version '3.0.8' is up to date...
    ==> default: Setting the name of the VM: next-ts-sample-app_default_1591761448654_3411
    ==> default: Clearing any previously set network interfaces...
    ==> default: Preparing network interfaces based on configuration...
        default: Adapter 1: nat
    ==> default: Forwarding ports...
        default: 22 (guest) => 2222 (host) (adapter 1)
    ==> default: Running 'pre-boot' VM customizations...
    ==> default: Booting VM...
    ==> default: Waiting for machine to boot. This may take a few minutes...
        default: SSH address: 127.0.0.1:2222
        default: SSH username: vagrant
        default: SSH auth method: private key
    The guest machine entered an invalid state while waiting for it
    to boot. Valid states are 'starting, running'. The machine is in the
    'unknown' state. Please verify everything is configured
    properly and try again.

    If the provider you're using has a GUI that comes with it,
    it is often helpful to open that and watch the machine, since the
    GUI often has more helpful error messages than Vagrant can retrieve.
    For example, if you're using VirtualBox, run `vagrant up` while the
    VirtualBox GUI is open.

    The primary issue for this error is that the provider you're using
    is not properly configured. This is very rarely a Vagrant issue.

vagrant ssh
★★★待たされた上に「ssh_exchange_identification: read: Connection reset」となり繋がらない。★★★

vagrant halt
※VMの停止コマンド。電源OFFのイメージ。
　VM削除（Boxまでは消さない）は「vagrant destroy」なので、スクラップ＆ビルドは「vagrant destroy」、「vagrant up」
    C:\_dev\js\n-study\next-ts-sample-app>vagrant halt
    ==> default: Attempting graceful shutdown of VM...
        default: Guest communication could not be established! This is usually because
        default: SSH is not running, the authentication information was changed,
        default: or some other networking issue. Vagrant will force halt, if
        default: capable.
    ==> default: Forcing shutdown of VM...



