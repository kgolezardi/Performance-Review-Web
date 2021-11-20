#!/bin/bash
bash scripts/docker_build_dev.sh
echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
docker push kgolezardi/performance-review-web:dev
docker push kgolezardi/performance-review-web:dev-$TRAVIS_COMMIT
docker push kgolezardi/performance-review-web:dev-$TRAVIS_BUILD_NUMBER
