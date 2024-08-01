import { IEmptyState } from './EmptyState.types';

export const EmptyState = ({ emptyIcon, title, description }: IEmptyState) => {
  return (
    <>
      <div className="flex w-full flex-col items-center justify-center h-full tablet:h-[500px]">
        <div className="flex w-full flex-col items-center justify-center text-center gap-y-2 max-w-[400px]">
          {emptyIcon?.icon}
          <h3 className="text-2xl	font-semibold text-neutral-800">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </>
  );
};

export default EmptyState;
