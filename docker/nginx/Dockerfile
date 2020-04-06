# 2020-03-13時点のstable
FROM nginx:1.16.1-alpine

# 環境変数
ARG EXPRESS_HOSTNAME

# 設定ファイルの配置・envsubst書き換え
COPY conf.d/default.conf.template /etc/nginx/conf.d/default.conf.template
RUN envsubst '${EXPRESS_HOSTNAME}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf \
    && rm /etc/nginx/conf.d/default.conf.template