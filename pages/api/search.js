import { connectToDatabase } from "../../util/mongodb";

export default async function searchHandler(req, res) {
  const {
      query: { keyword },
    } = req,
    { db } = await connectToDatabase();

  // @route GET /api/search?keyword=${keyword}
  // @desc get all the products from data base,
  // @access public

  // if search keyword present,find by search keywrod using regex for smart search
  if (keyword) {
    try {
      const products = await db
        .collection("products")
        .find({
          title: {
            $regex: keyword,
            $options: "i",
          },
        })
        .toArray();
      //give error if no products
      if (!products.length)
        return res.status(404).json({ error: "no such category" });
      //if no errors send success response
      res.status(200).json(products);
    } catch (e) {
      res
        .status(500)
        .json({ error: "there was some problem,please try again" });
    }
  }
}
