import dbConnect from '../../../db/connectDb'
import Mezigzs from '../../../models/mezigs'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const mezigzs = await Mezigzs.find({}) /* find all the data in our database */
        res.status(200).json({ success: true, data: mezigzs })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const mezigz = await Mezigzs.create(
          req.body
        ) /* create a new model in the database */
        res.status(201).json({ success: true, data: mezigz })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
