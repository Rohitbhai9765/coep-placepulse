import api from "./api";

export const importStudents = async (file: File) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post(
    "/students/import",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};