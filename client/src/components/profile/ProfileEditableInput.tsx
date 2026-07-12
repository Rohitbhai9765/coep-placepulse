import type { ReactNode } from "react";

interface EditableProps {
  icon: ReactNode;
  label: string;
  name: string;
  value: any;

  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;

  type?: string;
}

const ProfileEditableInput = ({
  icon,
  label,
  name,
  value,
  onChange,
  type = "text",
}: EditableProps) => {

  return (

    <div>

      <label className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-400">

        {icon}

        {label}

      </label>

      <input
        type={type}
        name={name}
        value={value ?? ""}
        onChange={onChange}
        className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3 text-white outline-none transition focus:border-violet-500"
      />

    </div>

  );

};

export default ProfileEditableInput;