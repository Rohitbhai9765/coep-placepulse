import { useState } from "react";

import { Upload } from "lucide-react";

import { importStudents } from "@/services/importStudentApi";

const ImportStudents = () => {
  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const handleImport = async () => {
    if (!file) {
      alert("Please choose an Excel file.");
      return;
    }

    try {
      setLoading(true);

      const result = await importStudents(file);

      alert(
        `Import Successful!\n\nImported: ${result.data.imported}\nSkipped: ${result.data.skipped}`
      );

    } catch (error) {
      console.error(error);
      alert("Import failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8">

      <div>

        <h1 className="text-4xl font-bold">
          Import Students
        </h1>

        <p className="mt-2 text-zinc-500">
          Upload an Excel file to create student accounts.
        </p>

      </div>

      <div className="rounded-3xl border border-zinc-800 bg-[#18181B] p-8">

        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={(e) =>
            setFile(
              e.target.files
                ? e.target.files[0]
                : null
            )
          }
          className="mb-6 w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3"
        />

        <button
          onClick={handleImport}
          disabled={loading}
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-violet-600 py-3 text-lg font-semibold transition hover:bg-violet-500 disabled:opacity-60"
        >
          <Upload size={20} />

          {loading
            ? "Importing..."
            : "Import Students"}
        </button>

      </div>

    </div>
  );
};

export default ImportStudents;