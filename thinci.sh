#!/bin/bash
set -e

ng build --prod

docker build . -t registry.cn-hangzhou.aliyuncs.com/crucialize/kudo:latest

echo
echo
echo 'build image success!'

docker push registry.cn-hangzhou.aliyuncs.com/crucialize/kudo:latest

echo
echo
echo 'push success!'