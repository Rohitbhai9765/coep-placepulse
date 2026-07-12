interface Props {
  status: string;
  setStatus: (status: string) => void;
}

const CompanyFilters = ({ status, setStatus }: Props) => {
  return (
    <select
      value={status}
      onChange={(e) => setStatus(e.target.value)}
      className="w-full rounded-2xl border border-zinc-800 bg-[#18181B] px-4 py-3 text-white outline-none focus:border-violet-500"
    >
      <option value="All">All Companies</option>
      <option value="Upcoming">Upcoming</option>
      <option value="Ongoing">Ongoing</option>
      <option value="Completed">Completed</option>
    </select>
  );
};

export default CompanyFilters;
