import { connectToDatabase } from "../../../util/mongodb";
import validate from "../../../validation/product";

export default async function productHandler(req, res) {
  const {
      query: { category, title },
      method,
    } = req,
    { db } = await connectToDatabase(),
    //search by title insted of _id for SEO
    searchQuery = { category: category, title: title };

  switch (method) {
    case "GET":
      // @route GET api/products/[category]/[title]
      // @desc get product of [title] from products of [category] from data base
      // @access public
      {
        try {
          const product = await db.collection("products").findOne(searchQuery);
          // if no product give error
          if (!product)
            return res.status(404).json({ error: "no product found" });
          //if no error send success response
          res.status(200).json({ product: product });
        } catch (e) {
          e &&
            res
              .status(500)
              .json({ error: "there was some problem,please try again" });
        }
      }
      break;

    case "PUT":
      // @route PUT api/products/[category]/[title]
      // @desc edit product of [title] in products of [category] in data base
      // @access Admin
      {
        try {
          // Form validation
          const { errors, isValid } = validate(req.body);
          //if not valid retrun error
          if (!isValid) return res.status(400).json(errors);
          //if no error update the product
          await db
            .collection("products")
            .updateOne(searchQuery, { $set: req.body });
          res.status(200).json({ message: " updated product saved" });
        } catch (e) {
          e &&
            res
              .status(500)
              .json({ error: "there was some problem,please try again" });
        }
      }
      break;

    case "DELETE":
      // @route DELETE api/products/[category]/[title]
      // @desc delete product of [title] in products of [category] in data base
      // @access Admin
      try {
        await db.collection("products").deleteOne(searchQuery);
        res.status(200).json({ message: "product deleted" });
      } catch (e) {
        e &&
          res
            .status(500)
            .json({ error: "there was some problem,please try again" });
      }

      break;

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
