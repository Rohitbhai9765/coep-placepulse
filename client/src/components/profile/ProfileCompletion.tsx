interface Props {
  completion: number;
}

const ProfileCompletion = ({
  completion,
}: Props) => {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-[#18181B] p-4 sm:p-6 lg:p-8">

      <div className="flex items-start justify-between gap-4">

        <div className="min-w-0">

          <h2 className="text-2xl font-semibold">
            Profile Completion
          </h2>

          <p className="mt-2 text-zinc-500">
            Complete your profile before placement
            season to improve your visibility.
          </p>

        </div>

        <div className="shrink-0 text-right">

          <p className="text-4xl font-bold text-violet-400">
            {completion}%
          </p>

          <p className="mt-1 text-sm text-zinc-500">
            Completed
          </p>

        </div>

      </div>

      <div className="mt-6 h-4 overflow-hidden rounded-full bg-zinc-800">

        <div
          className="h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 transition-all duration-700"
          style={{
            width: `${completion}%`,
          }}
        />

      </div>

      <div className="mt-5 flex justify-between gap-3 text-sm text-zinc-500">

        <span>0%</span>

        <span className="text-center">Complete your profile</span>

        <span>100%</span>

      </div>

    </div>
  );
};

export default ProfileCompletion;
