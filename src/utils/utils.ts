import jwt from 'jsonwebtoken'

// export const generateToken = (userId: string): string => {
//     const jwtSecret: string = process.env.JWT_SECRET || '';
//     return jwt.sign({ userId }, jwtSecret, { expiresIn: '1h' })
// }

// export const 

export class JwtAuth {
    private jwtSecret: string;
    private expiresIn: string;

    constructor() {
        this.jwtSecret = process.env.JWT_SECRET || '';
        this.expiresIn = '1h';
    }

    generateToken(userId: string | unknown): string {
        return jwt.sign({ userId }, this.jwtSecret, { expiresIn: this.expiresIn })
    }

    verifyToken(token: string) {
        return jwt.verify(token, this.jwtSecret);
    }
}