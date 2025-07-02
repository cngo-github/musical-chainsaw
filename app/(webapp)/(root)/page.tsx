import SearchForm from "@/components/SearchForm/SearchForm";
import StartupCard, { StartupInfo } from "@/components/StartupCard/StartupCard";

export interface HomeProps {
  searchParams: Promise<{ query?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const { query } = params;
  const posts: StartupInfo[] = [
    {
      _createdAt: new Date().toISOString(),
      views: 55,
      author: { _id: 1, name: "Elon Musk" },
      id: 1,
      description: "A description",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk9VkegNiHILqyD398ELCg3F7XKlXRYARF9g&s",
      category: "Robots",
      title: "We Robots",
    },
  ];

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
          {posts.length > 0
            ? posts.map((entry, i) => (
                <StartupCard info={entry} key={entry.id} />
              ))
            : null}
        </ul>
      </section>
    </>
  );
}
