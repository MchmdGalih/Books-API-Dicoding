const { nanoid } = require("nanoid");
const books = require("./books");

const addBookHundler = (request, h) => {
  const {
    name,
    years,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  if (!name) {
    const response = h.response({
      status: "Gagal menambahkan buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message: `Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount`,
    });
    response.code(400);
    return response;
  }

  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    years,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  const isSucces = books.filter((book) => book.id === id).length > 0;

  if (isSucces) {
    const response = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Buku gagal di tambahkan",
  });
  response.code(500);
  return response;
};

const getAllBookshandler = (request, h) => {
  const { name, reading, finished } = request.query;

  let queryBooks = books;

  if (name) {
    queryBooks = queryBooks.filter(
      (book) => book.name.toLowerCase().includes(name.toLowerCase()) !== false
    );
  }

  if (reading) {
    queryBooks = queryBooks.filter(
      (book) => Number(book.reading) === Number(reading)
    );
  }

  if (finished) {
    queryBooks = queryBooks.filter(
      (book) => Number(book.finished) === Number(finished)
    );
  }

  const response = h.response({
    status: "success",
    data: {
      books: queryBooks.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  });
  response.code(200);
  return response;
};

const getBooksById = (request, h) => {
  const { id } = request.params;

  const bookId = books.find((b) => b.id === id);

  if (bookId) {
    const response = h.response({
      status: "success",
      data: {
        bookId,
      },
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  });
  response.code(404);
  return response;
};

const editBooksById = (request, h) => {
  const { id } = request.params;

  const {
    name,
    years,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  const updatedAt = new Date().toISOString();

  const index = books.findIndex((book) => book.id === id);

  if (!name) {
    const response = h.response({
      status: "fail",
      message: "Gagal memperbaharui buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message: `Gagal memperbaharui buku. readpage tidak boleh lebih besar dari pageCount`,
    });
    response.code(400);
    return response;
  }

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      years,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };
    const response = h.response({
      status: "success",
      message: "Buku berhasil diperbaharui",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Gagal memperbaharui buku. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

const deletedBooksByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "Buku berhasil dihapus",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Buku gagal dihapus. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

module.exports = {
  addBookHundler,
  getAllBookshandler,
  getBooksById,
  editBooksById,
  deletedBooksByIdHandler,
};
