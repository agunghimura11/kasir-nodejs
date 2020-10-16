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

export default { getUser }