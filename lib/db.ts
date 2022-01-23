import { MongoClient } from 'mongodb';

const connectToDatabase = async () => {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_CLUSTER}.h2i3t.mongodb.net/${process.env.MONGO_DATABASE}`
  );
  return client;
};

export default connectToDatabase;