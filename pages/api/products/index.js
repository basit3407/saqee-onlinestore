import { connectToDatabase } from "../../../util/mongodb";
// import validate from "../../../../validation/product";

export default async function productsHandler(req, res) {
  const {
      query: { category, keyword, sort },
      method,
    } = req,
    //convert the first letter of query to uppercase and remaining to lowercase.
    Category = category[0].toUpperCase() + category.slice(1).toLowerCase(),
    { db } = await connectToDatabase();

  switch (method) {
    case "GET":
      // @route GET api/products/[name]
      // @desc get products of [name] from data base
      // @access public
      {
        //Find by category
        const category = Category ? { category: Category } : {},
          //if search keyword present,find by search keywrod using regex for smart search
          searchKeyword = keyword
            ? {
                title: {
                  $regex: keyword,
                  $options: "i",
                },
              }
            : {},
          //if sort selected then sort also.
          sortWord = sort ? { [sort]: 1 } : {},
          //combine above 3 quiries and fetch data from database.
          products = await db
            .collection("products")
            .find({ ...category, ...searchKeyword })
            .sort(sortWord)
            .toArray();

        //give error if no products
        if (!products.length)
          return res.status(404).json({ error: "no such category" });

        res.status(200).json({ products: products });
      }

      break;
    case "POST":
      // @route POST api/products/[name]
      // @desc create product in products of [name] in data base
      // @access public
      {
        // // Form validation
        // const { errors, isValid } = validate(req.body);
        // //if not valid retrun error
        // if (!isValid) return res.status(400).json(errors);

        //if no errors save product
        await db.collection("products").insertMany(req.body);

        res.status(200).json({ message: "product saved" });
      }

      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
