# Software Engineer Coding Challenge

_author: Nick Donohue_

This is an implementation of an API coding challenge outlined [here](./project-outline.pdf).

Uses the following technologies:
- Node.js
- PostgreSQL
- Docker and Docker Compose

# Running

_requires Node.js and Docker to be installed on the host system_

```
yarn install && yarn run-demo # runs "docker-compose up"
```

API will be exposed on port `3000`

_To reset db state, run:_

```
docker-compose rm -f db
```

_To rebuild API container after making changes, run:_

```
docker-compose build
```

_To reset all (resets db and builds API), run:_
```
yarn reset-demo
```

_To run unit tests:_

```
yarn test
```

Example cURL requests to the API for reviewers can be found in [example-use.sh](./example-use.sh).

# API

This API exposes the following routes:

List all shoe entries:
```
GET /shoes
```

Get details of an individual shoe. Includes true-to-size average.
```
GET /shoes/:id
```

Create a new shoe
```
POST /shoes
parameters: { "name": String }
```

Create a new true-to-size entry:
```
POST /tts
parameters: { "shoeId": Number, "value": Number }
```

