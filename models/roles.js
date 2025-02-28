import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema(
  {
    role_name: {
      type: String,
      required: true,
      enum: ['Admin', 'Member', 'Visitor'], 
      unique: true,
    },
    permissions: {
      type: [String], 
      default: [],
    },
  },
  { timestamps: true }
);

// Create the model for the roles
const Role = mongoose.model('Role', roleSchema);

export default Role;
