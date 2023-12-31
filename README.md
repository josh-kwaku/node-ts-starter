# **NODEJS & Typescript Starter Project**

This repo contains boilerplate code needed to get a nodejs and typescript up and running **ASAP**.

## Features

- Typescript
- Keycloak
- Postgres
- Test containers

## Prerequisites

By default, this boilerplate comes with

- a postgres connector for connecting to a postgres instance
- a keycloak connector for connecting to a keycloak instance

Both of which you can easily plug into your app. See an example in the [components/user](https://github.com/josh-kwaku/node-ts-starter/tree/main/src/components/user) directory.

> Keycloak is an Open Source Identity and Access Management System that takes away the burden of implementing auth from scratch. According to [the official website](https://www.keycloak.org/), you can use Keycloak to "Add authentication to applications and secure services with minimum effort. No need to deal with storing users or authenticating users. Keycloak provides user federation, strong authentication, user management, fine-grained authorization, and more.

> Of course if you do **not care** for either Postgres or Keycloak, feel free to yank them out of the project

## Usage

### Step 1 - Clone the repo

```bash
$ git clone https://github.com/josh-kwaku/node-ts-starter.git
```

### Step 2 - Install Dependencies

```bash
$ npm i
```

### Step 3 - Setup the .env file

Using the `.env.example` file, populate your `.env` file accordingly

### Step 4 - Start the app with docker (in dev mode)

This spins up the app and it'd two dependencies `keycloak` and `postgres`

```bash
$ docker compose -f compose-dev.yaml up --build
```

### Step 4 - Start the app with docker

This spins up the app and it'd two dependencies `keycloak` and `postgres`

```bash
$ docker compose up --build
```

### Step 5 - Code Away :)

## Misc

Access the keycloak admin interface through your browser by visiting `http://localhost:8180`

Visit https://www.keycloak.org/getting-started/getting-started-docker to get acquainted with keycloak.

## Testing

`Jest` is used as the testing framework for this starter project.

## Running Tests

```bash
$ npm run test
```

### Unit Tests

This starter project uses the convention that unit test files have an ending of `.spec.ts`. An example can be found in the [GetUsers](https://github.com/josh-kwaku/node-ts-starter/blob/main/src/components/user/use-cases/get-users.spec.ts) use case test file.

#### Running Unit Tests

```bash
$ npm run test:unit
```

### Integration Tests

This starter project uses the convention that integration test files have an ending of `.spec.int.ts`. An example can be found in the [GetUsers](https://github.com/josh-kwaku/node-ts-starter/blob/main/src/components/user/entry-points/api/get/all-users.spec.int.ts) controller test file.

Additionally, the "database" dependencies for integration tests are handled by [test containers](https://testcontainers.com/). Hence you shouldn't need to worry about messing up your development databases while running integration tests since these databases will be spun up and torn down automatically. See [test setup](https://github.com/josh-kwaku/node-ts-starter/tree/main/test-setup) for how this is setup.

> **Note**: These can always be modified. If you wish to modify this, update the [jest.int.js](https://github.com/josh-kwaku/node-ts-starter/blob/main/jest.int.js) and [jest.unit.js](https://github.com/josh-kwaku/node-ts-starter/blob/main/jest.unit.js) files accordingly.

#### Running Integration Tests

```bash
$ npm run test:int
```
