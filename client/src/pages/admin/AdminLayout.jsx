
import { Outlet } from "react-router-dom"
import Navbar from "../../components/navbars/Navbar"
import SideNavbarAdmin from "../../components/navbars/SideNavbarAdmin"


const AdminLayout = () => {

 


  return (
    <>
    <div className="w-full h-screen bg-red-00">
    <Navbar    categoryName='Admin Dashboard'/>
    <div className="h-full w-full flex-row  flex ">
          <div className="w-[70px]  md:w-[19%] h-full ">

            <SideNavbarAdmin />
          </div>
          <div className="h-full w-full md:w-[80%]  pt-16">
          <Outlet />
          </div>
        </div>
    </div>
    </>
  )
}

export default AdminLayout
