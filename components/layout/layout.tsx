import React, { ReactNode } from 'react';

import MainNavigation from './main-navigation';
import classes from './layout.module.css'
type LayoutProps = {
  children?: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <MainNavigation />
      <main className={classes.main}>{children}</main>
    </div>
  );
};

export default Layout;
