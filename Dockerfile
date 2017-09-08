FROM ruby:2.2.3

# https://nodejs.org/en/download/package-manager/

RUN apt-get update && \
    curl -sL https://deb.nodesource.com/setup_6.x | bash - && \
    apt-get install -y nodejs

WORKDIR /

RUN npm install -g yarn

ENV HUGO_VERSION 0.26

RUN mkdir /tmp/hugo && cd /tmp/hugo && wget -q https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_${HUGO_VERSION}_Linux-64bit.tar.gz && tar -zxvf hugo_${HUGO_VERSION}_Linux-64bit.tar.gz && mv hugo /usr/local/bin && cd / && rm -rf /tmp/hugo

ENV PATH "$PATH:./node_modules/.bin"
