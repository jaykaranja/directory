import { useState, useMemo, useEffect, useCallback } from "react";
import DataTable from "../components/Table";
import PageHeader from "../components/PageHeader";
import _service from "../utils/AxiosInstance";
import AddUser from "../components/AddUser";
import { TextBox } from "devextreme-react";
import useLocalStorage from "../hooks/useLocalStorage";

const Search = () => {
  const handler = useLocalStorage()
  const [pageState, setPageState] = useState("idle");
  const [selectedUser, setselectedUser] = useState(null);
  const [searchArgs, setSearchArgs] = useState(null);
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

  const searchFunction = useCallback(
    (e) => e ? handler.users.filter(item => item.email.toLowerCase().includes(e.toLowerCase())) : [],
    [handler.users],
  )
  

  const searchedUsers = useMemo(() => {
    return searchArgs ? searchFunction(searchArgs) : handler.users;
  }, [searchArgs, handler.users]);

  const handleSelectedUser = useCallback((e) => setselectedUser(e), [])
  const handlePageState = useCallback((e) => setPageState(e), [])



  return (
    <div className="h-[99%] border-box py-4 flex flex-col gap-4 relative">
      <PageHeader
        heading={"Search users"}
        subHeading={"Type any characters to filter users per their email addresses."}
      />
      <hr />
      <div className="flex items-center gap-4 px-8">
        <TextBox 
          width={750}
          height={50}
          label="Search email..."
          placeholder="Enter email here to search for users"
          labelMode="hidden"
          onValueChanged={useCallback((e) => setSearchArgs(e.value), [])}
        />
        <button className="bg-blue-800/80 active:bg-blue-800 rounded shadow hover:bg-blue-800/90 transition duration-150 px-6 py-2 h-[50px] text-white text-sm" onClick={useCallback(
          () => {
            setSearchArgs(null)
          },
          [],
        )
        }>Clear</button>
      </div>
      <hr />
      <div className="px-4">
        <DataTable
          data={searchedUsers}
          onUserSelect={handleSelectedUser}
          handlePageState={handlePageState}
        />
      </div>
      {/* Handle user adding or editing */}
      {pageState === "adding" || pageState === "editing" ? (
        <div className="h-[97%] w-full text-white bg-black/50 absolute flex items-center">
          <div className="flex-1"></div>
          <AddUser
            handlePageState={handlePageState}
            selectedUser={selectedUser}
            handleSelectedUser={handleSelectedUser}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Search;
