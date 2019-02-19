const request = require("supertest");
const server = require("./index");
const hostname = "127.0.0.1";
const port = 3000;

beforeEach(done => {
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

  it("should return a sentence", done => {
    request(server)
      .get("/")
      .expect(`"This is a very cool API"`)
      .end(function(err, res) {
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

        expect(res.body).toBeGreaterThan(0);
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
        console.log(res.body);
        expect(res.body).toBe(1);
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
        console.log(res.body);
        expect(res.body).toBe(1);
        done();
      });
  });
});
