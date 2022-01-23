import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import React from 'react';
import MeetUpList from '../components/meetups/meet-up-list';
import connectToDatabase from '../lib/db';

const HomePage = ({
  meetups,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <>
  <Head>
    <title>React Meetups</title>
    <meta name='description' content='NextJS with typescript'/>
  </Head>
  <MeetUpList meetups={meetups} />
  </>
};

export default HomePage;

export async function getStaticProps() {
  const client = await connectToDatabase();
  const meetupCollection = client.db().collection('meetups');
  const meetups = await meetupCollection.find().toArray();
  const updatedMeetups = meetups.map((meetup) => ({
    ...meetup,
    id: meetup._id,
  }));
  client.close();
  return {
    props: {
      meetups: JSON.parse(JSON.stringify(updatedMeetups)),
    },
    revalidate: 1800,
  };
}

// export async function getServerSideProps() {
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   };
// }
