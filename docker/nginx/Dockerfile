# 2020-03-13時点のstable
FROM nginx:1.16.1-alpine
# 環境変数
ARG EXPRESS_HOSTNAME
# 準備した設定ファイルで上書き
COPY conf.d/default.conf /etc/nginx/conf.d/default.conf
RUN sed -i -e "s/\${EXPRESS_HOSTNAME}/$EXPRESS_HOSTNAME/g" /etc/nginx/conf.d/default.conf