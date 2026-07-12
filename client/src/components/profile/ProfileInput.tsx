import type { ReactNode } from "react";

interface ProfileInputProps {
  icon: ReactNode;
  label: string;
  value: any;
  readOnly?: boolean;
}

const ProfileInput = ({
  icon,
  label,
  value,
  readOnly = true,
}: ProfileInputProps) => {
  return (
    <div>

      <label className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-400">

        {icon}

        {label}

      </label>

      <input
        value={value ?? ""}
        disabled={readOnly}
        className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3 text-zinc-400"
      />

    </div>
  );
};

export default ProfileInput;