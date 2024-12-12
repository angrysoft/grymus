#!/bin/sh

npm run build &&
npm run tail &&
sudo rm -r /var/lib/docker/volumes/grymus_wordpress/_data/wp-content/themes/grymus
sudo cp -rv grymus /var/lib/docker/volumes/grymus_wordpress/_data/wp-content/themes

sudo rm -r /var/lib/docker/volumes/grymus_wordpress/_data/wp-content/plugins/gallery-posts
sudo cp -rv gallery-posts /var/lib/docker/volumes/grymus_wordpress/_data/wp-content/plugins