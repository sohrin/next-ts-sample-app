# Docker で作る postgres 環境
# https://crudzoo.com/blog/docker-postgres

# AWSのRDSやAuroraは11.4だがdockerhubにalpineがないため11.7を利用
FROM postgres:11.7-alpine
ENV LANG ja_JP.utf8

# 初期設定
COPY .pgpass /root/.pgpass
COPY docker-entrypoint-initdb.d/ /docker-entrypoint-initdb.d/