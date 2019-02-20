# http-server

##Simple CRUD Operation via RESful API

## How to open

Clone the repository in your pc and
use command `npm install`
Please create a database on your own in the mysql first.
Rename config.sample.json to config.json and replace with your own credentials.

then `npm start` or you can use `node index.js`

###API routes

```
GET /
GET /books
GET /books/1
POST /books
PATCH /books
DELETE /books
```

POST/PATCH pass data via raw body object
