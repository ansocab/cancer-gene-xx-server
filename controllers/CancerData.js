const { CancerData } = require("../models");

exports.createCancerData = async function (req, res) {
  const newCancerData = await CancerData.create(req.body);
  res.json({ success: true, newCancerData });
};

exports.getCancerDataById = async function (req, res) {
  const { cancerDataId } = req.params;
  const cancerDatas = await CancerData.findOne({ _id: cancerDataId });
  if (!cancerDatas) {
    return res.status(404).send("User doesn't have any searches yet");
  }
  res.json(cancerDatas);
};

exports.deleteCancerData = async (req, res) => {
  const { cancerDataId } = req.params;
  const result = await CancerData.findByIdAndRemove({ _id: cancerDataId });
  res.status(204).send(`deleted user search with id ${cancerDataId}`);
};
