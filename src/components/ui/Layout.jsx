import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../common/Header/Header'
import Footer from '../common/Footer/Footer'

function Layout() {
  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default Layout