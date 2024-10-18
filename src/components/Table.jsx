import { Column, DataGrid } from "devextreme-react/data-grid";
import { useCallback } from "react";
import { MdEdit } from "react-icons/md";
import { IoTrashOutline } from "react-icons/io5";
import { deleteUser } from '../utils/redux/actions'
import { useDispatch } from "react-redux";
import toast from 'react-hot-toast'

export default function DataTable({ data, onUserSelect, handlePageState }) {
  const dispatch = useDispatch()
  const onDelete = useCallback(
    (e) => {
      if (window.confirm(`Are you sure you want to delete user ${e.data.email}?`)) {
        dispatch(deleteUser(e.data.email))
        toast.success(`User ${e.data.email} has been deleted successfully.`)
      }
    },
    [dispatch],
  )
  
  const onEdit = useCallback(
    (e) => {
      onUserSelect(e.data)
      handlePageState("editing")
    },
    [handlePageState, onUserSelect],
  )
  

  const ActionsBay = useCallback(
    (e) => (
      <div className="flex gap-4 justify-center">
        <div><MdEdit onClick={() => onEdit(e)} fontSize={20} className='text-[#0000ff]/50 hover:text-[#0000ff] cursor-pointer' /></div>
        <div><IoTrashOutline onClick={() => onDelete(e)} fontSize={20} className='text-red-300 hover:text-red-500 cursor-pointer' /></div>
      </div>
    ),
    [onDelete, onEdit],
  )
  
  return (
    <DataGrid dataSource={data} keyExpr={"email"} focusedRowEnabled={true} >
      {/* <Column dataField="id" caption="ID" width={150} /> */}
      <Column dataField="name" caption="Name" />
      <Column dataField="email" caption="Email" />
      <Column dataField="phone" caption="Phone" />
      <Column cellRender={ActionsBay} alignment="center" width={150} caption="Actions" />
    </DataGrid>
  );
}

