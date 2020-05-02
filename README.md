# Mockup Server

> Simple Mock Up server in Node.js

Have you just wanted to test your front-end by the back-end wasn't ready?

Say no more for the temp routes!

Say no more for the waiting for the back-end!

Just say "Mock Up server"! By simulating a flexible (and dumb) API server we allow the developer test those pesky GET request from the front-end

## Table of Contents

- [How to run](#how-to-run)
- [Routes](#routes)
- [Contributing](#contributing)

## How to run

### Development

To run the mockup server in development (using nodemon) just run:

```bash
$ npm run start-dev
```

### Production

To run the mockup server in production (why?!?) just run:

```bash
$ npm start
```

## Routes

To make the routes as easy as possible we put all the routes to one file (`routes.js`) and created 2 types of render options:

- Function
- JSON (Object/String/Number/Boolean/etc.)

### Adding route

To add a route just add to the `module.exports` in `routes.js` the route URL as the key and the returned renderer as the value, for example:

```javascript
module.exports = {
  "/": {
    // JSON renderer
    home: "page",
  },
  "/users": function () {
    // Function renderer
    let users = []

    for (let i = 0; i < MAX_USER_NUMBER; i++)
      users.push({
        id: Math.floor(Math.random() * Math.floor(MAX_USER_NUMBER)),
        name: `user_${i}`,
      })

    return users
  },
  "/users/active_count": 100, // JSON renderer
  "/users/current/name": "Current User", // JSON renderer
  "/users/:id": function (params) {
    // Function renderer (with params)
    return `The user id is ${params.id}`
  },
}
```

### Function routes

> Note: the returned value from the function is renders as a JSON, for the time being there isn't any support for Promise rendering.

Function routes added to make rendering content more flexible, it can be used for creating random data or running a complicated task.
The function receive 1 argument, the params (`req.params`). For example:

```javascript
module.exports = {
  "/users": function () {
    // Function renderer, used for generating random users
    let users = []

    for (let i = 0; i < MAX_USER_NUMBER; i++)
      users.push({
        id: Math.floor(Math.random() * Math.floor(MAX_USER_NUMBER)),
        name: `user_${i}`,
      })

    return users
  },
  "/users/:id": function (params) {
    // Function renderer with params, used to render the user id (`params.id`)
    return `The user id is ${params.id}`
  },
}
```

## Contributing

Read [CONTRIBUTING.md](/CONTRIBUTING.md). PRs are welcome!
