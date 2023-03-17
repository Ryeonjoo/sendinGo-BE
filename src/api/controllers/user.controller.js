const UserService = require('../services/user.service');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { KEY, EXPIRE_IN } = process.env;

class UserCotroller {
  constructor() {
    this.userService = new UserService();
  }

  createUser = async (req, res, next) => {
    const user = req.body;
    try {
      await this.userService.createUser(user);
      res.status(201).json({ message: '회원가입이 완료 되었습니다.' });
    } catch (e) {
      next(e);
    }
  };

  loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const user = await this.userService.loginUser({ email, password });

      let expires = new Date();
      expires.setMinutes(expires.getMinutes() + 60);

      const token = jwt.sign({ userId: user.email }, KEY, {
        expiresIn: EXPIRE_IN,
      });

      res.cookie('authorization', `Bearer ${token}`, {
        expires: expires,
      });
      res.status(200).json({ message: '로그인이 정상적으로 처리되었습니다.' });
    } catch (e) {
      next(e);
    }
  };
}

module.exports = UserCotroller;
