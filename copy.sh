#!/bin/sh

sudo rm -r /var/lib/docker/volumes/grymus_wordpress/_data/wp-content/themes/grymus
sudo cp -rv grymus /var/lib/docker/volumes/grymus_wordpress/_data/wp-content/themes

# sudo rm -r /var/lib/docker/volumes/ves_wordpress/_data/wp-content/plugins/ves-posts
# sudo cp -rv ves-posts /var/lib/docker/volumes/ves_wordpress/_data/wp-content/plugins