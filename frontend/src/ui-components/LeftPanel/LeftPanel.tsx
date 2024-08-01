export const LeftPanel = ({ description }: { description: string }) => {
  return (
    <div className="w-[450px] text-center">
      <span className="text-white text-xl laptop:text-3xl text-center font-bold capitalize tracking-wide">
        {description}
      </span>
    </div>
  );
};
