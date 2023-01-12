const ReportInterface = require('../interfaces/ReportInterface');
const DepartmentInterface = require('../interfaces/DepartmentInterface');
const fs = require('fs');
const { savePhoto } = require('../utils/photoUtils');
const { sendFinalizedMessage } = require('../services/WhatsAppService');

const confirmReport = async (req, res) => {

    let matchReport;
    const reports = await getReportsLocation(req.body.currentLat, req.body.currentLong);
    console.log('department -> ' + req.body.department);
    console.log(reports);

    for (const report of reports) {
        const R = 6371; //earth radio
        const sumLat = report.geolocation.latitude - req.body.currentLat;
        const sumLong = report.geolocation.longitude - req.body.currentLong;
        const a = Math.pow(Math.sin(sumLat / 2), 2) + (Math.cos(req.body.currentLat) * Math.cos(report.geolocation.latitude) * Math.pow(Math.sin(sumLong / 2), 2));
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;
        console.log(R);
        console.log(sumLat);
        console.log(sumLong);
        console.log(a);
        console.log(c);
        console.log(d);

        if (d < 1 && report.department == req.body.department) {
            matchReport = {
                _id: report._id,
                folio: report.folio
            };
            break;
        }
    }

    return res.status(200).json(matchReport);
}

/**
 * 
 * @param {number} currentLat 
 * @param {number} currentLong 
 * @returns 
 */
function getReportsLocation(currentLat, currentLong) {

    const response = new Promise((next) => {
        ReportInterface.find(
            {
                'geolocation.latitude': {
                    $gte: currentLat,
                    $lte: currentLat + 0.01
                },
                'geolocation.longitude': {
                    $gte: currentLong - 0.01,
                    $lte: currentLong
                }
            },
            { photo: 0, finishedPhoto: 0 },
            (err, docs) => {
                if (err) { console.log(err); next(err) }
                else { console.log(docs); next(docs) }
            })
    });

    return response;
}

const getReportById = async (req, res) => {
    ReportInterface.find({ _id: req.params._id }, async (err, reports) => {
        if (err) {
            console.log("error -> " + err);
            return res.status(500).json("internal error -> " + err);
        }
        else {
            let response = reports[0];
            const reportedImage = fs.readFileSync(`src/public/${reports[0].photo}/reported.png`, { encoding: 'base64' });
            //const solvedImage = fs.readFileSync(`src/public/${reports[0].photo}/solved.png`, { encoding: 'base64' });
            response.photo = `data:image/png;base64,${reportedImage}`;
            //response.solvedImage = solvedImage;

            await new Promise(next => {
                DepartmentInterface.find({ _id: reports[0].department }, (err, departments) => {
                    if (!err) {
                        const auxDepartment = {
                            _id: departments[0]._id,
                            name: departments[0].name,
                            color: departments[0].color,
                            icon: departments[0].icon
                        }
                        response.department = JSON.stringify(auxDepartment);
                    }
                    next();
                });
            });


            return res.status(200).json(response);
        }
    });
}

