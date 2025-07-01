interface Album {
  id: number;
  title: string;
  userId: number;
}

export default async function Home() {
  const response = await fetch("https://jsonplaceholder.typicode.com/albums");
  if (!response.ok) {
    throw new Error("API call failed.");
  }

  const albums: Album[] = await response.json();

  return (
    <ul>
      {albums.map(({ id, title }) => (
        <li key={id}>
          <h3>{id}</h3>
          <p>{title}</p>
        </li>
      ))}
    </ul>
  );
}
