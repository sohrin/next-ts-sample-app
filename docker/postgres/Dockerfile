# Docker で作る postgres 環境
# https://crudzoo.com/blog/docker-postgres

# 2020-04-01時点のAmazon Auroraのデフォルト：10.7
FROM postgres:10.7-alpine
ENV LANG ja_JP.utf8

# 初期設定
COPY .pgpass /root/.pgpass
COPY docker-entrypoint-initdb.d/ /docker-entrypoint-initdb.d/