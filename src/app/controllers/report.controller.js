const reportService = require('../services/report.service');

class OptionReportController {
    async addNew(req, res, next) {
        try {
            const text = req.body.text;

            const isExisted = await optionService.findOne({
                text: text
            });

            if (isExisted) return res.status(303).json('Lựa chọn này đã có');

            const newOption = await optionService.create(text);

            if (newOption) return res.status(201).json('Thêm lựa chọn mới thành công');
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }

    async getAll(req, res, next) {
        try {
            const new_per_page = req.query.per_page;
            let skipNum = (req.query.page - 1) * new_per_page;
            let sortBy;

            const pattern = "[\\s]" + req.query.search_text + "|^" + req.query.search_text;

            const filter = {
                text: {
                    $regex: pattern,
                    $options: 'i',
                }
            };

            if (req.query.sort_by == 0) {
                sortBy = {
                    createdAt: 'asc'
                }
            }

            if (req.query.sort_by == 1) {
                sortBy = {
                    createdAt: 'desc'
                }
            }

            if (req.query.sort_by == 2) {
                sortBy = {
                    text: 'asc'
                }
            }

            if (req.query.sort_by == 3) {
                sortBy = {
                    text: 'desc'
                }
            }

            const options = await optionService.findLimit(
                req.query.search_text == '' ? {} : filter,
                new_per_page,
                skipNum,
                sortBy
            );

            const totalOptions = await optionService.find(req.query.search_text == '' ? {} : filter);

            const totalPage = Math.ceil(totalOptions.length / new_per_page)

            return res.status(200).json({
                options,
                totalPage,
            });

        } catch (err) {
            return res.status(500).json(err);
        }
    }
    
    async updateOption(req, res, next) {
        try {
            const isExisted = await optionService.findOne(
                {
                    text: req.body.text
                }
            )

            if(isExisted) return res.status(303).json('Option này đã có, xin đổi tên khác');

            const optionUpdated = await optionService.update(
                req.params.id,
                {
                    text: req.body.text,
                }
            )

            if(!optionUpdated) return res.status(404).json('Option này không tồn tại');

            return res.status(200).json('Cập nhật thành công');

        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }

    async deleteOption(req, res, next) {
        try {
            const optionDeleted = await optionService.delete(req.params.id);

            if(!optionDeleted) return res.status(404).json('Option này không tồn tại');

            return res.status(200).json('Xóa thành công');
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }
}

module.exports = new OptionReportController;