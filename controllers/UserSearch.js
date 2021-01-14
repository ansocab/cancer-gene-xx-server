const { UserSearch } = require("../models");

exports.createUserSearch = async function (req, res) {
  const newUserSearch = await UserSearch.create(req.body);
  res.json({ success: true, newUserSearch });
};

exports.getUserSearchByUserId = async function (req, res) {
  const { userId } = req.params;
  const userSearches = await UserSearch.find({ user_id: userId });
  if (!userSearches) {
    return res.status(404).send("User doesn't have any searches yet");
  }
  res.json(userSearches);
};

/* exports.getAllUserSearchs = async function (req, res) {
  const all = await UserSearch.find().limit(10);
  res.json(all);
};

exports.getUserSearchById = async function (req, res) {
  const { id } = req.params;
  const single = await UserSearch.findOne({ id: Number(id) });
  if (!single) {
    return res.status(404).send("UserSearch with this ID does not exist");
  }
  res.json(single);
};

exports.updateUserSearch = async (req, res) => {
  const { title, body, img } = req.body;
  const { id } = req.params;
  const result = await UserSearch.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.json({ success: true, result });
};

exports.deleteUserSearch = async (req, res) => {
  const { id } = req.params;
  const result = await UserSearch.findByIdAndDelete();
  res.sendStatus("204");
};
*/
