build:
	./tailwindcss -i ./static/css/input.css -o ./static/css/index.css --minify && templ generate && go build -o ./build/server .
build-docker:
	./tailwindcss -i ./static/css/input.css -o ./static/css/index.css --minify && templ generate && env GOOS=linux GOARCH=amd64 go build -o ./build/server .