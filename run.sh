#!/bin/sh

# docker run \
#         --rm \
#         --name grymus-wp\
#         -p 8080:80 \
#         --env-file=.env.docker \
#         -d wordpress

# npm run watch &
podman rm grymus_wordpress_1
podman rm grymus_db_1
podman compose -f compose.yml up
