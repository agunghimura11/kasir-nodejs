import User from './../models/userModel.js'

// get all user
async function getUser (req, res){
    // find all data in db
    const user = await User.find({})

    if(user){
        res.json(user)
    } else {
        res.status(404).json({
            message: "User not found"
        })
    }
}

// Update role user
async function updateRole(req,res){
    // json input { "id": "","role":""}
    const{
        id,
        role
    } = req.body;
    
    var saltRounds = 10 // total hash

    const currentUser = await new Promise((resolve, reject)=>{ // new promise to do find by id user
        User.findOne({"_id": id}, function(err, user){
            if(err) reject(err) // if error send reject
            resolve(user) // if success send resolve
        })
    })
    if(currentUser){
        User.updateOne({_id: id}, {
            role : role
        }, function(err, user){
            if(err) throw err
            res.json({
                message: 'Role Update Successfully'
            })
        })
    }else{
        res.status(404).json({ // return 404 if data not found
            message: 'User not found'
        })
    }
}

// Update user data
async function updateUser(req,res){
    // json input { "id": "","username":"admin","password":"admin"}
    const{
        id,
        username,
        lastname,
        password,
        role
    } = req.body;
    
    var saltRounds = 10 // total hash

    const currentUser = await new Promise((resolve, reject)=>{ // new promise to do find by id user
        User.findOne({"_id": id}, function(err, user){
            if(err) reject(err) // if error send reject
            resolve(user) // if success send resolve
        })
    })
    if(currentUser){
        User.updateOne({_id: id}, {
            username: username,
            lastname: lastname,
            password: password,
            role : role,
        }, function(err, user){
            if(err) throw err
            res.json({
                message: 'User Update Successfully'
            })
        })
    }else{
        res.status(404).json({ // return 404 if data not found
            message: 'User not found'
        })
    }
}

// Delete field by id
async function deleteUser (req, res) {
    const currentUser = await User.findById(req.params.id) // awit for async find by id data

    if(currentUser){ // if success remove data
        await currentUser.remove()
        res.json({
            message: 'User removed successfully'
        })
    }else{
        res.status(404).json({ // return 404 if data not found
            message: 'User not found'
        })
    }
}

export default { getUser, deleteUser, updateUser, updateRole }