import "server-only";

import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, writeToken } from "../env";

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token: writeToken,
});

if (!writeToken) {
  throw new Error("Write token not found.");
}
