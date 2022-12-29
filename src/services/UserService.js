const UserInterface = require('../interfaces/UserInterface');
const HierarchyInterface = require('../interfaces/HierarchyInterface');
const { response } = require('express');

const signIn = async (req, res) => {
    console.log("Signing user");
    UserInterface.find({ name: req.body.name, password: req.body.password }, async (err, user) => {
        if (err) {
            console.log("error -> " + err);
            return res.status(500).json("internal error -> " + err);
        }
        else {
            if (user.length > 0) {
                user[0].hierarchy = await new Promise(next => {
                    HierarchyInterface.find({ _id: user[0].hierarchy }, (err, hierarchy) => {
                        if (!err) {
                            next(JSON.stringify(hierarchy[0]));
                        }

                    });
                });

                return res.status(200).json(user);
            } else {
                return res.status(204).json('user not found');
            }

        }
    });
}


const signUp = async (req, res) => {

    try {
        console.log("adding user");
        console.log(req.body)
        const newUser = new UserInterface(req.body);
        await newUser.save().then(response => console.log(response));
        return res.status(201).json("success");
    } catch (error) {
        console.log("error -> " + error);
        return res.status(500).json("internal error -> " + error);
    }
}

const updateUser = async (req, res) => {
    UserInterface.findByIdAndUpdate(req.params.id, req.body, (err, docs) => {
        if (err) {
            return res.status(500).json("internal error -> " + err);
        } else {
            return res.status(200).json(docs);
        }
    });
}

const deleteUser = async (req, res) => {
    UserInterface.findByIdAndRemove(req.params.id, (err, docs) => {
        if (err) {
            return res.status(500).json("internal error -> " + err);
        } else {
            return res.status(200).json(docs);
        }
    });
}

const getUsers = async (req, res) => {
    UserInterface.find({}, { password: 0 }, async (err, user) => {
        if (err) {
            console.log("error -> " + err);
            return res.status(500).json("internal error -> " + err);
        }
        else {
            for (let i = 0; i < Object.keys(user).length; i++) {
                await new Promise(next => {
                    HierarchyInterface.find({ _id: user[i].hierarchy }, (err, hierarchy) => {
                        if (!err) {
                            const auxHierarchy = {
                                _id: hierarchy[0]._id,
                                name: hierarchy[0].name,
                                level: hierarchy[0].level,
                            }

                            user[i].hierarchy = JSON.stringify(auxHierarchy);
                        }
                        next();
                    });
                });
            }
            return res.status(200).json(user);
        }
    });
}

const getUsersPerDepartment = async (req, res) => {
    UserInterface.find({ department: req.body.department }, { password: 0 }, (err, user) => {
        if (err) {
            console.log("error -> " + err);
            return res.status(500).json("internal error -> " + err);
        }
        else {
            return res.status(200).json(user);
        }
    });
}

const changeUserAndPassword = async (req, res) => {

    UserInterface.findByIdAndUpdate(req.params.id, req.body, (err, docs) => {
        if (err) {
            return res.status(500).json("internal error -> " + err);
        } else {
            return res.status(200).json(docs);
        }
    });

}

module.exports = {
    signUp,
    signIn,
    getUsers,
    getUsersPerDepartment,
    updateUser,
    deleteUser,
    changeUserAndPassword
};