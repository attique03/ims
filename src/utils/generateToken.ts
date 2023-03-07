import * as jwt from 'jsonwebtoken';
import config from '../config/keys';

const generateToken = (id: string) => {
  return jwt.sign({ id }, config.jwtSecret, {
    expiresIn: '30d',
  });
};

export default generateToken;
