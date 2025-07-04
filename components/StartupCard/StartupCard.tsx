import { formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Author, Startup } from "@/sanity/sanity.types";

export type CompanyInfo = Omit<
  Startup,
  "author" | "_type" | "_updatedAt" | "_rev"
> & { author?: Author };

export interface StartupCardProps {
  info: CompanyInfo;
}

export default function StartupCard({ info }: StartupCardProps) {
  const {
    _createdAt: createdAt,
    _id: id,
    author,
    category,
    description,
    image,
    title,
    views,
  } = info;

  return (
    <li className="startup-card group">
      <div className="flex justify-between items-center">
        <p className="startup-card_date">{formatDate(createdAt)}</p>

        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-16-medium">{views}</span>
        </div>
      </div>

      <div className="flex justify-between mt-5 gap-5 items-center">
        <div className="flex-1">
          <Link href={`/users/${author?._id}`}>
            <p className="text-16-medium line-clamp-1">{author?.name}</p>
          </Link>
          <Link href={`/startup/${id}`}>
            <h3 className="text-26-semibold line-clamp-1">{title}</h3>
          </Link>
        </div>

        <Link href={`/users/${author?._id}`}>
          <Image
            src={author?.image ?? ""}
            alt="placeholder"
            width={48}
            height={48}
            className="rounded-full"
          />
        </Link>
      </div>

      <Link href={`/startup/${id}`}>
        <p className="startup-card_desc">{description}</p>

        <img src={image} alt="placeholder" className="startup-card_img" />
      </Link>

      <div className="flex justify-between items-center gap-3 mt-5">
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className="text-16-medium">{category}</p>
        </Link>
        <Button className="startup-card_btn" asChild>
          <Link href={`/startup/${id}`}>
            <span>Details</span>
          </Link>
        </Button>
      </div>
    </li>
  );
}
