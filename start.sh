#!/bin/sh
echo "~~~ Starting Chemaya ~~~"

cd vcl-app
npm start &

cd ../
cd hgnui-test
node index.js &

echo "[STATUS: CHEMAYA START-UP SUCCESSFUL]"