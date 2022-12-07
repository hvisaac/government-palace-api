const UserTypesInterface = require('../interfaces/UserTypesInterface');
const DepartmentInterface = require('../interfaces/DepartmentInterface');
const ReportInterface = require('../interfaces/ReportInterface');

const addUserTyoe = async (req, res) => {

    try {
        console.log("adding user");
        const newUser = new UserTypesInterface(req.body);
        await newUser.save();
        return res.status(201).json("success");
    } catch (error) {
        return res.status(500).json("internal error -> " + error);
    }
}

const addDepartment = async (req, res) => {

    try {
        console.log("adding department");
        const newDepartment = new DepartmentInterface(req.body);
        await newDepartment.save();
        return res.status(201).json("success");
    } catch (error) {
        return res.status(500).json("internal error -> " + error);
    }
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
                    ReportInterface.find({ department: departments[i]._id }, (err, reports) => {
                        if (!err) {
                            let finishedsReports = 0;
                            let workingReports = 0;
                            for (const report of reports){
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
                                workingReports: workingReports,
                                finishedsReports: finishedsReports
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

module.exports = { addUserTyoe, addDepartment, getDepartments };