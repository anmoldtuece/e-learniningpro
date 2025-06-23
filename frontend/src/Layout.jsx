import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from './Pages/Footer/Footer';

function Layout() {
  const location = useLocation();

  const hideFooterRoutes = [
    '/admin/',
    '/Student/Dashboard',
    '/Teacher/Dashboard',
  ];

  const shouldHideFooter = hideFooterRoutes.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      <Outlet />
      {!shouldHideFooter && <Footer />}
    </>
  );
}

export default Layout;
