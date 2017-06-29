#!/bin/bash

API="http://localhost:4741"
URL_PATH="/files"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "file": {
      "name": "'"${TEXT}"'"
    }
  }'

echo
