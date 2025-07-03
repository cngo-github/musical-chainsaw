import SearchForm from "@/components/SearchForm/SearchForm";
import StartupCard, { CompanyInfo } from "@/components/StartupCard/StartupCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";

export interface HomeProps {
  searchParams: Promise<{ query?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { query } = await searchParams;
  const { data } = (await sanityFetch({
    query: STARTUPS_QUERY,
    params: { search: query ?? null },
  })) as unknown as { data: CompanyInfo[] };

  return (
    <>
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

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for ${query}` : "All Startups"}
        </p>

        <ul className="mt-7 card_grid">
          {data.length > 0
            ? data.map((entry) => <StartupCard info={entry} key={entry._id} />)
            : null}
        </ul>
      </section>
      <SanityLive />
    </>
  );
}
