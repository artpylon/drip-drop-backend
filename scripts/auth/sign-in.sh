#!/bin/bash

API="http://localhost:4741"
URL_PATH="/sign-in"

EMAIL="m98@email.com"
PASSWORD="98"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "'"${EMAIL}"'",
      "password": "'"${PASSWORD}"'"
    }
  }'

echo
