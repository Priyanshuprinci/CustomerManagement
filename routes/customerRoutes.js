const express = require("express");
const { getCustomers } = require("../controllers/customerController");

const router = express.Router();

router.get("/customers", getCustomers);

module.exports = router;


// router.get('/customers', async (req, res) => {
//     try {
//       const { page = 1, limit = 10, search, filterField, filterValue } = req.query;
  
//       // Create search and filter conditions
//       let query = {};
  
//       // Search by name or email
//       if (search) {
//         query.$or = [
//           { name_of_customer: { $regex: search, $options: 'i' } }, // Case-insensitive search
//           { email: { $regex: search, $options: 'i' } }
//         ];
//       }
  
//       // Dynamic filtering by specific fields
//       if (filterField && filterValue) {
//         query[filterField] = { $regex: filterValue, $options: 'i' };
//       }
  
//       // Pagination
//       const customers = await Customer.find(query)
//         .skip((page - 1) * limit)
//         .limit(Number(limit));
  
//       const totalCount = await Customer.countDocuments(query);
  
//       res.json({
//         data: customers,
//         currentPage: Number(page),
//         totalPages: Math.ceil(totalCount / limit),
//       });
//     } catch (error) {
//       console.error('Error fetching customers:', error);
//       res.status(500).json({ message: 'Server Error' });
//     }
//   });
// module.exports=router;