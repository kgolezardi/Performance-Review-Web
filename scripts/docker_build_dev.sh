#!/bin/bash
docker build \
  -t "kgolezardi/performance-review-web:dev" \
  -t "kgolezardi/performance-review-web:dev-$TRAVIS_COMMIT" \
   .
