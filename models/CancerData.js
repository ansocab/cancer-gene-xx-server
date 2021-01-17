const mongoose = require('mongoose')

const CancerDataSchema = new mongoose.Schema(
	{
		data: [
			{
				file_id: String,
				gene_value: Number,
				case_id: String,
				days_to_death: Number,
				gender: String,
				vital_status: String,
				tumor_grade: String,
				tumor_stage: String,
			},
		],
	},
	{ timestamps: true }
)

const CancerData = mongoose.model('CancerData', CancerDataSchema)
module.exports = CancerData
