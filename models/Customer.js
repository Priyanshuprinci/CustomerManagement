import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    s_no: { type: Number, unique: true },
    name_of_customer: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile_number: { type: String, required: true },
    dob: { type: Date },
    created_at: { type: Date, default: Date.now },
    modified_at: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

customerSchema.index({ email: 1, mobile_number: 1 });

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;
