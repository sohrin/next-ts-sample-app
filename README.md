# next-ts-sample-app
Next.js(TypeScript)のサンプルプロジェクトです。

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
        - （参考）環境構築(VSCode + kotlin + spring boot + Gradle)：https://qiita.com/miro108/items/43cf6878eff70830a0c9 
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


## メモ書き（Rust）

・Windows10でRustの開発環境を構築
https://qiita.com/euledge/items/ce3e24a2b8020441cd85


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