import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";

export interface StartupProps {
  params: Promise<{ id: string }>;
}

export default async function Startup({ params }: StartupProps) {
  const { id } = await params;
  const data = await client.fetch(STARTUP_BY_ID_QUERY, { id });

  if (!data) {
    return notFound();
  }

  return (
    <>
      <h1 className="text-3xl">{data.title}</h1>
    </>
  );
}
