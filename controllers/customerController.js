import Customer from "../models/Customer.js";

export const getCustomers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, filterField, filterValue } = req.query;

    let query = {};

    if (search) {
      query.$or = [
        { name_of_customer: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    if (filterField && filterValue) {
      query[filterField] = filterValue;
    }

    const customers = await Customer.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Customer.countDocuments(query);

    res.json({ customers, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
