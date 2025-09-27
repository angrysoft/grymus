#!/bin/sh

#volume=/var/lib/docker/volumes/grymus_wordpress/_data
volume=/home/seba/.local/share/containers/storage/volumes/grymus_wordpress/_data
container=grymus_wordpress_1
npm run build &&
	npm run tail &&
	sudo rm -r $volume/wp-content/themes/grymus
podman cp grymus $container:/var/www/html/wp-content/themes

sudo rm -rv $volume/wp-content/plugins/gallery-posts
# cp -rv gallery-posts $volume/wp-content/plugins
podman cp gallery-posts $container:/var/www/html/wp-content/plugins

# sudo rm -r $volume/wp-content/themes/grymus
# sudo cp -rv grymus $volume/wp-content/themes

# sudo rm -r $volume/wp-content/plugins/gallery-posts
# sudo cp -rv gallery-posts $volume/wp-content/plugins
