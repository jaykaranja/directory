const PageHeader = ({ heading, subHeading }) => {
  return (
    <div className="flex flex-col gap-2 px-8">
      <div className="text-3xl font-semibold text-blue-800">{heading}</div>
      <div className="text-xl font-semibold text-gray-800">{subHeading}</div>
    </div>
  );
};

export default PageHeader;
