import { NextApiRequest, NextApiResponse } from 'next';
import { MeetUp } from '../../interfaces';
import connectToDatabase from '../../lib/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({
      message: 'Method not supported',
    });
  }
  const { title, description, address, image } = req.body;

  const newMeetup: MeetUp = {
    title,
    description,
    address,
    image,
  };
  const client = await connectToDatabase();
  const meetupsCollection = client.db().collection('meetups');

  const result = await meetupsCollection.insertOne({ ...newMeetup });
  newMeetup.id = result.insertedId.toString();

  client.close();
  return  res.status(201).json({
    message: 'Created New Meetup',
    meetup: newMeetup,
  });
};

export default handler;
