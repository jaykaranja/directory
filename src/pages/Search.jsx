import { useState, useMemo, useEffect, useCallback } from "react";
import DataTable from "../components/Table";
import PageHeader from "../components/PageHeader";
import _service from "../utils/AxiosInstance";
import { useDispatch, useSelector } from "react-redux";
import AddUser from "../components/AddUser";
import { TextBox } from "devextreme-react";

const Search = () => {
  const localUsers = useSelector((state) => state.users);
  const [pageState, setPageState] = useState("idle");
  const [selectedUser, setselectedUser] = useState(null);
  const [searchArgs, setSearchArgs] = useState(null);
  const dispatch = useDispatch()
  useEffect(() => {
    const getUsers = async () => {
      try {
        // throw new Error("Simulation of a data fetch error")
        let res = await _service.get("users");
        if (res.data) {
          dispatch(initiateUsers(res.data));
        }
      } catch (ex) {
        console.log(ex)
        seterror(ex)
      }
    };

    if (localUsers.length <= 0) {
      getUsers();
    }
  }, [localUsers, dispatch]);

  const searchFunction = useCallback(
    (e) => e ? localUsers.filter(item => item.email.toLowerCase().includes(e.toLowerCase())) : [],
    [],
  )
  

  const searchedUsers = useMemo(() => {
    return searchArgs ? searchFunction(searchArgs) : localUsers;
  }, [searchArgs, localUsers]);



  return (
    <div className="h-[99%] border-box py-4 flex flex-col gap-4 relative">
      <PageHeader
        heading={"Search users"}
        subHeading={"Type any characters to filter users per their email addresses."}
      />
      <hr />
      <div className="flex gap-4 px-8">
        <TextBox 
          width={750}
          height={50}
          label="Search email..."
          labelMode="floating"
          onValueChanged={(e) => setSearchArgs(e.value)}
        />
      </div>
      <hr />
      <div className="px-4">
        <DataTable
          data={searchedUsers}
          onUserSelect={setselectedUser}
          handlePageState={setPageState}
        />
      </div>
      {/* Handle user adding or editing */}
      {pageState === "adding" || pageState === "editing" ? (
        <div className="h-[97%] w-full text-white bg-black/50 absolute flex items-center">
          <div className="flex-1"></div>
          <AddUser
            handlePageState={setPageState}
            selectedUser={selectedUser}
            handleSelectedUser={setselectedUser}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Search;
