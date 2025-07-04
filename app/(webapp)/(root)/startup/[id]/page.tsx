import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import { Author, Startup } from "@/sanity/sanity.types";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import markdownit from "markdown-it";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View/View";

export interface StartupProps {
  params: Promise<{ id: string }>;
}

type StartupData = Omit<Startup, "author"> & { author?: Author };

export default async function StartupDetails({ params }: StartupProps) {
  const { id } = await params;
  const data = (await client.fetch(STARTUP_BY_ID_QUERY, { id })) as
    | StartupData
    | undefined;

  if (!data) {
    return notFound();
  }

  const md = markdownit();
  const parsedPitch = md.render(data.pitch ?? "");

  return (
    <>
      <section className="pink_container pattern !min-h-[230px]">
        <p className="tag tag-tri">{formatDate(data._createdAt)}</p>
        <h1 className="heading">{data.title}</h1>
        <p className="sub-heading !max-w-5xl">{data.description}</p>
      </section>

      <section className="section_container">
        <img
          src={data.image ?? ""}
          alt="thmbnail"
          className="w-full rounded-full h-auto"
        />
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex justify-between gap-5 items-center">
            <Link
              href={`/user/${data.author?._id}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={data.author?.image ?? ""}
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
                alt="Author"
              />

              <div>
                <p className="text-20-medium">{data.author?.name}</p>
                <p className="text-16-medium !text-black-300">
                  {data.author?.username}
                </p>
              </div>
            </Link>

            <p className="category-tag">{data.category}</p>
          </div>

          <h3 className="text-30-bold">Pitch Details</h3>
          {parsedPitch ? (
            <article
              className="prose max-w-4xl font-work-sans break-all"
              dangerouslySetInnerHTML={{ __html: parsedPitch }}
            />
          ) : (
            <p className="no-result">No details provided.</p>
          )}
        </div>

        <hr className="divider" />

        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View id={id} />
        </Suspense>
      </section>
    </>
  );
}