const getAllReports = async (req, res) => {

    ReportInterface.find({}, { photo: 0, finishedPhoto: 0 }, async (err, reports) => {
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

const getReportsByContent = async (req, res) => {

    ReportInterface.find({ description: { $regex: req.body.content } }, { photo: 0, finishedPhoto: 0 }, async (err, reports) => {
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

    ReportInterface.find({ createdAt: { $gte: req.body.beginDate, $lte: req.body.finalDate } }, { photo: 0, finishedPhoto: 0 }, async (err, reports) => {
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

    ReportInterface.find({ department: req.params.department }, { photo: 0, finishedPhoto: 0 }, async (err, reports) => {
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

    let report = req.body;
    const date = new Date();
    report['folio'] = await getFolio();
    const filePath = `reports/${date.getFullYear()}/${date.getMonth() + 1}/${report.folio}`;

    await new Promise((next) => {
        fs.mkdir(`src/public/${filePath}`, { recursive: true }, err => {
            if (err) {
                console.log(err);
                next()
            } else {
                console.log('success')
                next()
            }
        });
    });

    if (await savePhoto(filePath, report.photo, 'reported')) {
        report['photo'] = filePath;
        const newReport = new ReportInterface(report);
        newReport.save((err, Object) => {
            if (err) {
                console.log("error -> " + err);
                return res.status(500).json("internal error -> " + err);
            }
            else {
                return res.status(201).json(Object);
            }
        });
    } else {
        return res.status(500).json("internal error"
    }


}

function getFolio() {
    const folio = new Promise((next) => {
        ReportInterface.countDocuments({}, (err, count) => {
            if (err) { console.log(err) }
            else {
                const currentDdate = new Date();
                const counter = count + 1;
                let formatFolio = '';
                if (counter < 10 && counter > 0) {
                    formatFolio = '000' + counter;
                }
                if (counter >= 10) {
                    formatFolio = '00' + counter;
                }
                if (counter >= 100) {
                    formatFolio = '0' + counter;
                }
                const year = currentDdate.getFullYear();
                let month;
                if ((currentDdate.getMonth() + 1) < 10) {
                    month = `0${currentDdate.getMonth() + 1}`;
                } else {
                    month = (currentDdate.getMonth() + 1).toString();
                }
                const response = year.toString().substring(2) + month + formatFolio;
                next(response)
            }
        });
    });

    return folio;
}

const changeStatus = (req, res) => {
    ReportInterface.findByIdAndUpdate(req.body._id, { status: req.body.status }, (err, Object) => {
        if (err) {
            console.log("error -> " + err);
            return res.status(500).json("internal error -> " + err);
        } else {
            return res.status(201).json(Object);
        }
    });
}

const finishReport = async (req, res) => {

    const filePath = await new Promise((next) => {
        ReportInterface.findById(req.body._id, (err, docs) => {
            if (!err) {
                next(docs.photo)
            }
        });
    });

    await new Promise((next) => {
        fs.mkdir(`src/public/${filePath}`, { recursive: true }, err => {
            if (err) {
                console.log(err);
                next()
            } else {
                console.log('success')
                next()
            }
        });
    });

    if (await savePhoto(filePath, req.body.photo, 'solved')) {
        ReportInterface.findByIdAndUpdate(req.body._id, { status: 2, finishedDescription: req.body.description }, async (err, Object) => {
            if (err) {
                console.log("error -> " + err);
                return res.status(500).json("internal error -> " + err);
            } else {
                await sendFinalizedMessage(req.body.phones, `http://38.65.157.14:3000/${Object.photo}/solved.png`, req.body.description, Object.folio);
                return res.status(201).json(Object);
            }
        });
    } else {
        return res.status(500).json("internal error");
    }

}

const increaseReport = (req, res) => {
    if (req.body.userphone != '') {
        ReportInterface.findByIdAndUpdate(req.body._id, { $push: { users: req.body.userphone }, $inc: { count: 1 } }, (err, docs) => {
            if (err) {
                console.log("error -> " + err);
                return res.status(500).json("internal error -> " + err);
            } else {
                return res.status(201).json(docs);
            }
        });
    } else {
        ReportInterface.findByIdAndUpdate(req.body._id, { $inc: { count: 1 } }, (err, docs) => {
            if (err) {
                console.log("error -> " + err);
                return res.status(500).json("internal error -> " + err);
            } else {
                return res.status(201).json(docs);
            }
        });
    }
}


const updateReport = async (req, res) => {
    ReportInterface.findByIdAndUpdate(req.params.id, req.body, (err, docs) => {
        if (err) {
            return res.status(500).json("internal error -> " + err);
        } else {
            return res.status(200).json(docs);
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
    changeStatus,
    increaseReport,
    confirmReport,
    finishReport,
    updateReport,
};