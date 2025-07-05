"use server";

import slugify from "slugify";
import { auth } from "@/app/auth";
import { parseServerActionResponse } from "./utils";
import { writeClient } from "@/sanity/lib/writeClient";

export interface CreateStartupFormData {
  category: FormDataEntryValue;
  description: FormDataEntryValue;
  link: FormDataEntryValue;
  title: FormDataEntryValue;
  pitch: string;
}

export async function createStartup(form: CreateStartupFormData) {
  const session = await auth();

  if (!session) {
    parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });
  }

  const { title, description, category, link, pitch } = form;

  const slug = slugify(title.toString(), { lower: true, strict: true });

  try {
    const startup = {
      title,
      description,
      category,
      image: link,
      slug: {
        _type: slug,
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session?.id,
      },
      pitch,
    };

    const result = await writeClient.create({ _type: "startup", ...startup });

    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
}
