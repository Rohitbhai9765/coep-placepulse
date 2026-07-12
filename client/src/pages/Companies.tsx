import { useEffect, useState } from "react";

import CompanyGrid from "@/components/companies/CompanyGrid";
import CompanySearch from "@/components/companies/CompanySearch";
import CompanyFilters from "@/components/companies/CompanyFilters";

import type { Company } from "@/types/company";

import { getCompanies } from "@/services/companyApi";


const Companies = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompanies();
  }, []);

  useEffect(() => {
    let data = companies;

    if (search) {
      data = data.filter((company) =>
        company.name
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (status !== "All") {
      data = data.filter(
        (company) => company.status === status
      );
    }

    setFilteredCompanies(data);
  }, [companies, search, status]);

  const fetchCompanies = async () => {
    try {
      const data = await getCompanies();


      setCompanies(data);

      setFilteredCompanies(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-xl">
        Loading companies...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-5xl font-bold">
          Companies
        </h1>

        <p className="mt-2 text-zinc-500">
          Browse all companies visiting COEP.
        </p>

      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_220px]">

        <CompanySearch
          search={search}
          setSearch={setSearch}
        />

        <CompanyFilters
          status={status}
          setStatus={setStatus}
        />

      </div>

      <CompanyGrid companies={filteredCompanies} />

    </div>
  );
};

export default Companies;