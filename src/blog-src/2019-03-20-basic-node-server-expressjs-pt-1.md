---
title: Basic node server, I MEAN expressJS pt. 1
tags:
    - express
categories:
    - js
---

Meanwhile waiting for the 5th release of express(js) let's write an article containing basics of simple yet powerful node server. When it comes to nodeJS, many frameworks have one thing in common - they have express(js) between dependencies. Take a look into Sails, Feathers, or Koa - which is also heavily inspired.

ExpressJS can be used even for single page app if you are stubborn enough, but its main advance is the simplicity introduced to the backend guys.

Let's start simple enough to see how fast we can "hello world response".

```
mkdir expresstest
cd expresstest
npm init
npm i express --save
touch index.js
```

Place inisde the following code taken straight from the docs.

```
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
```

Run `node index.js`. It will interpret your js file. Then you can enter `http://localhost:3000` into your browser to see the result immediately. Instead of the hello world, you can send anything else with res object passed into the app's function. The response can be a string, a JSON thing, a file, download prompt, even redirect.

Saying hello when you use project for the first time is a common path to understand what's going on. But what's coming next? Add the database with mongo, prepare docker compose file to be independent of the environment, make a middleware to protect you "precious". And all that, we'll be making in an upcoming part. Can't wait.

_This text is dedicated to the loyal ~~person~~audience of this blog_
