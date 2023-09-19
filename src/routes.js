const {
  addBookHundler,
  getAllBookshandler,
  getBooksById,
  editBooksById,
  deletedBooksByIdHandler,
} = require("./handler");
const routes = [
  {
    method: "POST",
    path: "/books",
    handler: addBookHundler,
  },
  {
    method: "GET",
    path: "/books",
    handler: getAllBookshandler,
  },
  {
    method: "GET",
    path: "/books/{id}",
    handler: getBooksById,
  },
  {
    method: "PUT",
    path: "/books/{id}",
    handler: editBooksById,
  },
  {
    method: "DELETE",
    path: "/books/{id}",
    handler: deletedBooksByIdHandler,
  },
];

module.exports = routes;
