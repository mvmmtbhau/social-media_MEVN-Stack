const reportService = require('../services/report.service');

class ReportController {
    async addNew(req, res, next) {
        try {
            const data = {
                fromUser: req.body.userId,
                optionReport: req.body.optionId,
                post: req.body.postId,
                comment: req.body.commentId,
            }

            const report = await reportService.create(data);

            return res.status(201).json(report);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }

    async getReportPost(req, res, next) {
        try {
            const reports = await reportService.find({
                post: {
                    $ne: null
                },
                status: 0
            });

            return res.status(200).json(reports);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }

    async getReportComment(req, res, next) {
        try {
            const new_per_page = req.query.per_page;
            let skipNum = (req.query.page - 1) * new_per_page;
            let sortBy;

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

            const reports = await reportService.findLimit(
                {
                    comment: {
                        $ne: null,
                    },
                    status: 0,
                },
                new_per_page,
                skipNum,
                sortBy
            );

            const totalReports = await reportService.find({});

            const totalPage = Math.ceil(totalReports.length / new_per_page)

            return res.status(200).json({
                reports,
                totalPage,
            });

            
            
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }

    async updateReport(req, res, next) {
        try {
            const report = await reportService.findOne(
                {
                    _id: req.body.reportId,
                }
            )

            if(!report) return res.status(404).json('Report not found');

            const update = await reportService.update(
                req.body.reportId,
                {
                    status: req.body.status
                }
            )

            if(update) return res.status(200).json('Update successful');
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }
}

module.exports = new ReportController;