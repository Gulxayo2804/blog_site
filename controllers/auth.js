const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.signup = async (req, res, next) => {
    try {
        const hashpassword = await bcrypt.hash(req.body.password, 12);
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashpassword
        })
        const result = await user.save();
        res.status(201).json({ message: 'Succes!', userId: result._id });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadeduser;
    try {
        const user = await User.findOne({ email: email })
        if (!user) {
            const error = new Error('A user with this email could not be found');
            error.statusCode = 401;
            throw error;
        }
        loadeduser = user;
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            const error = new Error('Wrong password');
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign(
            {
                email: loadeduser.email,
                userId: loadeduser._id.toString()
            },
            'gavhsefewfijiqejfoqjeiqefbnjcsxam',
            { expiresIn: '1h' }
        )
        res.status(200).json({ token, userId: loadeduser._id.toString() });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error)
    }
}

exports.getUserStatus = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            const error = new Error('User not founded');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ status: user.status });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.updateUserStatus = async (req, res, next) => {
  const newstatus = req.body.status;
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }
    user.status = newstatus;
    await user.save();
    res.status(200).json({ message: 'User updated.' });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
