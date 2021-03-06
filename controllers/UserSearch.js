const { UserSearch } = require("../models");

exports.createUserSearch = async function (req, res) {
  const newUserSearch = await UserSearch.create(req.body);
  res.json({ success: true, newUserSearch });
};

exports.getUserSearchById = async function (req, res) {
  const { searchId } = req.params;
  const single = await UserSearch.findOne({ _id: searchId });
  if (!single) {
    return res.status(404).send("UserSearch with this ID does not exist");
  }
  res.json(single);
};

exports.getUserSearchByUserId = async function (req, res) {
  if (req.session.userId) {
    const userSearches = await UserSearch.find({ user_id: req.session.userId });
    if (!userSearches) {
      return res.status(204).send("User doesn't have any searches yet");
    }
    res.json(userSearches);
  } else {
    return res.status(403).json({
      success: false,
      redirectUrl: "/",
    });
  }
};

exports.updateUserSearch = async (req, res) => {
  const { searchId } = req.params;
  const result = await UserSearch.findByIdAndUpdate(searchId, req.body, {
    new: true,
  });
  res.json({ success: true, result });
};

exports.deleteUserSearch = async (req, res) => {
  const { searchId } = req.params;
  const result = await UserSearch.findByIdAndRemove({ _id: searchId });
  res.status(204).send(`deleted user search with id ${searchId}`);
};

/* exports.getAllUserSearchs = async function (req, res) {
  const all = await UserSearch.find().limit(10);
  res.json(all);
};
*/
