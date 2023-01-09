import { MongoClient } from "mongodb";

let client = undefined;

const methodHandler = {
  GET() {},
  POST: async function (req, res) {
    try {
      const url = "mongodb://root:123456@localhost:27017";
      client = await MongoClient.connect(url);
    } catch (error) {
      throw new Error(error + "Could not connect mongodb");
    }
    try {
      const db = client.db("blog");
      const result = await db.collection("message").insertOne;
      res
        .status(201)
        .json({ message: "Successfully stored message!", data: newMessage });
    } catch (error) {
      await client.close();
      res.status(500).json({ message: "Storing message failed" });
    }
  },
};

async function handler(req, res) {
  const db = client.db("blog");
  methodHandler[req.method](req, res);
}

export default handler;
