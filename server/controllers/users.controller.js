import User from "../models/users.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const userRegister = async (req, res) => {

  try {
      const userData = req.body;

      userData.password = await bcrypt.hash(userData.password, 10);

      await User.create(userData);

      res.status(200).send({ status: true, message: 'Successfully registered!' });
  } catch (error) {
      console.error(error);
      res.status(500).send({ status: false, message: 'Failed to register user', error: error.message });
  }
};

export const userLogin = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
        if (!user || !bcrypt.compare(password, user.password) || user.role !== role) {
            return res.status(401).send({ status: false, message: 'Invalid credentials' });
        }

        const { accessToken, refreshToken } = await user.generateTokens();

        console.log(accessToken , refreshToken)

        return res.status(200).json({
            accessToken: accessToken,
            refreshToken: refreshToken,
            message: 'Logged in successfully!'
        });


    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: false, message: error.message+'hello' });
    }
};


export const newTokens = async (req, res) => {
  try {
      const { refreshToken } = req.body;

      const decodedToken = jwt.verify(refreshToken, process.env.Jwt_secret);

      const user = await User.findById(decodedToken.userId);

      if (!user) {
          throw new Error('User not found');
      }
     
      const {accessToken:newAccessToken , refreshToken:newRefreshToken} = await user.generateTokens();

      res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        message:'Logged in Successfully!'
    });

  } catch (error) {
      console.error(error);
      res.status(500).send({ status: false, message: 'Failed to issue new tokens' });
  }
};

export const fetchUser = async (req, res) => {
    try {

        const tokenHeader = req.headers.authorization; 

        if (!tokenHeader) {
            return res.status(401).send({ error: 'Authorization header is missing' });
        }

        const token = tokenHeader.split(' ')[1];

        const decodedToken = jwt.verify(token , process.env.Jwt_secret);
        const {userName , userId} = decodedToken

        const item = await User.findOne({_id:userId})

        const itemCount = item.cart.reduce((acc, item) => acc+=item.productCount , 0)

        res.status(200).send({ userName: userName , userId:userId, itemCount:itemCount });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
};



