import { client } from "@/sanity/lib/client";
import Ping from "./Ping";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import { Startup } from "@/sanity/sanity.types";
import { writeClient } from "@/sanity/lib/writeClient";
import { after } from "next/server";

type StartupViews = Omit<
  Startup,
  | "title"
  | "slug"
  | "_createdAt"
  | "author"
  | "category"
  | "description"
  | "image"
  | "pitch"
>;

export interface ViewProps {
  id: string;
}

export default async function View({ id }: ViewProps) {
  const { views: totalViews }: StartupViews = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUP_VIEWS_QUERY, { id });

  after(
    async () =>
      await writeClient
        .patch(id)
        .set({ views: totalViews ? totalViews + 1 : 1 })
        .commit()
  );

  return (
    <div className="view-container">
      <div className="absolute -top-0 -right-2">
        <Ping />
      </div>

      <p className="view-text">
        <span className="font-black">Views: {totalViews ?? 0}</span>
      </p>
    </div>
  );
}
