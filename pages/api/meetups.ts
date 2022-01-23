import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "../../lib/db";

const handler = async (req:NextApiRequest, res: NextApiResponse) => {
  if(req.method !== 'GET') {
    return res.status(405).json({
      message: 'Unsupported method!'
    });
  }
  const client = await connectToDatabase();
  const meetupCollection = client.db().collection('meetups');
  const meetups = await meetupCollection.find().toArray();
  console.log(meetups);
  client.close();
  return res.status(200).json({
    message: 'Fetched all meetups',
    meetups: JSON.parse(JSON.stringify(meetups))
  })

}

export default handler