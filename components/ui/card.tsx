import React, { ReactNode } from 'react';

import classes from './card.module.css';

type CardProps = {
  children: ReactNode;
};

const Card = ({ children }: CardProps) => {
  return <div className={classes.card}>{children}</div>;
};

export default Card;
