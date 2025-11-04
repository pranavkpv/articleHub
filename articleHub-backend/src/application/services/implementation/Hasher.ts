import bcrypt from 'bcrypt';
import { IHasher } from '../interface/IHasher';

export class Hasher implements IHasher {
   private readonly _saltRounds: number = 10;
   async hash(plaintext: string): Promise<string> {
      return await bcrypt.hash(plaintext, this._saltRounds);
   }
   async compare(plaintext: string, hashedpassword: string): Promise<boolean> {
      return await bcrypt.compare(plaintext, hashedpassword);
   }
}