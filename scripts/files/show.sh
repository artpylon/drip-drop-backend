#!/bin/sh

API="http://localhost:4741"
URL_PATH="/uploads"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request GET \

echo



# db.uploads.findOne({_id : ObjectId("5953f97544ff1208a4f83c69")})
# {
# 	"_id" : ObjectId("5953f97544ff1208a4f83c69"),
# 	"_owner" : "5952d923ced6a7a1f1e51eb8",
# 	"name" : "junk",
# 	"folder" : "3myfolder",
# 	"url" : "abc",
# 	"updatedAt" : ISODate("2017-06-28T19:41:44.739Z")
# }
