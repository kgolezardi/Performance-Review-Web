#!/bin/bash
bash scripts/docker_build_dev.sh
echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
docker push kgolezardi/performance-review-web
