export const HeaderSkeleton = () => {
  return (
    <div className="flex flex-col w-full min-h-[52px]">
      <div className="animate-pulse flex">
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-4">
            <div className="h-2 bg-slate-400 rounded col-span-12 w-full"></div>
            <div className="h-2 bg-slate-400 rounded col-span-10 w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
