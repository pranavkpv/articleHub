import { generateTokenData, JwtPayloadData } from "../../../domain/entities/user";

export interface IToken {
   createAccessToken(data: generateTokenData): string;
   createRefreshToken(data: generateTokenData): string;
   verifyAccessToken(token: string): JwtPayloadData | null;
   verifyRefreshToken(token: string): JwtPayloadData | null;
}