export interface UserDetailsParams {
  params: {
    id: string;
  };
}

export default function UserDetails({ params }: UserDetailsParams) {
  const { id } = params;

  return (
    <>
      <h1>Book Details for Book {`${id}`}</h1>
    </>
  );
}
