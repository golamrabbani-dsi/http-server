const request = require("supertest");
const http = require("http");
const server = http.createServer(require("../routes"));

beforeEach(async done => {
  await require("../connection")("books").delete();
  request(server)
    .post("/books/")
    .send({
      idnew_table: 25,
      title: "Intro to aRABIC",
      description: "Cool Book",
      link: ""
    })
    .end(done);
});

describe("GET /", () => {
  it("should return 200", done => {
    request(server)
      .get("/")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  it("should return a message", done => {
    request(server)
      .get("/")
      .end(function(err, res) {
        expect(res.body).toHaveProperty("message");
        if (err) return done(err);
        done();
      });
  });
});

describe("GET /[invalid url]", () => {
  it("should return 404", done => {
    request(server)
      .get("/invalid")
      .expect(404)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});

describe("GET /books", () => {
  it("should return list of books object", done => {
    request(server)
      .get("/books")
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);

        expect(res.body.length).toBeGreaterThanOrEqual(0);
        expect(res.body).toBeInstanceOf(Array);
        done();
      });
  });
});

describe("GET /books/[id]", () => {
  it("should return 200", done => {
    request(server)
      .get("/books/25")
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  it("should return object of specific book", done => {
    request(server)
      .get("/books/25")
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body.length).toBeGreaterThanOrEqual(0);
        expect(res.body).toBeInstanceOf(Object);

        done();
      });
  });

  it("should return 404 if no book found", done => {
    request(server)
      .get("/books/235")
      .expect(404)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});

describe("POST /books/", () => {
  it("should return object of newly posted book", done => {
    request(server)
      .post("/books/")
      .send({
        title: "Intro to aRABIC",
        description: "Cool Book",
        link: ""
      })
      .set("Accept", "application/json")
      .end(function(err, res) {
        if (err) return done(err);

        expect(res.body).toHaveProperty("data");
        done();
      });
  });

  it("should return Error if empty body sent to to add book", done => {
    request(server)
      .post("/books/")
      .send()
      .set("Accept", "application/json")
      .end(function(err, res) {
        if (err) return done(err);

        expect(res.body).toHaveProperty("error");
        done();
      });
  });
});

describe("PATCH /books/[id]", () => {
  it("should return object of updated book", done => {
    request(server)
      .patch("/books/25")
      .send({
        link: "test.com"
      })
      .set("Accept", "application/json")
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).toHaveProperty("message");
        done();
      });
  });

  it("should return failer message of update request", done => {
    request(server)
      .patch("/books/dsf")
      .send({
        link: "test.com"
      })
      .set("Accept", "application/json")
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).toHaveProperty("error");
        done();
      });
  });
});

describe("DELETE /books/[id]", () => {
  it("should return 0 or 1 for confirmation of delete", done => {
    request(server)
      .delete("/books/25")
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).toHaveProperty("message");
        done();
      });
  });
});
