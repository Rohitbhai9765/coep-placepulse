import { Search } from "lucide-react";

interface Props {
  search: string;
  setSearch: (value: string) => void;
}

const CompanySearch = ({ search, setSearch }: Props) => {
  return (
    <div className="relative w-full">

      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
      />

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search companies..."
        className="w-full rounded-2xl border border-zinc-800 bg-[#18181B] py-3 pl-12 pr-4 outline-none transition focus:border-violet-500"
      />

    </div>
  );
};

export default CompanySearch;