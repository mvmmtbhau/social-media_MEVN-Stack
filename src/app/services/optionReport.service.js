const { OptionReport } = require('../models/');
const mongoose = require('mongoose');

class OptionReportService {
    async create(text) {
        const option = new OptionReport({
            text: text
        });

        return await option.save();
    }

    async find(filter) {
        return OptionReport.find(filter);
    }

    async findOne(filter) {
        return await OptionReport.findOne(filter);
    }

    async findLimit(filter, numLimit, skipNum, sortBy) {
        return await OptionReport.find(filter).sort(sortBy).limit(numLimit).skip(skipNum);
    }

    async update(optionId, data) {
        const result = await OptionReport.findByIdAndUpdate(
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
        const result = await OptionReport.findByIdAndDelete(
            {
                _id: optionId,
            },
        )

        return result;
    }
}

module.exports = new OptionReportService;