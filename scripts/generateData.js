require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const Customer = require('../models/Customer');

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const BATCH_SIZE = 1000;

const generateData = async () => {
  const mongoUri = process.env.MONGO_URI;
  console.log(`MongoDB URI: ${mongoUri}`);

  if (!mongoUri) throw new Error("MONGO_URI is not defined in .env");

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 50,
  });

  console.log("Connected to MongoDB");

  // Drop existing indexes to improve performance
  await Customer.collection.dropIndexes();

  const customers = [];

  for (let i = 0; i < 2000000; i++) {
    customers.push({
      s_no: i + 1,
      name_of_customer: faker.person.fullName(),
      email: faker.internet.email(),
      mobile_number: faker.phone.number(),
      dob: faker.date.birthdate(),
      created_at: new Date(),
      modified_at: new Date(),
    });

    if (customers.length === BATCH_SIZE) {
      await Customer.insertMany(customers, { writeConcern: { w: 0 } });
      console.log(`Inserted ${i + 1} records`);
      customers.length = 0;
      await delay(100); // Add delay to avoid rate limits
    }
  }

  // Insert any remaining records
  if (customers.length) {
    await Customer.insertMany(customers, { writeConcern: { w: 0 } });
    console.log(`Inserted remaining ${customers.length} records`);
  }

  console.log("Data generation completed");

  // Recreate indexes after insertion
  await Customer.createIndexes({ email: 1, mobile_number: 1 });

  mongoose.disconnect();
};

generateData().catch((error) => {
  console.error(`Error generating data: ${error.message}`);
  mongoose.disconnect();
});
