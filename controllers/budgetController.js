const Budget = require("../models/budget.js")

//PROJECTS
budgetController={
    create: function(req, res){
        Budget.create({
            name :req.body.name,
            description:req.body.description,
            amount:req.body.amount,
            initdate:req.body.initdate,
            enddate:req.body.enddate,
            user_id:req.body.user_id,
        }).then( budget =>{
            res.json({
                message:"Done",
                data:budget,
            })
        }).catch( err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    update: function(req,res){
        console.log(req.body);
        Budget.update({
            name :req.body.name,
            description:req.body.description,
            amount:req.body.amount,
            initdate:req.body.initdate,
            enddate:req.body.enddate,
            user_id:req.body.user_id,
            id: req.params.id,
        }).then(budget=>{
            res.json({
                message:"Done",
                data:budget,
            })
        }).catch(err=>{
            console.log(err);
            res.status(500).json(err);
        })
    },

    findAll: function (req, res){
        Budget.findAll(req.params.userid)
        .then(budget => {
            res.json({
                message: 'Done',
                data: budget,
            });
        }).catch(err =>{
            res.status(500).json(err);
        })
    },

    findById: function (req, res){
        Budget.findById(req.params.id)
        .then(budget => {
            res.json({
                message: 'Done',
                data: budget,
            });
        }).catch(err =>{
            res.status(500).json(err);
        })
    },

    delete: function (req, res){
        Budget.delete(req.params.id)
        .then(()=>{
            res.json({
                message:"Done",
            })
        }).catch(err => {
            res.status(500).json(err);
        })
    },
}


module.exports= budgetController;
