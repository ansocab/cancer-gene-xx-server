const mongoose = require("mongoose");

const UserSearchSchema = new mongoose.Schema(
  {
    search_name: String,
    ensg_number: String,
    project: [String],
    category: [String],
    data_type: [String],
    workflow: [String],
    pinned: Boolean,
    user_id: String,
  },
  { timestamps: true }
);

const UserSearch = mongoose.model("UserSearch", UserSearchSchema);
module.exports = UserSearch;
