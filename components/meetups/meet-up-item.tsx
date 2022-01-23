import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { MeetUp } from '../../interfaces';
import Card from '../ui/card';

import classes from './meet-up-item.module.css';

const MeetUpItem = ({ image, title, address, id }: MeetUp) => {
  const router = useRouter();

  const showDetailsHandler = () => {
    router.push(`/meetup/${id}`)
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <Image src={image} alt={title} width={640} height={320} />
        </div>
        <div className={classes.content}>
          <h3>{title}</h3>
          <address>{address}</address>
        </div>
        <div className={classes.actions}>
          <button onClick={showDetailsHandler}>Show Details</button>
        </div>
      </Card>
    </li>
  );
};

export default MeetUpItem;
