#!/bin/sh

# replace static values with environment-variables
if [ -n "$AUTHSERVER_URL" ]; then
    sed -i "s#http://localhost:9999/#$AUTHSERVER_URL#g" /usr/share/nginx/html/app.*.js
fi

# start webserver
exec nginx
