import { NextApiRequest, NextApiResponse } from "next"
import { connectToDatabase } from "../../utils/mongodb";



const handler =async (req:NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase()
  const data = await db
  .collection("listingsAndReviews")
  .find({"review_scores.review_scores_rating": {$gte: 90}})
  .limit(20)
  .toArray();


  if(!data) return res.status(502).json({message: "sorry something went wrong with the db"})
  else res.status(200).json(data)
    
}

export default handler