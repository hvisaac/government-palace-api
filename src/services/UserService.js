const UserInterface = require('../interfaces/UserInterface');

const SignUp = async (req, res) => {

    try {
        console.log("adding user");
        const newUser = new UserInterface(req.body);
        await newUser.save();
        return res.status(201).json("success");
    } catch (error) {
        console.log("error -> " + error);
        return res.status(500).json("internal error -> " + error);
    }
}

const SignIn = async (req, res) => {
    console.log("Signing user");
    UserInterface.find({ phone: req.body.phone, password: req.body.password }, (err, user) => {
        if (err) {
            console.log("error -> " + error);
            return res.status(500).json("internal error -> " + error);
        }
        else {
            console.log(user);
            return res.status(200).json(user);
        }
    });
}

module.exports = { SignUp, SignIn };