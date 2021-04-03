#!/bin/bash
DIR=$(cd "$(dirname "$0")"; pwd)
cd $DIR
./gradlew clean build