import { useCallback, useReducer } from "react";
import { HiXMark } from "react-icons/hi2";
import { TextBox } from "devextreme-react/text-box";
import formReducer from "../utils/reducers/AddUserFormReducer";
import toast from "react-hot-toast";
import useLocalStorage from "../hooks/useLocalStorage";

const initialState = {
  name: "",
  email: "",
  phone: "",
};

const AddUser = ({ handlePageState, selectedUser, handleSelectedUser }) => {
  const [formState, dispatch] = useReducer(
    formReducer,
    selectedUser ? selectedUser : initialState
  );
  const handler = useLocalStorage()
  const handleChange = useCallback((e) => {
    dispatch({
      type: "UPDATE_FIELD",
      field: e.element.id,
      value: e.value,
    });
  }, []);

  const handleSubmit = useCallback(() => {
    try {
      if (!formState.name) {
        toast.error("Name must be provided.");
        return;
      }
      if (!formState.email) {
        toast.error("Email must be provided.");
        return;
      }
      if (!formState.phone) {
        toast.error("Phone number must be provided.");
        return;
      }
      if (!selectedUser && handler.users.find((e) => e.email === formState.email)) {
        toast.error(`User ${formState.email} already exists.`);
        return;
      }

      if (!selectedUser) {
        handler.add(formState)
      } else {
        handler.update(formState.email, formState)
      }

      handlePageState("idle");
      handleSelectedUser(null);
      toast.success(
        `User ${formState.email} has been ${
          selectedUser ? "updated" : "added"
        } successfully.`
      );
    } catch (ex) {
      console.log(ex);
      toast.error("Something went wrong. Try again later.");
    }
  }, [
    handleSelectedUser,
    formState,
    handlePageState,
    selectedUser,
  ]);

  return (
    <div className="flex-1 flex flex-col justify-between bg-white h-[95%] w-[90%] mr-2 shadow rounded">
      <div className="flex justify-between px-6 py-4">
        <p className="text-black font-semibold text-base">
          {selectedUser ? `Update ${formState.email}` : "Add user"}
        </p>
        <HiXMark
          color="black"
          fontSize={30}
          className="cursor-pointer"
          onClick={useCallback(() => {
            handleSelectedUser(null);
            handlePageState ? handlePageState("idle") : undefined;
          }, [handlePageState, handleSelectedUser])}
        />
      </div>
      <div className="flex flex-col gap-4 px-4 flex-1">
        <TextBox
          value={formState.name}
          onValueChanged={handleChange}
          caption={"Name"}
          labelMode="floating"
          label="Name"
          id="name"
        />
        <TextBox
          value={formState.email}
          onValueChanged={handleChange}
          caption={"Email"}
          labelMode="floating"
          label="Email address"
          id="email"
          disabled={!!selectedUser}
        />
        <TextBox
          value={formState.phone}
          onValueChanged={handleChange}
          caption={"Phone"}
          labelMode="floating"
          label="Phone number"
          id="phone"
        />
      </div>
      <div className="w-full flex gap-2 justify-end px-4">
        <button
          onClick={handleSubmit}
          className="bg-green-600 text-sm px-4 py-2 rounded shadow w-max mb-4"
        >
          {selectedUser ? "Update user" : "Add user"}
        </button>
        <button
          onClick={useCallback(() => {
            handlePageState("idle");
            handleSelectedUser(null);
          }, [handlePageState, handleSelectedUser])}
          className="bg-gray-600 text-white text-sm px-4 py-2 rounded shadow w-max mb-4"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddUser;
