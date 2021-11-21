#!/bin/bash
docker build .. -t frontend:latest

gcloud auth login teasel.ian@gmail.com
gcloud config set project tuk-dev
gcloud auth configure-docker europe-west1-docker.pkg.dev

docker tag frontend:latest europe-west1-docker.pkg.dev/tuk-dev/images/frontend:latest
docker push europe-west1-docker.pkg.dev/tuk-dev/images/frontend:latest

gcloud run deploy frontend \
  --image=europe-west1-docker.pkg.dev/tuk-dev/images/frontend:latest \
  --region=europe-west1 \
  --allow-unauthenticated \
  --port=80
