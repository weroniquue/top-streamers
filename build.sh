#!/bin/bash
DIR=$(cd "$(dirname "$0")"; pwd)
cd $DIR/top-streamers-backend
./gradlew clean build

cd $DIR/top-streamers-web
npm run build