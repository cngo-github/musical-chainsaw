import Form from "next/form";
import SearchFormResetButton from "@/components/SearchForm/SearchFormResetButton";
import { Search } from "lucide-react";

export interface SearchFormProps {
  query?: string;
}

export default function SearchForm({ query }: SearchFormProps) {
  return (
    <Form action="/" scroll={false} className="search-form">
      <input
        name="query"
        defaultValue={query}
        className="search-input"
        placeholder="Search Startups"
      />
      <div className="flex gap-2">
        {query && <SearchFormResetButton />}

        <button type="submit" className="search-btn text-white">
          <Search className="size-5" />
        </button>
      </div>
    </Form>
  );
}
