const { Report } = require('../models/');

class ReportService {
    async create(data) {
        const report = new Report({
            fromUser: data.fromUser,
            optionReport: data.optionReport,
            post: data.post ? data.post : null,
            comment: data.comment ? data.comment : null,
        });

        return await report.save();
    }

    async find(filter) {
        return Report.find(filter);
    }

    async findOne(filter) {
        return await Report.findOne(filter);
    }

    async findLimit(filter, numLimit, skipNum, sortBy) {
        return await Report.find(filter).sort(sortBy).limit(numLimit).skip(skipNum);
    }

    async update(optionId, data) {
        const result = await Report.findByIdAndUpdate(
            {
                _id: optionId,
            },
            {
                $set: data,
            }
        )

        return result;
    }

    async delete(optionId) {
        const result = await Report.findByIdAndDelete(
            {
                _id: optionId,
            },
        )

        return result;
    }
}

module.exports = new ReportService;