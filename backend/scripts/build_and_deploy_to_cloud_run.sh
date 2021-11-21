#!/bin/bash
docker build .. -t backend:latest

gcloud auth login teasel.ian@gmail.com
gcloud config set project tuk-dev
gcloud auth configure-docker europe-west1-docker.pkg.dev

docker tag backend:latest europe-west1-docker.pkg.dev/tuk-dev/images/backend:latest
docker push europe-west1-docker.pkg.dev/tuk-dev/images/backend:latest

gcloud run deploy backend \
  --image=europe-west1-docker.pkg.dev/tuk-dev/images/backend:latest \
  --region=europe-west1 \
  --allow-unauthenticated \
  --port=80 \
  --update-env-vars ENVIRONMENT=tme,\
AUTH0_AUDIENCE=https://api.trigpointing.me,\
AUTH0_DOMAIN=teasel.eu.auth0.com
