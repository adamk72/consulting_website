#!/bin/zsh

set -a; source .env; set +a

if [ "$1" = "clear" ]
then
  yarn clear
fi

yarn build
scp -P 7822 -r ./build/* ${USER_ACCOUNT}:${PUBLIC_HTML_PATH}