import { ObjectId } from 'mongodb';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import React from 'react';
import MeetUpDetailsPage from '../../components/meetups/meet-up-detail';
import connectToDatabase from '../../lib/db';

const DetailsPage = ({
  meetupData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { title, address, description, image } = meetupData;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
      </Head>
      <MeetUpDetailsPage
        title={title}
        address={address}
        description={description}
        image={image}
      />
    </>
  );
};

export default DetailsPage;

export const getStaticProps: GetStaticProps = async (context) => {
  const meetupid = context.params!.meetupid as string;
  const client = await connectToDatabase();
  const meetupCollection = client.db().collection('meetups');
  const meetup = await meetupCollection.findOne({
    _id: new ObjectId(meetupid),
  });
  client.close();
  return {
    props: {
      meetupData: JSON.parse(
        JSON.stringify({
          id: meetup?._id,
          ...meetup,
        })
      ),
    },
    revalidate: 600,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const client = await connectToDatabase();
  const meetupCollection = client.db().collection('meetups');
  const meetups = await meetupCollection
    .find({}, { projection: { _id: 1 } })
    .toArray();
  const meetupParams = meetups.map((meetup) => ({
    params: { meetupid: meetup._id.toString() },
  }));
  return {
    paths: meetupParams,
    fallback: 'blocking',
  };
};
