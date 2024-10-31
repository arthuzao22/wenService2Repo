const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

exports.create = (req,res) =>{
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const tutorial = {
        title: req.
    }
}