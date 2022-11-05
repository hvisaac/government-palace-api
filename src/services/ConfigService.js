const UserTypesInterface = require('../interfaces/UserTypesInterface');

const AddUserTyoe = async (req, res) => {

    try {
        console.log("adding user");
        const newUser = new UserTypesInterface(req.body);
        await newUser.save();
        return res.status(201).json("success");
    } catch (error) {
        return res.status(500).json("internal error -> " + error);
    }
}

module.exports = { AddUserTyoe };