const mongoose = require("mongoose");

const UserSearchSchema = new mongoose.Schema(
    {
    name: {
        first: String,
        last: String,
    },
    username: String,
    email: String,
    author: String,
    tags: [ String ],
    published: {type: Boolean, default: true},
    quantity: Number,
    price: Number,
    },
    { timestamps: true }
);

const UserSearch = mongoose.model("UserSearch", UserSearchSchema);
module.exports = UserSearch;