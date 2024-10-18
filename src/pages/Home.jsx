import PageHeader from "../components/PageHeader";
import DenseTable from "../components/Table";

const Home = () => {
  return (
    <div className="h-full px-10 py-4 flex flex-col gap-4">
      <PageHeader
        heading={"Home"}
        subHeading={
          "Welcome to the directory viewer, just as it used to be in the 90s. :)"
        }
      />
      <hr />
      <p className="text-xl text-blue-800 font-medium">Recently added users</p>
      <hr />
      <DenseTable />
    </div>
  );
};

export default Home;
