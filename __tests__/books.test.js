/** Integration tests for books route */

process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app");
const db = require("../db");
const Book = require("../models/book");

let book_isbn;

describe("Books Routes Test", function () {

  beforeEach(async function () {
    await db.query("DELETE FROM books");

    let b1 = await Book.create({
        isbn: "111-1111111111",
        amazon_url: "https://www.testbook.com/",
        author: "Test Author",
        language: "Test Language",
        pages: 1,
        publisher: "Test Publisher",
        title: "Test Title",
        year: 2000
      });

    book_isbn = b1.isbn;
  });



  /** POST /books/create => {isbn, amazon_url, author, language, pages, publisher, title, year}  */

  describe("POST /books/", function () {
    test("can create book", async function () {
      let response = await request(app)
        .post("/books")
        .send({
          isbn: "978-1612197494",
          amazon_url: "https://www.amazon.com/How-Do-Nothing-Resisting-Attention-ebook/dp/B07FLNFRGK/ref=sr_1_1?dchild=1&keywords=how+to+do+nothing&qid=1586904745&sr=8-1",
          author: "Jenny Odell",
          language: "English",
          pages: 256,
          publisher: "Melville House",
          title: "How to Do Nothing: Resisting the Attention Economy",
          year: 2019
        });

      debugger

      expect(response.statusCode).toBe(201);
      expect(response.body.book).toHaveProperty("isbn");

      // const getBooksResponse = await request(app).get(`/books`)
      // expect(getBooksResponse.body.books[0].isbn).toEqual("978-1612197494")
    });

  });
});


afterAll(async function () {
  await db.end();
});
