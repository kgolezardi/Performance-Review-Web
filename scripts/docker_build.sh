#!/bin/bash
VERSION=$(node -p "require('./package.json').version")
docker build \
  -t "kgolezardi/performance-review-web:latest" \
  -t "kgolezardi/performance-review-web:$VERSION" \
 .
