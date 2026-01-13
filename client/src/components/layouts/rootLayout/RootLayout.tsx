import Navbar from '../../Navbar'
import Footer from '../../Footer'
import { Outlet } from 'react-router'
import Topbar from '../../ui/navbar/Topbar'

function RootLayout() {
  return (
    <>
    <Topbar/>
   <Navbar/>
   <Outlet/>
   <Footer/>
   </>
  )
}

export default RootLayout