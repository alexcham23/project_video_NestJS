import * as bcrypt from 'bcryptjs';

const saltOrRounds = 10;

/**
 *
 * @param passwordPlaintText
 * @returns
 */

async function generateHash(passwordPlaintText: string): Promise<string> {
  return bcrypt.hash(passwordPlaintText, saltOrRounds);
}

/**
 *
 * @param passwordPlaintText
 * @param hash
 * @returns
 */
async function compareHash(
  passwordPlaintText: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(passwordPlaintText, hash);
}

export { generateHash, compareHash };
