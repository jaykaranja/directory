import { useState, useEffect } from "react";
import Button from "../components/Button";
import DataTable from "../components/Table";
import { FaPlus } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import _service from "../utils/AxiosInstance";
import { useDispatch, useSelector } from "react-redux";
import {
  initiateUsers,
} from "../utils/redux/actions";
import AddUser from "../components/AddUser";

const Users = () => {
  const [pageState, setPageState] = useState("idle");
  const [error, seterror] = useState(null)
  const localUsers = useSelector((state) => state.users);
  const [selectedUser, setselectedUser] = useState(null);
  const dispatch = useDispatch();

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
          onClick={() => setPageState("adding")}
          title={"Add"}
          key={1}
        />
        {/* <Button
          icon={<MdModeEdit fontSize={20} color="blue" />}
          onClick={() => setPageState("editing")}
          title={"Edit"}
          key={2}
        />
        <Button
          icon={<HiMiniXMark fontSize={20} color="red" />}
          onClick={() => setPageState("deleting")}
          title={"Delete"}
          key={3}
        /> */}
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
            data={localUsers}
            onUserSelect={setselectedUser}
            handlePageState={setPageState}
          />
        )}
      </div>
      {/* Handle user adding or editing */}
      {(pageState === "adding" || pageState === "editing") ? (
        <div className="h-[97%] w-full text-white bg-black/50 absolute flex items-center">
          <div className="flex-1"></div>
          <AddUser handlePageState={setPageState} selectedUser={selectedUser} handleSelectedUser={setselectedUser} />
        </div>
      ) : null}

    </div>
  );
};

export default Users;
