const joi = require("joi");

module.exports = ( req, res ,next) => {
    const {error} = validate(req.body);
        if(error)
            return res.status(400).send({message:error.details[0].message});
    next();
}

const validate = (data) =>{
    const schema = joi.object({
        email:joi.string().email().required().label("Email"),
        password:joi.string().required().label("Password"),
    });
    return schema.validate(data);
}