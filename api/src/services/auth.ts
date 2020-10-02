import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from 'config';

export default class UthService {
  public static async hashPassword(
    password: string,
    salt = 10
  ): Promise<string> {
    return await bcrypt.hashSync(password, salt);
  }

  public static async comparePasswords(
    password: string,
    hashPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashPassword);
  }

  public static generateToken(paylod: object): string {
    return jwt.sign(paylod, config.get('App.auth.key'), {
      expiresIn: config.get('App.auth.tokenExpiresIn'),
    });
  }
}
