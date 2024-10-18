import { useNavigate } from "react-router-dom"
import NavBtn from "./NabBtn"

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <div className="h-[60px] py-4 px-10 flex justify-between border-b border-b-1 shadow-b">
        <div className="flex gap-4">
            <NavBtn onClick={() => navigate("/")} title={"Home"} />
            <NavBtn onClick={() => navigate("/users")} title={"Users"} />
            <NavBtn title={"Help"} />
        </div>
        <div className="font-bold text-lg text-gray-900" onClick={() => navigate("/")}>Directory</div>
        <div className="flex gap-4">
            <NavBtn onClick={() => navigate("/users")} title={"Users"} />
            <NavBtn title={"Help"} />
        </div>
    </div>
  )
}

export default Navbar