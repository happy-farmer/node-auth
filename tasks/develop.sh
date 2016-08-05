#!/usr/bin/env bash

APP_ENV_VARS=$(cat .env)
echo $APP_ENV_VARS
env $APP_ENV_VARS supervisor "$@" server.js
SERVER_PID=$!

trap "kill $SERVER_PID" SIGINT SIGTERM
