#!/bin/bash

API="http://localhost:4741"
URL_PATH="/uploads"
# ID="5953f97544ff1208a4f83c69"
# TOKEN=wNWpJZQFB5BqtRrS9LJsxPCv3mfAEsmGmeNYDdsMPmM=--niXML7W0No1XzTVjPZ9XM5qYD/CJnXO1wN38Ykw2E20=

curl "${API}${URL_PATH}/5953f97544ff1208a4f83c69" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "upload": {
      "name": "hello"
    }
  }'

echo
