
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



const groupHistorySchema = new mongoose.Schema({

    title: {
        type: String,
        trim: true,
        maxlength: 70,
    },

    description: {
        type: String,
        trim: true
    },


    user: {
        type: ObjectId,
        ref: "User",
        required: true
    },

    email: {
        type: String,
        trim: true,
        required: [true, 'e-mail is required'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },

    password: {
        type: String,
        trim: true,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must have at least 8 characters'],
        validate: {
            validator: function(password) {
                return /[!@#$%^&*(),.?":{}|<>]/.test(password);
            },
            message: 'Password must contain at least one special character'
        }
    },




}, { timestamps: true })

const userSchema = new mongoose.Schema({

    Username: {
        type: String,
        trim: true,
        required: [true, 'UserName is required'],
        maxlength: 32,
    },
   

    

}, { timestamps: true })

//encrypting password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10)
})

// compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// return a JWT token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
        expiresIn: 1800
    });
}



module.exports = mongoose.model("User", userSchema);