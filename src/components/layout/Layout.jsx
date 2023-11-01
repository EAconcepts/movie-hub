import React from 'react'
import Footer from '../Footer'
import TopNav from '../TopNav'

const Layout = ({ children }) => {
  return (
    <div className="">
      <TopNav />
      <div className="">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout