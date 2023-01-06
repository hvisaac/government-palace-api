const UserTypesInterface = require('../interfaces/UserTypesInterface');
const DepartmentInterface = require('../interfaces/DepartmentInterface');
const ReportInterface = require('../interfaces/ReportInterface');
const servicePhonesInterface = require('../interfaces/ServicePhoneInterface');
const ServicePhoneInterface = require('../interfaces/ServicePhoneInterface');
const SecretariatInterface = require('../interfaces/SecretariatInterface');
const UserInterface = require('../interfaces/UserInterface');

const getUserTypes = async (req, res) => {
    UserTypesInterface.find({}, (err, types) => {
        if (err) {
            return res.status(500).json("internal error -> " + error);
        } else {
            return res.status(200).json(types);
        }
    });
}

const getUserType = async (req, res) => {
    UserTypesInterface.find({ _id: req.params._id }, (err, types) => {
        if (err) {
            console.log(err)
            return res.status(500).json("internal error -> " + err);
        } else {
            return res.status(200).json(types);
        }
    });
}

const getServicePhones = async (req, res) => {
    servicePhonesInterface.find({}, (err, types) => {
        if (err) {
            return res.status(500).json("internal error -> " + err);
        } else {
            return res.status(200).json(types);
        }
    });
}


const addServicePhone = async (req, res) => {

    try {
        const object = new ServicePhoneInterface(req.body);
        await object.save();
        return res.status(201).json("success");
    } catch (error) {
        return res.status(500).json("internal error -> " + error);
    }
}

const updateServicePhone = async (req, res) => {
    ServicePhoneInterface.findByIdAndUpdate(req.params.id, req.body, (err, docs) => {
        if (err) {
            return res.status(500).json("internal error -> " + err);
        } else {
            return res.status(200).json(docs);
        }
    });
}

const deleteServicePhone = async (req, res) => {
    ServicePhoneInterface.findByIdAndRemove(req.params.id, (err, docs) => {
        if (err) {
            return res.status(500).json("internal error -> " + err);
        } else {
            return res.status(200).json(docs);
        }
    });
}

const addUserType = async (req, res) => {

    try {
        const newUser = new UserTypesInterface(req.body);
        await newUser.save();
        return res.status(201).json("success");
    } catch (error) {
        console.log(error)
        return res.status(500).json("internal error -> " + error);
    }
}

const updateUserType = async (req, res) => {
    UserTypesInterface.findByIdAndUpdate(req.params.id, req.body, (err, docs) => {
        if (err) {
            return res.status(500).json("internal error -> " + err);
        } else {
            return res.status(200).json(docs);
        }
    });
}

const deleteUserType = async (req, res) => {
    UserTypesInterface.findByIdAndRemove(req.params.id, (err, docs) => {
        if (err) {
            return res.status(500).json("internal error -> " + err);
        } else {
            return res.status(200).json(docs);
        }
    });
}

const addDepartment = async (req, res) => {

    try {
        const newDepartment = new DepartmentInterface(req.body);
        await newDepartment.save();
        return res.status(201).json("success");
    } catch (error) {
        console.log(error)
        return res.status(500).json("internal error -> " + error);
    }
}

const updateDepartment = async (req, res) => {
    DepartmentInterface.findByIdAndUpdate(req.params.id, req.body, (err, docs) => {
        if (err) {
            return res.status(500).json("internal error -> " + err);
        } else {
            return res.status(200).json(docs);
        }
    });
}

const deleteDepartment = async (req, res) => {
    DepartmentInterface.findByIdAndRemove(req.params.id, (err, docs) => {
        if (err) {
            return res.status(500).json("internal error -> " + err);
        } else {
            return res.status(200).json(docs);
        }
    });
}

const getDepartments = async (req, res) => {
    DepartmentInterface.find({}, async (err, departments) => {
        if (err) {
            console.log("error -> " + error);
            return res.status(500).json("internal error -> " + error);
        } else {
            let response = [];

            for (let i = 0; i < Object.keys(departments).length; i++) {
                await new Promise(next => {
                    ReportInterface.find({ department: departments[i]._id }, async (err, reports) => {
                        if (!err) {
                            let pendingReports = 0;
                            let finishedsReports = 0;
                            let workingReports = 0;
                            for (const report of reports) {
                                if (report.status == 0) {
                                    pendingReports++;
                                }
                                if (report.status == 1) {
                                    workingReports++;
                                }
                                if (report.status == 2) {
                                    finishedsReports++;
                                }
                            }
                            let auxDepartment = {
                                _id: departments[i]._id,
                                name: departments[i].name,
                                color: departments[i].color,
                                icon: departments[i].icon,
                                href: departments[i].href,
                                reports: reports.length,
                                pendingReports: pendingReports,
                                workingReports: workingReports,
                                finishedsReports: finishedsReports,
                                info: departments[i].info,
                                secretariat: JSON.stringify(await getSecretariat(departments[i].secretariat)),
                                available: departments[i].available
                            }

                            response.push(auxDepartment);
                        }
                        next();
                    });
                });
            }

            return res.status(200).json(response);
        }
    }
    )
}

async function getSecretariat(id) {
    return await new Promise((next) => {
        SecretariatInterface.find({ _id: id }, (err, data) => {
            if (!err) { next(data) }
        });
    });
}

async function getDepartmentsBySecretariat(secretariat) {
    const Departments = new Promise((next) => {
        DepartmentInterface.find({ secretariat: secretariat }, async (err, departments) => {
            if (err) {
                console.log("error -> " + error);
                return res.status(500).json("internal error -> " + error);
            } else {
                let response = [];

                for (let i = 0; i < Object.keys(departments).length; i++) {
                    await new Promise(next => {
                        ReportInterface.find({ department: departments[i]._id }, (err, reports) => {
                            if (!err) {
                                let pendingReports = 0;
                                let finishedsReports = 0;
                                let workingReports = 0;
                                for (const report of reports) {
                                    if (report.status == 0) {
                                        pendingReports++;
                                    }
                                    if (report.status == 1) {
                                        workingReports++;
                                    }
                                    if (report.status == 2) {
                                        finishedsReports++;
                                    }
                                }
                                let auxDepartment = {
                                    _id: departments[i]._id,
                                    name: departments[i].name,
                                    color: departments[i].color,
                                    icon: departments[i].icon,
                                    href: departments[i].href,
                                    reports: reports.length,
                                    pendingReports: pendingReports,
                                    workingReports: workingReports,
                                    finishedsReports: finishedsReports,
                                    info: departments[i].info,
                                    secretariat: departments[i].secretariat,
                                    available: departments[i].available
                                }

                                response.push(auxDepartment);
                            }
                            next();
                        });
                    });
                }

                next(response)
            }
        })
    });

    return Departments

}

const addSecretariat = async (req, res) => {

    try {
        const secretariatInterface = new SecretariatInterface(req.body);
        await secretariatInterface.save();
        return res.status(201).json("success");
    } catch (error) {
        console.log(error)
        return res.status(500).json("internal error -> " + error);
    }
}

function switchDepartments(idSecretariat, available) {
    return new Promise((next) => {
        DepartmentInterface.updateMany({ secretariat: idSecretariat }, { available: available }, (err, docs) => {
            if (!err) {
                next(docs)
            }
        })
    });
}

const switchSecretariat = async (req, res) => {
    SecretariatInterface.findByIdAndUpdate(req.params.id, { available: req.body.available }, async (err, docs) => {
        if (!err) {
            await switchDepartments(docs._id, req.body.available);
            return res.status(200).json(docs);
        }
    });
}

const updateSecretariat = async (req, res) => {
    SecretariatInterface.findByIdAndUpdate(req.params.id, req.body, (err, docs) => {
        if (err) {
            return res.status(500).json("internal error -> " + err);
        } else {
            return res.status(200).json(docs);
        }
    });
}

const deleteSecretariat = async (req, res) => {
    SecretariatInterface.findByIdAndRemove(req.params.id, (err, docs) => {
        if (err) {
            return res.status(500).json("internal error -> " + err);
        } else {
            return res.status(200).json(docs);
        }
    });
}

const getSecretariats = async (req, res) => {
    SecretariatInterface.find({}, async (err, secretariat) => {
        if (err) {
            console.log("error -> " + error);
            return res.status(500).json("internal error -> " + error);
        } else {
            let response = [];

            for (let i = 0; i < Object.keys(secretariat).length; i++) {
                const auxSecretariat = {
                    _id: secretariat[i]._id,
                    name: secretariat[i].name,
                    available: secretariat[i].available,
                    departments: await getDepartmentsBySecretariat(secretariat[i]._id),
                    secretary: await getSecretary(secretariat[i]._id)
                }


                response.push(auxSecretariat);
            }

            return res.status(200).json(response);
        }
    }
    )
}

function getSecretary(secretariat) {
    return new Promise((next) => {
        UserInterface.find({ secretariat: secretariat }, (err, data) => {
            console.log(secretariat)
            if (!err) { next(data) }
        })
    });
}

module.exports = {
    addUserType,
    addDepartment,
    getDepartments,
    getUserTypes,
    getServicePhones,
    addServicePhone,
    getUserType,
    updateDepartment,
    updateServicePhone,
    updateUserType,
    deleteDepartment,
    deleteServicePhone,
    deleteUserType,
    addSecretariat,
    updateSecretariat,
    deleteSecretariat,
    getSecretariats,
    switchSecretariat
};