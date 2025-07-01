import Link from "next/link";

export default function Users() {
  return (
    <>
      <h1>Users Dashboard</h1>

      <ul>
        {[1, 2, 3, 4, 5].map((userId) => (
          <li>
            <Link href={`/dashboard/users/${userId}`}>{`User ${userId}`}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
