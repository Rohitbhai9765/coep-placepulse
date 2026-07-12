import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CompanyForm from "@/components/admin/CompanyForm";
import { getCompany } from "@/services/companyApi";
import type { Company } from "@/types/company";

const EditCompany = () => {
  const { id } = useParams();

  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchCompany(id);
    }
  }, [id]);

  const fetchCompany = async (companyId: string) => {
    try {
      const data = await getCompany(companyId);
      setCompany(data);
    } catch (error) {
      console.error(error);
      alert("❌ Unable to load company.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-xl">
        Loading company...
      </div>
    );
  }

  if (!company) {
    return (
      <div className="text-xl">
        Company not found.
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-5xl font-bold">
          Edit Company
        </h1>

        <p className="mt-2 text-zinc-500">
          Update company information.
        </p>

      </div>

      <CompanyForm company={company} />

    </div>
  );
};

export default EditCompany;