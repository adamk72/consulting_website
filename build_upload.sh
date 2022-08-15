#!/bin/zsh

set -a; source .env; set +a

yarn clear
yarn build
scp -P 7822 -r ./build/* ${USER_ACCOUNT}:${PUBLIC_HTML_PATH}