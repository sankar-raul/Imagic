import Footer from '../../Footer'
import { Outlet } from 'react-router'
import Topbar from '../../ui/navbar/Topbar'
import Header from '@/components/shared/header/Header'

function RootLayout() {
  return (
    <>
    <Topbar/>
   <Header/>
   <Outlet/>
   <Footer/>
   </>
  )
}

export default RootLayout