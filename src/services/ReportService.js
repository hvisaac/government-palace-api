const ReportInterface = require('../interfaces/ReportInterface');
const DepartmentInterface = require('../interfaces/DepartmentInterface');
const fs = require('fs');
const { savePhoto } = require('../utils/photoUtils');
const { sendFinalizedMessage } = require('../services/WhatsAppService');

const confirmReport = async (req, res) => {

    let matchReport;
    const reports = await getReportsLocation(req.body.currentLat, req.body.currentLong);

    for (const report of reports) {
        const R = 6371; //earth radio
        const sumLat = report.geolocation.latitude - req.body.currentLat;
        const sumLong = report.geolocation.longitude - req.body.currentLong;
        const a = Math.pow(Math.sin(sumLat / 2), 2) + (Math.cos(req.body.currentLat) * Math.cos(report.geolocation.latitude) * Math.pow(Math.sin(sumLong / 2), 2));
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;

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
                },
                status: {
                    $gte: 0,
                    $lte: 1
                }
            },
            { photo: 0, finishedPhoto: 0 },
            (err, docs) => {
                if (err) { console.log(err); next(err) }
                else { next(docs) }
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
            let reportedImage;
            let solvedImage;
            if (fs.existsSync(`src/public/${reports[0].photo}/reported.png`)) {
                reportedImage = fs.readFileSync(`src/public/${reports[0].photo}/reported.png`, { encoding: 'base64' });
            } else {
                reportedImage = fs.readFileSync(`src/public/images/nodisponible.png`, { encoding: 'base64' });
            }
            if (fs.existsSync(`src/public/${reports[0].photo}/solved.png`)) {
                solvedImage = fs.readFileSync(`src/public/${reports[0].photo}/solved.png`, { encoding: 'base64' });
            } else {
                solvedImage = fs.readFileSync(`src/public/images/nodisponible.png`, { encoding: 'base64' });
            }


            await new Promise(next => {
                DepartmentInterface.find({ _id: reports[0].department }, (err, departments) => {
                    if (!err) {
                        const auxDepartment = {
                            _id: departments[0]._id,
                            name: departments[0].name,
                            color: departments[0].color,
                            icon: departments[0].icon
                        }
                        reports[0].department = JSON.stringify(auxDepartment);
                    }
                    next();
                });
            });

            const response = {
                department: reports[0].department,
                description: reports[0].description,
                finishedDescription: reports[0].finishedDescription,
                status: reports[0].status,
                photo: reports[0].photo,
                geolocation: reports[0].geolocation,
                users: reports[0].users,
                count: reports[0].count,
                folio: reports[0].folio,
                available: reports[0].available,
                createdAt: reports[0].createdAt,
                updatedAt: reports[0].updatedAt,
                media: reports[0].media
            }

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
    if (req.body.department == '') {
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
    } else {
        ReportInterface.find({ description: { $regex: req.body.content }, department: req.body.department }, { photo: 0, finishedPhoto: 0 }, async (err, reports) => {
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
}


const getReportsByDate = async (req, res) => {

    if (req.body.department == '') {
        ReportInterface.find({ createdAt: { $gte: req.body.beginDate, $lte: req.body.finalDate } }, async (err, reports) => {
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
    } else {
        ReportInterface.find({ createdAt: { $gte: req.body.beginDate, $lte: req.body.finalDate }, department: req.body.department }, async (err, reports) => {
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
    report['folio'] = await getFolio();
    /*const date = new Date();
    const filePath = `reports/${date.getFullYear()}/${date.getMonth() + 1}/${report.folio}`;
    await new Promise((next) => {
        fs.mkdir(`src/public/${filePath}`, { recursive: true }, err => {
            if (err) {
                console.log(err);
                next()
            } else {
                console.log('created path')
                next()
            }
        });
    });*/

    //if (req.body.photo == '') {
    report['photo'] = '';

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
    /*} else {
        report['photo'] = filePath;

        if (await savePhoto(filePath, report.photo, 'reported')) {
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
            return res.status(500).json("internal error")
        }
    }*/

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

    if (req.body.photo == null || req.body.photo == undefined || req.body.photo == "") {
        ReportInterface.findByIdAndUpdate(req.body._id, { status: 2, finishedDescription: req.body.description }, async (err, Object) => {
            if (err) {
                console.log("error -> " + err);
                return res.status(500).json("internal error -> " + err);
            } else {
                try {
                    await sendFinalizedMessage(req.body.phones, `http://38.65.157.46:3000/images/nodisponible.png`, req.body.description, Object.folio);
                    return res.status(201).json(Object);
                } catch (error) {

                }
            }
        });
    } else {
        ReportInterface.findByIdAndUpdate(req.body._id, { "media.resolvedImage": req.body.photo, status: 2, finishedDescription: req.body.description }, async (err, Object) => {
            if (err) {
                console.log("error -> " + err);
                return res.status(500).json("internal error -> " + err);
            } else {
                try {
                    await sendFinalizedMessage(req.body.phones, req.body.photo, req.body.description, Object.folio);
                    return res.status(201).json(Object);
                } catch (error) {

                }
            }
        });
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

const addNote = (req, res) => {
    ReportInterface.findByIdAndUpdate(req.body._id, { $push: { notes: req.body } }, (err, docs) => {
        if (err) {
            console.log("error -> " + err);
            return res.status(500).json("internal error -> " + err);
        } else {
            return res.status(201).json(docs);
        }
    });
}


const updateReport = async (req, res) => {
    console.log(req.body)
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