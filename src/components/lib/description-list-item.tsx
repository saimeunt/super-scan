import { type ReactNode } from "react";

const DescriptionListItem = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <div className="px-4 py-3 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
    <dt className="text-sm leading-6 font-medium">{title}</dt>
    <dd className="mt-1 flex items-center text-sm leading-6 font-medium sm:col-span-3 sm:mt-0">
      {children}
    </dd>
  </div>
);

export default DescriptionListItem;
