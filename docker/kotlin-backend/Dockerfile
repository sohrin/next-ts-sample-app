ARG DOCKER_REGISTRY
ARG DOCKER_REPOSITORY_SUFFIX
FROM "${DOCKER_REGISTRY}/next-ts-sample-app_kotlin-backend${DOCKER_REPOSITORY_SUFFIX}_no_dockerized"

# Dockerize（コンテナ起動待ち用）
RUN apk add --no-cache openssl
ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz
CMD ["dockerize", "-timeout", "300s", \
     "-wait", "tcp://postgres:5432", \
     "-wait-retry-interval", "5s", \
     "java", "-cp", "/app/resources:/app/classes:/app/libs/*", \
     "com.sanyu_i.sisdiv3.n_study.ntsa.kotlinbackend.KotlinBackendApplicationKt"]