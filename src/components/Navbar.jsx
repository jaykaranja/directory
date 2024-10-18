import { useNavigate } from "react-router-dom"
import NavBtn from "./NabBtn"
import { useCallback, memo } from "react"

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <div className="h-[60px] py-4 px-10 flex justify-between border-b border-b-1 shadow-b">
        <div className="font-bold text-2xl text-blue-800" onClick={useCallback(() => navigate("/"), [])}>Directory</div>
        <div className="flex gap-4">
            <NavBtn onClick={useCallback(() => navigate("/"), [])} title={"Users"} />
            <NavBtn onClick={useCallback(() => navigate("/search"), [])} title={"Search users"} />
        </div>
    </div>
  )
}

export default memo(Navbar)