const Joi = require("joi");
const bcrypt = require("bcryptjs");
const { User } = require("../models/user.model");
const { generateToken } = require("../utils/jwt");

const userJoiSchema = {
    login: Joi.object().keys({
        password: Joi.string(),
        email: Joi.string().email({ tlds: { allow: ['com'] } }).error(() => Error('Email is not valid'))
    }),
    register: Joi.object().keys({
        password: Joi.string().required().min(8),
        email: Joi.string().email({ tlds: { allow: ['com'] } }).error(() => Error('Email is not valid')),
        firstName: Joi.string(),
        lastName: Joi.string()
    })
};

const checkIfUserExists = async (email) => {
    const user = await User.findOne({ email });
    return user;
};

exports.register = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(200).send(newUser);
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    const body = req.body;
    try {
        const validate = userJoiSchema.login.validate(body);
        if (validate.error) {
            throw Error(validate.error);
        }
        const user = await checkIfUserExists(body.email);
        if (!user || !(await bcrypt.compare(body.password, user.password))) {
            throw new Error('Invalid email or password');
        }
        const token = generateToken(user);
        return res.send({ user, token });
    } catch (error) {
        next(error);
    }
};

// exports.getAllUsers = async (req, res, next) => {
//     try {
//         const users = await User.find({});
//         res.send(users);
//     } catch (error) {
//         next(error);
//     }
// };

// exports.getUserById = async (req, res, next) => {
//     try {
//         const user = await User.findById(req.params.id);
//         res.send(user);
//     } catch (error) {
//         next(error);
//     }
// };

// exports.editUser = async (req, res, next) => {
//     try {
//         const data = req.body;
//         const updatedUser = await User.findByIdAndUpdate(req.params.id, data, { new: true });
//         res.status(200).send(updatedUser);
//     } catch (error) {
//         next(error);
//     }
// };

// exports.deleteUser = async (req, res, next) => {
//     try {
//         await User.findByIdAndDelete(req.params.id);
//         res.sendStatus(204);
//     } catch (error) {
//         next(error);
//     }
// };
