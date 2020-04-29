# Docker で作る postgres 環境
# https://crudzoo.com/blog/docker-postgres

# ※Amazon Auroraは2020-04-10時点では11.6まで対応
FROM postgres:11.6-alpine
ENV LANG ja_JP.utf8

# 初期設定
# DB作成のみDockerfileで行い、その他のDBマイグレーションはFlywayにて実施
COPY .pgpass /root/.pgpass
COPY docker-entrypoint-initdb.d/ /docker-entrypoint-initdb.d/