import { auth } from "@/app/auth";
import { StartupCardSkeleton } from "@/components/StartupCard/StartupCard";
import { Skeleton } from "@/components/ui/skeleton";
import UserStartups from "@/components/UserStartups/UserStartups";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export interface UserProfileProps {
  params: Promise<{ id: string }>;
}

export default async function UserProfile({ params }: UserProfileProps) {
  const { id } = await params;
  const session = await auth();
  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });

  if (!user) {
    return notFound();
  }

  const { bio, image, name, username } = user;

  return (
    <>
      <section className="profile_container">
        <div className="profile_card">
          <div className="profile_title">
            <h3 className="text-24-black uppercase text-center line-clamp-1">
              {name}
            </h3>
          </div>

          <Image src={image ?? ""} alt={name ?? ""} width={220} height={220} />

          <p className="text-30-extrabold mt-7 text-center">@{username}</p>
          <p className="mt-1 text-center text-14-normal">{bio}</p>
        </div>

        <div className="flex flex-1 flex-col gap-5 lg:-mt-5">
          <p className="text-30-bold">
            {(session as any)?.id === id ? "Your" : "All"} Startups
          </p>

          <ul className="card_grid-sm">
            <Suspense fallback={<StartupCardSkeleton />}>
              <UserStartups authorId={id} />
            </Suspense>
          </ul>
        </div>
      </section>
    </>
  );
}
