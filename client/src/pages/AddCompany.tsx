import CompanyForm from "@/components/admin/CompanyForm";

const AddCompany = () => {
  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-5xl font-bold">
          Add Company
        </h1>

        <p className="mt-2 text-zinc-500">
          Create a new placement opportunity.
        </p>

      </div>

      <CompanyForm />

    </div>
  );
};

export default AddCompany;