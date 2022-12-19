const hierarchyInterface = require('../interfaces/HierarchyInterface');

const getHierarchies = async (req, res) => {
    hierarchyInterface.find({}, (err, types) => {
        if (err) {
            return res.status(500).json("internal error -> " + error);
        } else {
            return res.status(200).json(types);
        }
    }); 
}

const createHierarchy = async (req, res) => {

    try {
        const hierarchy = new hierarchyInterface(req.body);
        await hierarchy.save();
        return res.status(201).json("success");
    } catch (error) {
        console.log("error -> " + err);
        return res.status(500).json("internal error -> " + err);
    }
}

const updateHierarchy = async (req, res) => {
    hierarchyInterface.findByIdAndUpdate(req.params.id, req.body, (err, docs) => {
        if (err) {
            return res.status(500).json("internal error -> " + err);
        } else {
            return res.status(200).json(docs);
        }
    });
} 

const deleteHierarchy = async (req, res) => {
    hierarchyInterface.findByIdAndRemove(req.params.id, (err, docs) => {
        if (err) {
            return res.status(500).json("internal error -> " + err);
        } else {
            return res.status(200).json(docs);
        }
    });
} 

module.exports = {
    createHierarchy,
    updateHierarchy,
    deleteHierarchy,
    getHierarchies
}