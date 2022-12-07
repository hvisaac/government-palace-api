const ReportInterface = require('../interfaces/ReportInterface');
const DepartmentInterface = require('../interfaces/DepartmentInterface');

const confirmReport = async (req, res) => {
    let exist = false;

    let reports = new Promise((next) => {
        ReportInterface.find({},
            {
                geolocation:
                {
                    latitude: {
                        $gte: Number.parseFloat(req.body.lat2.substr(0, 4)),
                        $lte: Number.parseFloat(req.body.lat2.substr(0, 4)) + 0.01
                    },
                    longitude: {
                        $gte: Number.parseFloat(req.body.long2.substr(0, 5)),
                        $lte: Number.parseFloat(req.body.long2.substr(0, 5)) + 0.01
                    }
                }
            },
            (err, docs) => {
                if (err) { next(err) }
                else { next(docs) }
            })
    });
    
    for (const report of reports) {
        const R = 6371; //earth radio
        const sumLat = report.latitude - req.body.lat1;
        const sumLong = report.longitude - req.body.long1;
        const a = Math.pow(Math.sin(sumLat / 2), 2) + (Math.cos(req.body.lat1) * Math.cos(report.latitude) * Math.pow(Math.sin(sumLong / 2), 2));
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;

        if (d < 5) {
            exist = true;
            break;
        }
    }

    return res.status(200).json(exist);
}

const getReportById = async (req, res) => {
    ReportInterface.find({ _id: req.params._id }, async (err, reports) => {
        if (err) {
            console.log("error -> " + err);
            return res.status(500).json("internal error -> " + err);
        }
        else {
            for (let i = 0; i < Object.keys(reports).length; i++) {
                await new Promise(next => {
                    DepartmentInterface.find({ _id: reports[i].department }, (err, departments) => {
                        if (!err) {
                            const auxDepartment = {
                                _id: departments[0]._id,
                                name: departments[0].name,
                                color: departments[0].color,
                                icon: departments[0].icon
                            }
                            reports[i].department = JSON.stringify(auxDepartment);
                        }
                        next();
                    });
                });
            }

            return res.status(200).json(reports);
        }
    });
}

const getAllReports = async (req, res) => {

    ReportInterface.find({}, { photo: 0 }, async (err, reports) => {
        if (err) {
            console.log("error -> " + err);
            return res.status(500).json("internal error -> " + err);
        }
        else {
            console.log(reports);
            for (let i = 0; i < Object.keys(reports).length; i++) {
                await new Promise(next => {
                    DepartmentInterface.find({ _id: reports[i].department }, (err, departments) => {
                        if (!err) {
                            const auxDepartment = {
                                _id: departments[0]._id,
                                name: departments[0].name,
                                color: departments[0].color,
                                icon: departments[0].icon
                            }
                            reports[i].department = JSON.stringify(auxDepartment);
                        }
                        next();
                    });
                });
            }

            return res.status(200).json(reports);
        }
    });
}

const getReportsByContent = async (req, res) => {

    ReportInterface.find({ description: { $regex: req.body.content } }, { photo: 0 }, async (err, reports) => {
        if (err) {
            console.log("error -> " + err);
            return res.status(500).json("internal error -> " + err);
        }
        else {
            for (let i = 0; i < Object.keys(reports).length; i++) {
                await new Promise(next => {
                    DepartmentInterface.find({ _id: reports[i].department }, (err, departments) => {
                        if (!err) {
                            const auxDepartment = {
                                _id: departments[0]._id,
                                name: departments[0].name,
                                color: departments[0].color,
                                icon: departments[0].icon
                            }

                            reports[i].department = JSON.stringify(auxDepartment);
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

    ReportInterface.find({ createdAt: { $gte: req.body.beginDate, $lte: req.body.finalDate } }, { photo: 0 }, async (err, reports) => {
        if (err) {
            console.log("error -> " + err);
            return res.status(500).json("internal error -> " + err);
        }
        else {
            for (let i = 0; i < Object.keys(reports).length; i++) {
                await new Promise(next => {
                    DepartmentInterface.find({ _id: reports[i].department }, (err, departments) => {
                        if (!err) {
                            const auxDepartment = {
                                _id: departments[0]._id,
                                name: departments[0].name,
                                color: departments[0].color,
                                icon: departments[0].icon
                            }
                            reports[i].department = JSON.stringify(auxDepartment);
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
            console.log("error -> " + err);
            return res.status(500).json("internal error -> " + err);
        }
    });
}

const getMyReports = async (req, res) => {

    ReportInterface.find({ department: req.params.department }, { photo: 0 },async (err, reports) => {
        if (err) {
            console.log("error -> " + err);
            return res.status(500).json("internal error -> " + err);
        }
        else {
            for (let i = 0; i < Object.keys(reports).length; i++) {
                await new Promise(next => {
                    DepartmentInterface.find({ _id: reports[i].department }, (err, departments) => {
                        if (!err) {
                            const auxDepartment = {
                                _id: departments[0]._id,
                                name: departments[0].name,
                                color: departments[0].color,
                                icon: departments[0].icon
                            }
                            reports[i].department = JSON.stringify(auxDepartment);
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
    await newReport.save((err, Object) => {
        if (err) {
            console.log("error -> " + err);
            return res.status(500).json("internal error -> " + err);
        }
        else {
            return res.status(201).json(Object);
        }
    });

}

const changeStatus = (req, res) => {
    ReportInterface.findByIdAndUpdate(req.body._id, { status: req.body.status }, (err, Object) => {
        if (err) {
            console.log("error -> " + err);
            return res.status(500).json("internal error -> " + err);
        }
        else {
            return res.status(201).json(Object);
        }
    });
}

module.exports =
{
    getMyReports,
    saveReport,
    getAllReports,
    countAllReports,
    getReportsByDate,
    getReportById,
    getReportsByContent,
    changeStatus
};