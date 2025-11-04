import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { IToken } from '../interface/IToken';
import { generateTokenData, JwtPayloadData } from '../../../domain/entities/user';



export class Token implements IToken {
    private _accessSecret: string;
    private _refreshSecret: string;
    constructor() {
        this._accessSecret = process.env.JWT_SECRET ||'';
        this._refreshSecret = process.env.JWT_REFRESH_SECRET ||'' ;
    }
    createAccessToken(data: generateTokenData): string {
        const accessToken = jwt.sign(
            data,
            this._accessSecret,
            { expiresIn: '2d' },
        );
        return accessToken;
    }
    createRefreshToken(data: generateTokenData): string {
        const accessToken = jwt.sign(
            data,
            this._refreshSecret,
            { expiresIn: '7d' },
        );
        return accessToken;
    }
    verifyAccessToken(token: string): JwtPayloadData | null {
        try {
            const decoded = jwt.verify(token, this._accessSecret);
            return decoded as JwtPayloadData;
        } catch (error: unknown) {
            console.log("❌ JWT verify failed:", error);
            if (error instanceof TokenExpiredError) return null;
            if (error instanceof JsonWebTokenError) return null;
            throw error;
        }
    }


    verifyRefreshToken(token: string): JwtPayloadData | null {
        try {
            const decoded = jwt.verify(token, this._refreshSecret);
            return typeof decoded === 'object' && decoded !== null
                ? (decoded as JwtPayloadData)
                : null;
        } catch (err: unknown) {
            console.log(err);
            return null;
        }
    }
     generateTokens(id: string, role: string): {accessToken:string,refreshToken:string} {
        const accessToken = jwt.sign(
            { _id: id, role: role },
            this._accessSecret,
            { expiresIn: '15m' },
        );
        const refreshToken = jwt.sign(
            { _id: id, role: role },
            this._refreshSecret,
            { expiresIn: '7d' },
        );
        return { accessToken, refreshToken };
    }
}