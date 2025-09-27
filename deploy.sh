#!/bin/bash -e

NAME=$(npm pkg get name | tr -d '"')
VERSION=$(npm pkg get version | sed 's/"//g')

build() {
	echo "Building..."
	npm run tail
	npm run build

}

archive() {
	echo "Archiving..."
	tar czf $NAME-$VERSION.tgz grymus gallery-posts
	sha256sum $NAME-$VERSION.tgz >$NAME-$VERSION.tgz.sha
	echo "Created $NAME-$VERSION.tgz and $NAME-$VERSION.tgz.sha"
}

zip_theme() {
	echo "Zipping..."
	rm -f $NAME-*.zip
	zip -r $NAME-$VERSION.zip grymus
	echo "Created $NAME-$VERSION.zip"
}

zip_plugins() {
	echo "Zipping plugins..."
	rm -f gallery-posts-*.zip
	zip -r gallery-posts-$VERSION.zip gallery-posts
	echo "Created gallery-posts-$VERSION.zip"
}

case "$1" in
prod)
	echo "Deploying to production server"
	build
	scp $NAME-$VERSION.tgz nazgul:/home/uploads
	scp $NAME-$VERSION.tgz.sha nazgul:/home/uploads
	ssh nazgul "ln -sf /home/uploads/$NAME-$VERSION.tgz /home/uploads/$NAME-latest.tgz;ln -sf /home/uploads/$NAME-$VERSION.tgz.sha /home/uploads/$NAME-latest.tgz.sha"
	;;
ver)
	if [ "$2" = "patch" ]; then
		npm version patch
	elif [ "$2" = "minor" ]; then
		npm version minor
	elif [ "$2" = "major" ]; then
		npm version major
	else
		echo "Usage: $0 ver {patch|minor|major}"
		exit 1
	fi
	VERSION=$(npm pkg get version | sed 's/"//g')
	sed -i "s/frontendVersion.=.\".*\"/frontendVersion = \"${VERSION}\"/g" /home/seba/workspace/event-tools-frontend/src/app/version.ts
	git add src/app/version.ts
	git commit -m "Bump version to $VERSION"
	;;
zip)
	build
	zip_theme
	zip_plugins
	;;
*)
	echo "Usage: $0 {prod|ver|zip}"
	exit 1
	;;
esac
