const mongoose = require('mongoose')

const CancerDataSchema = new mongoose.Schema(
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
)

const CancerData = mongoose.model('CancerData', CancerDataSchema)
module.exports = CancerData
