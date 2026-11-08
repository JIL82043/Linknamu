import { MongoClient } from "mongodb";

const globalForMongo = globalThis as unknown as {
  mongoClient?: Promise<MongoClient>;
};

export function getClient(): Promise<MongoClient> {
  const url = process.env.MONGODB_URL;
  if (!url) throw new Error("MONGODB_URL 환경 변수가 없습니다.");
  globalForMongo.mongoClient ??= new MongoClient(url).connect();
  return globalForMongo.mongoClient;
}

export async function getClicksCollection() {
  const client = await getClient();
  return client
    .db("linknamu")
    .collection<{ _id: string; count: number }>("clicks");
}
