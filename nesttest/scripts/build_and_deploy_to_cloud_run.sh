#!/bin/bash
docker build .. -t nesttest:latest

gcloud auth login teasel.ian@gmail.com
gcloud config set project tuk-dev
gcloud auth configure-docker europe-west1-docker.pkg.dev

docker tag nesttest:latest europe-west1-docker.pkg.dev/tuk-dev/images/nesttest:latest
docker push europe-west1-docker.pkg.dev/tuk-dev/images/nesttest:latest

gcloud run deploy nesttest \
  --image=europe-west1-docker.pkg.dev/tuk-dev/images/nesttest:latest \
  --region=europe-west1 \
  --allow-unauthenticated \
  --port=3000 \
  --memory=4Gi \
  --update-env-vars MODE=DEV,\
RUN_MIGRATIONS=true,\
NEST_DEBUG=true,\
AUTH0_ISSUER_URL=https://teasel.eu.auth0.com/,\
AUTH0_AUDIENCE=https://api.trigpointing.dev,\
AUTH0_REDIRECT_URL=https://nesttest-jd3ityqkdq-ew.a.run.app/docs/oauth2-redirect.html,\
NODE_TLS_REJECT_UNAUTHORIZED=0 \
  --update-secrets=POSTGRES_HOST=TDEV_POSTGRES_HOST:latest,\
POSTGRES_PORT=TDEV_POSTGRES_PORT:latest,\
POSTGRES_USER=TDEV_POSTGRES_USER:latest,\
POSTGRES_PASSWORD=TDEV_POSTGRES_PASSWORD:latest,\
POSTGRES_DATABASE=TDEV_POSTGRES_DATABASE:latest,\
AUTH0_CLIENT_ID=TDEV_AUTH0_CLIENT_ID:latest,\
