const request = require("request");
const server = require("./index");
const hostname = "127.0.0.1";
const port = 3000;

describe("GET /", () => {
  it.todo("should return 200");

  it.todo("should return a sentence");
});

describe("GET /[invalid url]", () => {
  it.todo("should return 404");
});

describe("GET /books", () => {
  it.todo("should return 200");

  it.todo("should return list of books object");
});

describe("GET /books/[id]", () => {
  it.todo("should return 200");

  it.todo("should return object of specific book");

  it.todo("should return 404 if no book found");
});

describe("POST /books/", () => {
  it.todo("should return object of newly posted book");
});

describe("PATCH /books/[id]", () => {
  it.todo("should return object of updated book");
});

describe("DELETE /books/[id]", () => {
  it.todo("should return 0 or 1 for confirmation of delet");
});
