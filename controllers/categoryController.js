const Category = require("../models/category.js")

//PROJECTS
categoryController={
    create: function(req, res){
        Category.create({
            name :req.body.name,
            description:req.body.description,
            include:req.body.include,
            operation:req.body.operation,
            user_id:req.body.user_id,
        }).then( category =>{
            res.json({
                message:"Done",
                data:category,
            })
        }).catch( err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    update: function(req,res){
        console.log(req.body);
        Category.update({
            name :req.body.name,
            description:req.body.description,
            include:req.body.include,
            operation:req.body.operation,
            user_id:req.body.user_id,
            id: req.params.id,
        }).then(category=>{
            res.json({
                message:"Done",
                data:category,
            })
        }).catch(err=>{
            console.log(err);
            res.status(500).json(err);
        })
    },

    findAll: function (req, res){
        Category.findAll(req.params.userid)
        .then(category => {
            res.json({
                message: 'Done',
                data: category,
            });
        }).catch(err =>{
            res.status(500).json(err);
        })
    },

    findById: function (req, res){
        Category.findById(req.params.id)
        .then(category => {
            res.json({
                message: 'Done',
                data: category,
            });
        }).catch(err =>{
            res.status(500).json(err);
        })
    },

    delete: function (req, res){
        Category.delete(req.params.id)
        .then(()=>{
            res.json({
                message:"Done",
            })
        }).catch(err => {
            res.status(500).json(err);
        })
    },


}


module.exports= categoryController;
