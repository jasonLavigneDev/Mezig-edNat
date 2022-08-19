import dbConnect from '../../../db/connectDb';
import Mezigs from "../../../models/Mezigs"

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const mezigs = await Mezigs.find({}); /* find all the data in our database */
        res.status(200).json({ success: true, data: mezigs });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const mezigs = await Mezigs.create(req.body); /* create a new model in the database */
        res.status(201).json({ success: true, data: mezigs });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}