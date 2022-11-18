const ReportInterface = require('../interfaces/ReportInterface');
const DepartmentInterface = require('../interfaces/DepartmentInterface');

const getAllReports = async (req, res) => {

    ReportInterface.find({}, async (err, reports) => {
        if (err) {
            console.log("error -> " + error);
            return res.status(500).json("internal error -> " + error);
        }
        else {
            let response = [];

            for (let i = 0; i < Object.keys(reports).length; i++) {
                await new Promise(next => {
                    DepartmentInterface.find({ _id: reports[i].department }, (err, departments) => {
                        if (!err) {
                            let auxDepartment = {
                                _id: departments[0]._id,
                                name: departments[0].name,
                                color: departments[0].color,
                                icon: departments[0].icon
                            }
                            reports[i].department = JSON.stringify(auxDepartment);
                            response.push(reports[i]);
                        }
                        next();
                    });
                });
            }

            return res.status(200).json(reports);
        }
    });
}

const getReportsByDate = async (req, res) => {

    ReportInterface.find({createdAt: { $gte: req.body.beginDate, $lte: req.body.finalDate}}, async (err, reports) => {
        if (err) {
            console.log("error -> " + error);
            return res.status(500).json("internal error -> " + error);
        }
        else {
            let response = [];

            for (let i = 0; i < Object.keys(reports).length; i++) {
                await new Promise(next => {
                    DepartmentInterface.find({ _id: reports[i].department }, (err, departments) => {
                        if (!err) {
                            let auxDepartment = {
                                _id: departments[0]._id,
                                name: departments[0].name,
                                color: departments[0].color,
                                icon: departments[0].icon
                            }
                            reports[i].department = JSON.stringify(auxDepartment);
                            response.push(reports[i]);
                        }
                        next();
                    });
                });
            }

            return res.status(200).json(reports);
        }
    });
}

const countAllReports = async (req, res) => {
    ReportInterface.countDocuments({}, (err, reports) => {
        try {
            return res.status(200).json(reports);
        } catch (error) {
            console.log("error -> " + error);
            return res.status(500).json("internal error -> " + error);
        }
    });
}

const getMyReports = async (req, res) => {

    ReportInterface.find({ department: req.params.department }, async (err, reports) => {
        if (err) {
            console.log("error -> " + error);
            return res.status(500).json("internal error -> " + error);
        }
        else {
            let response = [];

            for (let i = 0; i < Object.keys(reports).length; i++) {
                await new Promise(next => {
                    DepartmentInterface.find({ _id: reports[i].department }, (err, departments) => {
                        if (!err) {
                            let auxDepartment = {
                                _id: departments[0]._id,
                                name: departments[0].name,
                                color: departments[0].color,
                                icon: departments[0].icon
                            }
                            reports[i].department = JSON.stringify(auxDepartment);
                            response.push(reports[i]);
                        }
                        next();
                    });
                });
            }

            return res.status(200).json(reports);
        }
    });
}

const saveReport = async (req, res) => {
    const newReport = new ReportInterface(req.body);
    await newReport.save();
    return res.status(201).json("success");
}

module.exports = { getMyReports, saveReport, getAllReports, countAllReports, getReportsByDate };