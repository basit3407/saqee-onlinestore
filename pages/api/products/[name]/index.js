import { connectToDatabase } from "../../../../styles/util/mongodb";
import validate from "../../../../styles/validation/product";
//capitalize first letter only to avoid errors
import capitalize from "lodash.capitalize";

export default async function productsHandler(req, res) {
  const {
      query: { name },
      method,
    } = req,
    Name = capitalize(name),
    { db } = await connectToDatabase();

  console.log("get request");

  switch (method) {
    case "GET":
      // @route GET api/products/[name]
      // @desc get products of [name] from data base
      // @access public

      await db
        .listCollections({ name: Name })
        .next(async function (err, collection) {
          //check if collection exists and give error if it doesnt
          if (!collection)
            return res
              .status(404)
              .json({ collectionExist: "collection does not exist" });

          //if no error return results
          const products = await db.collection(Name).find({}).toArray();

          res.status(200).json(products);
        });

      break;
    case "POST":
      // @route POST api/products/[name]
      // @desc create product in products of [name] in data base
      // @access public
      {
        // Form validation
        const { errors, isValid } = validate(req.body);
        //if not valid retrun error
        if (!isValid) return res.status(400).json(errors);

        //if no errors save product
        await db.collection(name).insertOne(req.body);

        res.status(200).json({ message: "product saved" });
      }

      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
