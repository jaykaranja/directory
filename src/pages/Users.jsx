import { useState, useEffect, useCallback } from "react";
import Button from "../components/Button";
import DataTable from "../components/Table";
import { FaPlus } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import _service from "../utils/AxiosInstance";
import AddUser from "../components/AddUser";
import useLocalStorage from "../hooks/useLocalStorage";

const Users = () => {
  const [pageState, setPageState] = useState("idle");
  const [error, seterror] = useState(null)
  const handler = useLocalStorage()
  const [selectedUser, setselectedUser] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        // throw new Error("Simulation of a data fetch error")
        let res = await _service.get("users");
        if (res.data) {
          handler.initialize(res.data);
        }
      } catch (ex) {
        console.log(ex)
        seterror(ex)
      }
    };

    if (handler.users.length <= 0) {
      getUsers();
    }
  }, []);

  const handleSelectedUser = useCallback((e) => setselectedUser(e), [])
  const handlePageState = useCallback((e) => setPageState(e), [])



  return (
    <div className="h-[99%] border-box py-4 flex flex-col gap-4 relative">
      <PageHeader
        heading={"Users"}
        subHeading={"Check out all users saved in your directory here."}
      />
      <hr />
      <div className="flex gap-4 px-8">
        <Button
          icon={<FaPlus fontSize={20} color="green" />}
          onClick={useCallback(() => handlePageState("adding"), [])}
          title={"Add"}
          key={1}
        />
      </div>
      <hr />
      <div className="px-4">
        {error ? (
          <div className="h-full w-full flex flex-col gap-4 justify-center items-center">
            <p className="text-lg text-blue-800">Oops! Something went wrong.</p>
            <p className="text-sm text-gray-800">There was an unexpected problem while fetching the users. Try again later.</p>
          </div>
        ) : (
          <DataTable
            data={handler.users}
            onUserSelect={handleSelectedUser}
            handlePageState={handlePageState}
          />
        )}
      </div>
      {/* Handle user adding or editing */}
      {(pageState === "adding" || pageState === "editing") ? (
        <div className="h-[97%] w-full text-white bg-black/50 absolute flex items-center">
          <div className="flex-1"></div>
          <AddUser handlePageState={handlePageState} selectedUser={selectedUser} handleSelectedUser={handleSelectedUser} />
        </div>
      ) : null}

    </div>
  );
};

export default Users;
