const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs");
const { user, validationCreateUser, validationLoginUser } = require("./../../../Database/models/user.model");

module.exports.getAllUsers = asyncHandler(async (req, res) => {
    const User_Per_Page = 10;
    const { pageNumber } = req.query;
    const data = await user.find().sort({ createdAt: -1 });
    const Total_Users = data.length;
    const Total_Pages = Math.ceil(data.length / User_Per_Page);

    if (pageNumber) {
        const data = await user.find()
            .sort({ createdAt: -1 })
            .skip((pageNumber - 1) * User_Per_Page)
            .limit(User_Per_Page);
        return res.json({ message: "success", data, Total_Users, Total_Pages })
    }

    if (data.length === 0) {
        return res.json({ messgae: "Not Found Data", data })
    }
    res.json({ message: "success", data, Total_Users, Total_Pages })

})

module.exports.getUserById = asyncHandler(async (req, res) => {
    const data = await user.findById(req.params.id).select("-password");
    if (!data) {
        return res.json({ message: "Not Found Data" })
    }
    res.json({ message: "succes", data })
})

module.exports.addNewUserCtrl = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    const find_User = await user.findOne({email});
    if(find_User){
        return res.status(400).json({message:"Email Already Exist"})
    }

    const { error } = validationCreateUser(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt)
    const User = await user.create({
        name: name,
        email: email,
        password: hashPassword
    })
    res.status(200).json({ message: "Register Successfully", User});
})

module.exports.loginUserCtrl = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const { error } = validationLoginUser(req.body);

    if (error) {
        return res.status(400).json({message: error.details[0].message})
    }

    const User = await user.findOne({ email });
    if (!User) {
        return res.status(404).json({ message: "Email or Password Is Wrong" })
    }

    const isPassMatch = bcrypt.compareSync(password, User.password)
    if (!isPassMatch) {
        return res.status(404).json({ message: "Email or Password Is Wrong" })
    }
    const token = User.generateAuthToken();
    res.json({
        id: User._id,
        name: User.name,
        isAdmin: User.isAdmin,
        token
    })
})

module.exports.updateUserCtrl = asyncHandler(async (req, res) => {
    const User = await user.findById(req.params.id);
    if (!User) {
        return res.status(404).json({ message: "This User Not Found" })
    }
    if (req.body.password) {        
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hashSync(req.body.password, salt);
    }
    const UserUpdt = await user.findByIdAndUpdate(req.params.id, req.body)
    res.json({ messgae: "User Updated Successfully", UserUpdt})

})


