#!/bin/bash -e

NAME=$(npm pkg get name | tr -d '"')
VERSION=$(npm pkg get version | sed 's/"//g')

build() {
	echo "Building..."
	rm -frv dist
	ng build --configuration production

}

archive() {
	echo "Archiving..."
	cd dist
	tar czf $NAME-$VERSION.tgz grymus gallery-posts
	sha256sum $NAME-$VERSION.tgz >$NAME-$VERSION.tgz.sha
	echo "Created $NAME-$VERSION.tgz and $NAME-$VERSION.tgz.sha"
}

zip() {
	echo "Zipping..."

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
	;;
*)
	echo "Usage: $0 {prod|ver}"
	exit 1
	;;
esac
