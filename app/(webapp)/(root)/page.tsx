import SearchForm from "@/components/SearchForm/SearchForm";

export interface HomeProps {
  searchParams: Promise<{ query?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const { query } = params;

  return (
    <section className="pink_container pattern">
      <h1 className="heading">
        Pitch Your Startup
        <br />
        Connect With Entrepenuers
      </h1>

      <p className="sub-heading !max-w-3xl">
        Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
      </p>

      <SearchForm query={query} />
    </section>
  );
}
