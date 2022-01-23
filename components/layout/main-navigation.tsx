import Link from 'next/link';
import React from 'react';

import classes from './main-navigation.module.css';
const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href='/'>React Meetups</Link>
      </div>
      <nav className={classes.links}>
        <ul>
          <li>
            <Link href='/'>All Meetups</Link>
          </li>
          <li>
            <Link href='/meetup/new-meetup'>Add New Meetup</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
