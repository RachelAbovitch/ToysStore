const bcrypt = require("bcryptjs");
const Joi=require("joi");
const jwt = require('jsonwebtoken');
const { Toy } = require("../models/toy.model");




// קביעת הסכמת Joi לעבודה עם נתונים
const toyJoiSchema = {
    create: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
        category: Joi.string().required(),
        img_url: Joi.string(),
        price: Joi.number().required(),
        id_user: Joi.string().required()
    }),
    update: Joi.object().keys({
        name: Joi.string(),
        description: Joi.string(),
        category: Joi.string(),
        img_url: Joi.string(),
        price: Joi.number(),
        id_user: Joi.string()
    })
};

exports.getAllToys = async (req, res, next) => {
    try {
        const toysArray = await Toy.find({});
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const toysPerPage = 10;
        const startIndex = (page - 1) * toysPerPage;
        const toys = toysArray.slice(startIndex, startIndex + toysPerPage);

        res.send(toys);
    } catch (error) {
        next(error);
    }
};


exports.getToyById = async (req, res, next) => {
    try {
        const toy = await Toy.findById(req.params.id);
        res.send(toy);
    } catch (error) {
        next(error);
    }
};
exports.getToyByInfoOrName= async(req,res,next)=>{
    try{
    const {page} = req.query;
    const { s } = req.query;
    const perPage = 10;
    const skip = (page -1)* perPage;
    const toys = await Toys.find({ $or: [{ name: s }, { info: s }] })
        .skip(skip).limit(perPage);
    res.send(toys)
    }
    catch(error){
        next(error);
    }
};
exports.getByCategory =  async(req, res, next) => {
  try {
    const category = req.params.category;
    const page = req.query.page || 1;
    const perPage = 10;

    const toys = await Toy.find({ category })
        .skip((page - 1) * perPage)
        .limit(perPage);

    res.json(toys);
} catch (error) {
    next(error);
}
};


const getUserIdFromToken = (authorizationHeader) => {
    if (!authorizationHeader) {
        throw new Error('Authorization header is missing');
    }

    const token = authorizationHeader.split(' ')[1]; 

    try {
        const decodedToken = jwt.verify(token, 'your_secret_key'); 
        return decodedToken.userId; 
    } catch (error) {
        throw new Error('Invalid token');
    }
};

exports.addToy = async (req, res, next) => {
    try {
        const body = req.body;
        const validate = toyJoiSchema.create.validate(body);
        if (validate.error) {
            throw Error(validate.error);
        }

        const userId = getUserIdFromToken(req.headers.authorization); 
        body.owner_id = userId;

        const newToy = new Toy(body);
        await newToy.save();
        res.status(201).send(newToy);
    } catch (error) {
        next(error);
    }
};

exports.updateToy = async (req, res, next) => {
    try {
        const toyId = req.params.id;
        const body = req.body;
        const validate = toyJoiSchema.update.validate(body);
        if (validate.error) {
            throw Error(validate.error);
        }

        const userId = getUserIdFromToken(req.headers.authorization); 
        if(body.owner_id === userId)
          {const updatedToy = await Toy.findByIdAndUpdate(toyId, body, { new: true });
        res.status(200).send(updatedToy);
         }
         res.status(400).send("your not the owners of this item");
    } catch (error) {
        next(error);
    }
};

exports.deleteToy = async (req, res, next) => {
    try {
        const toyId = req.params.id;
        const userId = getUserIdFromToken(req.headers.authorization); 
        if(body.owner_id === userId)

       { await Toy.findOneAndDelete({ _id: toyId, id_user: userId });
        res.sendStatus(204);
    }
    res.status(400).send("your not the owners of this item");
    } catch (error) {
        next(error);
    }
};