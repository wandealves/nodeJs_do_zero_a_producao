import bcrypt from 'bcrypt';

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
}
