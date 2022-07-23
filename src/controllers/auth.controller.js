import User from "../model/user";
import Role from "../model/role";

import jwt from "jsonwebtoken";
import config from "../config";

export const signUp = async (req, res) => {
  try {
    // Getting the Request Body
    const { username, email, password, roles, sintomas,diagnostico } = req.body;
    // Creating a new User Object
    const newUser = new User({
      username,
      email,
      password: await User.encryptPassword(password),
      sintomas,
      diagnostico:"Sin Diagnostico"
    });

    // checking for roles
    if (req.body.roles) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      newUser.roles = foundRoles.map((role) => role._id);
    } else {
      const role = await Role.findOne({ name: "user" });
      newUser.roles = [role._id];
    }

    // Saving the User Object in Mongodb
    const savedUser = await newUser.save();

    // Create a token
    const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
      expiresIn: 86400, // 24 hours
    });

    return res.status(200).json({ token, 
                                  status: true,
                                 title: 'Registro Successfully.' });

   

  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const signin = async (req, res) => {
  try {
    // Request body email can be an email or username
    const userFound = await User.findOne({ email: req.body.email }).populate(
      "role"
    );

    if (!userFound) return res.status(400).json({ message: "User Not Found" });

    const matchPassword = await User.comparePassword(
      req.body.password,
      userFound.password
    );

    if (!matchPassword)
      return res.status(401).json({
        token: null,
        message: "Invalid Password",
      });

    const token = jwt.sign({ id: userFound._id }, config.SECRET, {
      expiresIn: 86400, // 24 hours
    });



    res.json({ token,status: true,id:userFound._id,
      title: 'Singin Successfully.'});
  } catch (error) {
    console.log(error);
  }
};


export const registro=async (req, res) => {
    try {
    if (req.body && req.body.username && req.body.password) {

      user.find({ username: req.body.username }, (err, data) => {

        if (data.length == 0) {

          let User = new user({
            username: req.body.username,
            password: req.body.password
          });
          User.save((err, data) => {
            if (err) {
              res.status(400).json({
                errorMessage: err,
                status: false
              });
            } else {
              res.status(200).json({
                status: true,
                title: 'Registered Successfully.'
              });
            }
          });

        } else {
          res.status(400).json({
            errorMessage: `UserName ${req.body.username} Already Exist!`,
            status: false
          });
        }

      });

    } else {
      res.status(400).json({
        errorMessage: 'Add proper parameter first!',
        status: false
      });
    }
  } catch (e) {
    res.status(400).json({
      errorMessage: 'Something went wrong!',
      status: false
    });
  }
};