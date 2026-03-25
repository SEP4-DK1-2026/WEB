### Running in development mode

Start the Vite dev server in Docker:
`docker compose up --build`.
(After first succesful run, can usually skip --build)

Your application will be available at http://localhost:5173.

This setup mounts your local source code and keeps `node_modules` inside the container,
which makes it a good base for a future `.devcontainer` configuration.

### Production-like preview (optional)

If you need to test the built app inside the image:
`docker build --target final -t web-preview .`
`docker run --rm -p 8080:8080 web-preview`

Preview is available at http://localhost:8080.

### Deploying your application to the cloud

First, build your image, e.g.: `docker build -t myapp .`.
If your cloud uses a different CPU architecture than your development
machine (e.g., you are on a Mac M1 and your cloud provider is amd64),
you'll want to build the image for that platform, e.g.:
`docker build --platform=linux/amd64 -t myapp .`.

Then, push it to your registry, e.g. `docker push myregistry.com/myapp`.

Consult Docker's [getting started](https://docs.docker.com/go/get-started-sharing/)
docs for more detail on building and pushing.

### References

- [Docker's Node.js guide](https://docs.docker.com/language/nodejs/)
