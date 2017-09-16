const Transaction = require("../models/transaction.js")

//PROJECTS
transactionController={
    create: function(req, res){
        Transaction.create({
            note :req.body.note,
            trdate:req.body.trdate,
            amount:req.body.amount,
            receipt:req.body.receipt,
            category_id:req.body.category_id,
        }).then( transaction =>{
            res.json({
                message:"Done",
                data:transaction,
            })
        }).catch( err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    update: function(req,res){
        Transaction.update({
            note :req.body.note,
            trdate:req.body.trdate,
            amount:req.body.amount,
            receipt:req.body.receipt,
            category_id:req.body.category_id,
        }, req.params.id).then(transaction=>{
            res.json({
                message:"Done",
                data:transaction,
            })
        }).catch(err=>{
            console.log(err);
            res.status(500).json(err);
        })
    },

    findAll: function (req, res){
        Transaction.findAll(req.params.user_id)
        .then(transaction => {
            res.json({
                message: 'Done',
                data: transaction,
            });
        }).catch(err =>{
            res.status(500).json(err);
        })
    },

    findById: function (req, res){
        Transaction.findById(req.params.id)
        .then(transaction => {
            res.json({
                message: 'Done',
                data: transaction,
            });
        }).catch(err =>{
            res.status(500).json(err);
        })
    },

    delete: function (req, res){
        Transaction.delete(req.params.id)
        .then(()=>{
            res.json({
                message:"Done",
            })
        }).catch(err => {
            res.status(500).json(err);
        })
    },

}


module.exports= transactionController;
