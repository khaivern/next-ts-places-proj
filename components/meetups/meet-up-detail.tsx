import Image from 'next/image';
import React from 'react';
import { MeetUp } from '../../interfaces';

import classes from './meet-up-detail.module.css'

const MeetUpDetailsPage = ({image, title, address, description}: MeetUp) => {
  return (
    <section className={classes.detail}>
      <Image src={image} alt={title} height={320} width={640} />
      <h1>{title}</h1>
      <address>{address}</address>
      <p>
        {description}
      </p>
    </section>
  );
};

export default MeetUpDetailsPage;
