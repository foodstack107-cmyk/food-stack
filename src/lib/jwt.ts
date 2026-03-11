import jwt from 'jsonwebtoken';

export function signJwt(payload: object): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' },
      (err, token) => {
        if (err) reject(err);
        resolve(token as string);
      },
    );
  });
}
