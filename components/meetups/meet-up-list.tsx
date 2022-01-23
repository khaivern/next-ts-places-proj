import React from 'react';
import { MeetUp } from '../../interfaces';
import MeetUpItem from './meet-up-item';

import classes from './meet-up-list.module.css';

type MeetUpListProps = {
  meetups: MeetUp[];
};

const MeetUpList = ({ meetups }: MeetUpListProps) => {
  return (
    <ul className={classes.list}>
      {meetups.map((mp) => (
        <MeetUpItem
          key={mp.id}
          id={mp.id}
          title={mp.title}
          address={mp.address}
          image={mp.image}
          description={mp.description}
        />
      ))}
    </ul>
  );
};

export default MeetUpList;
