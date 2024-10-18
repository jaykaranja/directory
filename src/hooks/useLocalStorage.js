import { useDispatch, useSelector } from "react-redux";
import { initiateUsers, addUser, deleteUser, updateUser } from '../utils/redux/actions'


const useLocalStorage = () => {
    const dispatch = useDispatch()
    const localUsers = useSelector((state) => state.users);
    const update = (email, updatedUser) => dispatch(updateUser(email, updatedUser))
    const initialize = (e) => dispatch(initiateUsers(e))
    const deleteFunc = (e) => dispatch(deleteUser(e))
    const add = (e) => dispatch(addUser(e))
    return {
        users: localUsers,
        update,
        initialize,
        deleteFunc,
        add
    }
}

export default useLocalStorage;