import { ObjectID } from "mongodb";
import { connectToDatabase } from "../../../util/mongodb";
import validate from "../../../validation/product";

export default async function productHandler(req, res) {
  const {
      query: { category, id },
      method,
    } = req,
    { db } = await connectToDatabase(),
    searchQuery = { category: category, _id: ObjectID(id) };

  switch (method) {
    case "GET":
      // @route GET /api/products/[id]?category=[category]
      // @desc get product of [id] from products of [category] from data base
      // @access public
      {
        if (!/^[0-9a-fA-F]{24}$/.test(id))
          return res.status(404).json({ error: "invalid id" });
        try {
          const product = await db.collection("products").findOne(searchQuery);
          // if no product give error
          if (!product)
            return res.status(404).json({ error: "no product found" });
          //if no error send success response
          res.status(200).json(product);
        } catch (e) {
          res
            .status(500)
            .json({ error: "there was some problem,please try again" });
        }
      }
      break;

    case "PUT":
      // @route PUT /api/products/[id]?category=[category]
      // @desc edit product of [id] in products of [category] in data base
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
          res
            .status(500)
            .json({ error: "there was some problem,please try again" });
        }
      }
      break;

    case "DELETE":
      // @route DELETE /api/products/[id]?category=[category]
      // @desc delete product of [id] in products of [category] in data base
      // @access Admin
      try {
        await db.collection("products").deleteOne(searchQuery);
        res.status(200).json({ message: "product deleted" });
      } catch (e) {
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
