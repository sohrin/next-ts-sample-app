# 2020-03-13時点のstable
FROM nginx:1.18.0-alpine

# 環境変数
ARG EXPRESS_HOSTNAME
ARG BACKEND_HOSTNAME

# 設定ファイルの配置・envsubst書き換え
COPY conf.d/default.conf.template /etc/nginx/conf.d/default.conf.template
RUN envsubst '${EXPRESS_HOSTNAME} ${BACKEND_HOSTNAME}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf \
    && rm /etc/nginx/conf.d/default.conf.template

# Dockerize（コンテナ起動待ち用）
RUN apk add --no-cache openssl
ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz
RUN echo $EXPRESS_HOSTNAME
RUN echo $BACKEND_HOSTNAME
# MEMO: How can I use a variable inside a Dockerfile CMD?：https://stackoverrun.com/ja/q/11139358
CMD dockerize -timeout 300s \
    -wait tcp://$EXPRESS_HOSTNAME:3000 \
    -wait tcp://$BACKEND_HOSTNAME:8080 \
    -wait-retry-interval 5s \
    nginx -g "daemon off;";