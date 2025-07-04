import { client } from "@/sanity/lib/client";
import { STARTUPS_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import StartupCard, { CompanyInfo } from "../StartupCard/StartupCard";

export interface UserStartupsProps {
  authorId: string;
}

export default async function UserStartups({ authorId }: UserStartupsProps) {
  const startups = (await client
    .withConfig({ useCdn: false })
    .fetch(STARTUPS_BY_AUTHOR_QUERY, {
      id: authorId,
    })) as CompanyInfo[];

  return (
    <>
      {startups.length > 0 ? (
        startups.map((entry) => <StartupCard key={entry._id} info={entry} />)
      ) : (
        <p className="no-result">No posts yet</p>
      )}
    </>
  );
}
