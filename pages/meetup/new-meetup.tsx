import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import MeetUpForm from '../../components/meetups/new-meet-up';
import { MeetUp } from '../../interfaces';

const addMeetUp = async (meetupData: MeetUp) => {
  const response = await fetch('/api/new-meetup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...meetupData,
    }),
  });
  const data = await response.json();
  if (response.status !== 201 || !response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }
  return data;
};

const NewMeetUpPage = () => {
  const router = useRouter();
  const addMeetupHandler = async (meetupData: MeetUp) => {
    const data = await addMeetUp(meetupData);
    console.log(data);
    router.push('/');
  };
  return (
    <>
      <Head>
        <title>Add a new meetup</title>
        <meta name='description' content='Page to add a new meetup location' />
      </Head>
      <MeetUpForm onAddMeetup={addMeetupHandler} />
    </>
  );
};

export default NewMeetUpPage;
