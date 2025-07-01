import { Book } from "@/app/(backend)/api/books/db";
import Link from "next/link";

export default async function Users() {
  const response = await fetch("http://localhost:3000/api/books");
  if (!response.ok) {
    throw new Error("API call failed.");
  }

  const books: Book[] = await response.json();

  return (
    <>
      <h1>Books Dashboard</h1>

      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <Link href={`/dashboard/books/${book.id}`}>{book.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
