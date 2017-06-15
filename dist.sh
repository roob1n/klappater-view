#!/bin/bash

ssh mugetld@uahnn.com "
    cd www/app.klappater
    echo 'removing dist folder...'
	rm -rf dist
    echo 'done'
"

echo "deploy dist folder on Cyon server"
scp -r ./dist mugetld@uahnn.com:www/app.klappater/
echo "dist folder deployment done"
