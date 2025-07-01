import { books } from "@/app/(backend)/api/books/db";

export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  const { id: idStr } = await context.params;
  const id = +idStr;
  const book = await request.json();

  const index = books.findIndex((book) => book.id === id);
  books[index] = book;
  return Response.json(books);
}

export async function DELETE(_: Request, context: { params: { id: string } }) {
  const { id: idStr } = await context.params;
  const id = +idStr;

  const index = books.findIndex((book) => book.id === id);
  books.splice(index, 1);
  return Response.json(books);
}
