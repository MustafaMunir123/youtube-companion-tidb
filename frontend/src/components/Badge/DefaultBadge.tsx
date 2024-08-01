import { IDefaultBadge } from './DefaultBadge.types';

export const DefaultBadge = ({ title }: IDefaultBadge) => {
  return (
    <>
      <span className="bg-gray-100 text-primary-500 text-xs mr-2 px-2 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300">
        {title}
      </span>
    </>
  );
};

export default DefaultBadge;
