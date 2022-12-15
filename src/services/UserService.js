const UserInterface = require('../interfaces/UserInterface');


const signUp = async (req, res) => {

    try {
        console.log("adding user");
        const newUser = new UserInterface(req.body);
        await newUser.save();
        return res.status(201).json("success");
    } catch (error) {
        console.log("error -> " + err);
        return res.status(500).json("internal error -> " + err);
    }
}

const signIn = async (req, res) => {
    console.log("Signing user");
    UserInterface.find({ phone: req.body.phone, password: req.body.password }, (err, user) => {
        if (err) {
            console.log("error -> " + err);
            return res.status(500).json("internal error -> " + err);
        }
        else {
            console.log(user);
            return res.status(200).json(user);
        }
    });
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
    UserInterface.find({}, {password: 0}, (err, user) => {
        if (err) {
            console.log("error -> " + err);
            return res.status(500).json("internal error -> " + err);
        }
        else {
            console.log(user);
            return res.status(200).json(user);
        }
    });
}

const getUsersPerDepartment = async (req, res) => {
    UserInterface.find({department: req.body.department}, {password: 0}, (err, user) => {
        if (err) {
            console.log("error -> " + err);
            return res.status(500).json("internal error -> " + err);
        }
        else {
            console.log(user);
            return res.status(200).json(user);
        }
    });
}

module.exports = { 
    signUp, 
    signIn, 
    getUsers, 
    getUsersPerDepartment,
    updateUser,
    deleteUser
 };