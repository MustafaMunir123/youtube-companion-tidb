'use client';

export const TableSkeleton = ({ numberOfRows = 5 }: { numberOfRows: number }) => {
  const rows: number[] = [];

  for (let i = 0; i < numberOfRows; i++) {
    rows.push(i);
  }

  return (
    <div className="w-full mx-auto">
      <div className="animate-pulse flex flex-col">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-200">
          <div className="h-2.5 bg-slate-200 rounded-md col-span-3"></div>
          <div className="h-2.5 bg-slate-200 rounded-md col-span-7"></div>
          <div className="h-2.5 bg-slate-200 rounded-md col-span-2"></div>
        </div>
        {rows.map(function (row, i) {
          return (
            <div key={i} className="grid grid-cols-12 gap-4 p-4 border-b border-gray-200">
              <div className="h-2 bg-slate-200 rounded-md col-span-3"></div>
              <div className="h-2 bg-slate-200 rounded-md col-span-7"></div>
              <div className="h-2 bg-slate-200 rounded-md col-span-2"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
