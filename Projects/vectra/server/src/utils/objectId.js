import mongoose from "mongoose";
export const isObjectId = (id) => mongoose.Types.ObjectId.isValid(id);