import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Outlet } from 'react-router'
import Topbar from './components/ui/navbar/Topbar'

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