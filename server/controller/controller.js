var Userdb= require('../model/model');

//create and save new user

exports.create=(req,res)=>{
    //validate the request
    if(!req.body){
        res.status(400).send({message :"Conetnt can not be empty!"});
        return;
    }

    //new user
    const user= new Userdb({
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        status:req.body.status
    })

    //save user in the db
    user
        .save(user)
        .then(data=>{
            res.send(data)
            //res.redirect('/add-user');
        })
        .catch(err =>{
            res.status(500).send({
                message:err.message||"someError "
            });
        });
}

//retrive and return all users/ retrive and retrun a singoe user
exports.find=(req,res)=>{

    if(req.query.id){
        const id = req.query.id;


        Userdb.findById(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message:"Not found user with id "+ id})
            }else{
                res.send(data)
            }
        })
        .catch(err=>{
            res.status(500).send({message:"Error retriving user with the id"+ id})
        })

    }else{
        Userdb.find()
        .then(user=>{
            res.send(user)
        })
        .catch(err=>{
            res.status(500).send({message:err.message||"Error Occured while Retriveing the user!!!"})
        })
    }
}

//Update a new identified user by user id
exports.update= (req,res)=>{
    if(!req.body){
        return res
        .status(400)
        .send({message:"Data to update can not be empty!!"})
    }

    const id= req.params.id;
    Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
    .then(data=>{
        if(!data){
            res.status(404).send({message:"Cannot update user with ${id}. Maybe user not found!!"})
        }else{
            res.send(data)
        }
    })
    .catch(err=>{
        res.status(500).send({message:"Error Update User Infromation"})
    })  
}

//Delete a ause with specified user id in the request
exports.delete= (req,res)=>{
    const id= req.params.id;

    Userdb.findByIdAndDelete(id)
    .then(data=>{
        if(!data){
            res.status(404).send({message:"Cannot Delete with ${id}. Maybe id is wrong"})
        }else{
            res.send({
                message:"User deleted!!!"
            })
        }
    })
    .catch(err=>{
        res.status(500).send({
            message:"Could not delete user with the id"+ id
        });
    });
}