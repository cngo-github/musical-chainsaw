import { books } from "@/app/(backend)/api/books/db";

export async function GET() {
  return Response.json(books);
}
