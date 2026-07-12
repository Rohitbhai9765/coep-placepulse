import type { Company } from "@/types/company";
import CompanyCard from "./CompanyCard";

interface Props {
  companies: Company[];
}

const CompanyGrid = ({ companies }: Props) => {



  if (!Array.isArray(companies)) {
    return <div>Not an array</div>;
  }

  if (companies.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-zinc-700 py-20 text-center">
        <h2>No companies found</h2>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {companies.map((company) => (
        <CompanyCard
          key={company._id}
          company={company}
        />
      ))}
    </div>
  );
};

export default CompanyGrid;