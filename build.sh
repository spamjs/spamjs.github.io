#!/bin/sh
# By default we use the Node.js version set in your package.json or the latest
# version from the 0.10 release
#
# You can use nvm to install any Node.js (or io.js) version you require.
# nvm install 4.0

# Install grunt-cli for running your tests or other tasks
# npm install -g grunt
# npm install -g grunt-cli

npm update

bower update

compass compile

grunt build

lftp -c "open -u $FTP_USER,$FTP_PASSWORD $FTP_SERVER; set ssl:verify-certificate no; put -O / .htaccess"
lftp -c "open -u $FTP_USER,$FTP_PASSWORD $FTP_SERVER; set ssl:verify-certificate no; put -O / web.config"

lftp -c "open -u $FTP_USER,$FTP_PASSWORD $FTP_SERVER; set ssl:verify-certificate no; mirror -R --parallel=4 --exclude-glob .git dist/ /dist"
lftp -c "open -u $FTP_USER,$FTP_PASSWORD $FTP_SERVER; set ssl:verify-certificate no; mirror -R --parallel=4 --exclude-glob .git src/ /src"

curl http://cdn.aertrip.com/move.php

lftp -c "open -u $FTP_USER,$FTP_PASSWORD $FTP_SERVER; set ssl:verify-certificate no; mirror -R no/ /no"
