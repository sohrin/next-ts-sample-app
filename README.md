# next-ts-sample-app
Next.js(TypeScript)のサンプルプロジェクトです。

## 必須インストール
1. Node.js

## 任意インストール
1. PostgreSQL（docker-compose起動時は不要）

## 環境構築手順
### チェックアウト
    cd 作業ディレクトリ
    git clone https://github.com/sohrin/next-ts-sample-app.git
    npm install

### ローカル起動（npm、開発）
    cd 作業ディレクトリ/next-ts-sample-app
    npm run dev
- ローカルに別途PostgreSQLをインストールし、PostgreSQLに対しては「next-ts-sample-app/docker/postgres/docker-entrypoint-initdb.d/」にあるDDL、DMLを実行しておく必要があります。

### ローカル起動（docker-compose）
    cd 作業ディレクトリ/next-ts-sample-app
    docker-compose build --no-cache
    docker-compose up -d
- dockerコマンド、docker-composeコマンドが動作する環境が必要です。
- PostgreSQLコンテナも起動するため、ローカルに別途PostgreSQLをインストールする必要はありません。

## デプロイ（Fargate）
- 後日整理

## ディレクトリ構成／重要なファイル等
- 後日整理

## その他メモ
- mdファイルのプレビュー(vscode)：ctrl + k -> v
- マークダウンのチートシート：https://gist.github.com/mignonstyle/083c9e1651d7734f84c99b8cf49d57fa