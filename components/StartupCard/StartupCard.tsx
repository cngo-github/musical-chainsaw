import { formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

export interface StartupInfo {
  _createdAt: string;
  author: { _id: number; name: string };
  category: string;
  description: string;
  id: number;
  image: string;
  title: string;
  views: number;
}

export interface StartupCardProps {
  info: StartupInfo;
}

export default function StartupCard({ info }: StartupCardProps) {
  const {
    _createdAt: createdAt,
    author: { _id: authorId, name: authorName },
    category,
    description,
    id,
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
          <Link href={`/users/${authorId}`}>
            <p className="text-16-medium line-clamp-1">{authorName}</p>
          </Link>
          <Link href={`/startup/${id}`}>
            <h3 className="text-26-semibold line-clamp-1">{title}</h3>
          </Link>
        </div>

        <Link href={`/users/${authorId}`}>
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
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
        <Link href={`/?query=${category.toLowerCase()}`}>
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
